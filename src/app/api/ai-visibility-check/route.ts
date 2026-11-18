import { NextResponse } from 'next/server';
import {
  avcFormEnabled,
  buildAvcMessage,
  validateAiVisibilityCheck,
  type AiVisibilityCheckFields,
} from '@/lib/aiVisibilityCheck';
import { saveAiVisibilityCheckInquiry } from '@/lib/inquiries';
import { describeMailError, noteMailFailure, noteMailSuccess, sendInquiryEmail } from '@/lib/mailer';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!avcFormEnabled()) {
    return NextResponse.json({ ok: false, error: 'Form is not available.' }, { status: 503 });
  }

  if (!rateLimit(`avc:${clientKey(request)}`, 8, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: Partial<AiVisibilityCheckFields> & { companyFax?: string };
  try {
    body = (await request.json()) as Partial<AiVisibilityCheckFields> & { companyFax?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (body.companyFax) {
    return NextResponse.json({ ok: true });
  }

  const fields: AiVisibilityCheckFields = {
    name: String(body.name || ''),
    email: String(body.email || ''),
    brand: String(body.brand || ''),
    websiteUrl: String(body.websiteUrl || ''),
    markets: Array.isArray(body.markets) ? body.markets.map(String) : [],
    cityOrArea: String(body.cityOrArea || ''),
    competitors: String(body.competitors || ''),
    priority: String(body.priority || ''),
    seeds: String(body.seeds || ''),
    source: String(body.source || ''),
    gbpUrl: String(body.gbpUrl || ''),
    topic: String(body.topic || 'Free AI visibility check'),
    servicesFollowUpOptIn: Boolean(body.servicesFollowUpOptIn),
  };

  const errors = validateAiVisibilityCheck(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  let emailed = false;

  try {
    emailed = await sendInquiryEmail({
      name: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.brand.trim(),
      topic: fields.topic.trim(),
      message: buildAvcMessage(fields),
      source: 'ai-visibility-check',
      servicesFollowUpOptIn: fields.servicesFollowUpOptIn,
    });
    noteMailSuccess();
  } catch (error) {
    const mailError = describeMailError(error);
    noteMailFailure(mailError);
    console.error('[ai-visibility-check] enquiry email failed:', mailError);
  }

  let id: string | null = null;
  try {
    id = (await saveAiVisibilityCheckInquiry(fields, { emailed })).id;
  } catch (error) {
    console.error('[ai-visibility-check] enquiry could not be stored:', (error as Error).message);
  }

  if (emailed) {
    return NextResponse.json({ ok: true, id, emailed: true });
  }

  if (id) {
    return NextResponse.json({
      ok: true,
      id,
      emailed: false,
      warning: 'Request saved but email could not be sent. We will follow up manually.',
    });
  }

  return NextResponse.json(
    { ok: false, error: 'We could not send your request. Please email us directly.' },
    { status: 502 },
  );
}