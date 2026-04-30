/**
 * Webhook authentication helper.
 *
 * All Zoho-driven webhooks must include the shared secret in either the
 * `x-webhook-secret` header (preferred) or `?secret=` query string.
 *
 * The secret is configured via the `ZOHO_WEBHOOK_SECRET` environment variable
 * on the server (Vercel project settings).
 */
import { NextRequest, NextResponse } from 'next/server';

/**
 * Constant-time string compare to avoid timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Verify a webhook request carries the correct shared secret.
 *
 * @returns `null` when the request is authenticated; otherwise a `NextResponse`
 *          (401 / 500) that the caller should return immediately.
 */
export function verifyWebhookSecret(request: NextRequest): NextResponse | null {
  const expected = process.env.ZOHO_WEBHOOK_SECRET;

  // Misconfiguration: refuse to run if the server has no secret configured.
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured: webhook secret missing.' },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get('x-webhook-secret') ??
    request.nextUrl.searchParams.get('secret') ??
    '';

  if (!provided || !timingSafeEqual(provided, expected)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return null;
}
