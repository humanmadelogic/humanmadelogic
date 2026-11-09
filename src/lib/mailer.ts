import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { Inquiry } from './inquiries';

/**
 * Enquiry delivery over Google SMTP (Workspace or Gmail with an app password).
 */

export const CONTACT_TO = process.env.CONTACT_TO || 'info@humanmadelogic.com';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === 'true'
  : SMTP_PORT === 465;

const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'Human Made Logic';

export function mailConfigured() {
  return Boolean(SMTP_USER && SMTP_PASS);
}

/** Non-sensitive summary for health endpoints. */
export function mailStatus() {
  return {
    provider: `smtp:${SMTP_HOST}`,
    configured: mailConfigured(),
  };
}

export function mailDiagnostics() {
  return {
    ...mailStatus(),
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    user: maskAddress(SMTP_USER),
    to: maskAddress(CONTACT_TO),
    lastError: lastMailError(),
  };
}

function maskAddress(address: string) {
  if (!address) return '';
  const [local, domain] = address.split('@');
  if (!domain) return `${local.slice(0, 2)}***`;
  return `${local.slice(0, 2)}***@${domain}`;
}

let transporter: Transporter | null = null;

function getTransport() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type InquiryPayload = Omit<Inquiry, 'id' | 'createdAt' | 'emailed' | 'read'> & { id?: string };

function buildBody(inquiry: InquiryPayload) {
  const rows: Array<[string, string]> = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Company', inquiry.company || 'n/a'],
    ['Topic', inquiry.topic],
    ['Source', inquiry.source],
  ];

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), '', inquiry.message].join(
    '\n',
  );

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#151515;line-height:1.55">
      <p style="text-transform:uppercase;letter-spacing:0.18em;font-size:11px;color:#6B6A66;margin:0 0 4px">Human Made Logic</p>
      <h1 style="font-size:22px;font-weight:500;letter-spacing:-0.03em;margin:0 0 20px">New studio enquiry</h1>
      ${rows
        .map(
          ([label, value]) =>
            `<p style="margin:0 0 12px"><strong>${label}</strong><br>${escapeHtml(value)}</p>`,
        )
        .join('')}
      <p style="margin:0"><strong>Message</strong><br>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>
    </div>
  `;

  return { text, html };
}

export function describeMailError(error: unknown): string {
  if (!error) return 'Unknown error';
  const err = error as NodeJS.ErrnoException & { responseCode?: number; response?: string };
  const parts = [err.code, err.responseCode ? `SMTP ${err.responseCode}` : '', err.message]
    .filter(Boolean)
    .join(' · ');
  const response = err.response ? ` (${String(err.response).slice(0, 200)})` : '';
  return `${parts}${response}`.trim() || String(error);
}

let lastMailFailure: { at: string; reason: string } | null = null;

export function noteMailFailure(reason: string) {
  lastMailFailure = { at: new Date().toISOString(), reason };
}

export function noteMailSuccess() {
  lastMailFailure = null;
}

export function lastMailError() {
  return lastMailFailure;
}

export async function verifyMail() {
  if (!mailConfigured()) {
    return { ok: false as const, reason: 'SMTP_USER / SMTP_PASS are not set' };
  }

  try {
    await getTransport().verify();
    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, reason: describeMailError(error) };
  }
}

export async function sendInquiryEmail(inquiry: InquiryPayload) {
  if (!mailConfigured()) {
    throw new Error('SMTP_USER / SMTP_PASS are not set');
  }

  const { text, html } = buildBody(inquiry);

  await getTransport().sendMail({
    from: { address: SMTP_FROM, name: SMTP_FROM_NAME },
    to: CONTACT_TO,
    replyTo: inquiry.email,
    subject: `New enquiry: ${inquiry.name} (${inquiry.topic})`,
    text,
    html,
  });

  return true;
}
