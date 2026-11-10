import { NextResponse } from 'next/server';
import { mailStatus } from '@/lib/mailer';
import { providerStatus } from '@/lib/models';
import { connectGuide } from '@/lib/studio';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public callers must not see env or provider configuration. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: true });
  }

  const origin = new URL(request.url).origin;
  return NextResponse.json({
    ok: true,
    endpoint: `${origin}/api/mcp`,
    providers: providerStatus(),
    mail: mailStatus(),
    connect: connectGuide(origin),
  });
}
