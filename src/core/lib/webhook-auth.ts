/**
 * Request authentication helpers.
 *
 * - Zoho-driven webhooks and the new-vehicles admin routes must include the
 *   shared secret in either the `x-webhook-secret` header (preferred) or the
 *   `?secret=` query string. Configured via the `ZOHO_WEBHOOK_SECRET`
 *   environment variable.
 * - Cron endpoints must carry the `Authorization: Bearer <CRON_SECRET>` header
 *   that Vercel automatically sends when the `CRON_SECRET` env var is set.
 */
import { NextResponse } from 'next/server';

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
 * Read the provided shared secret from the request.
 * Works with both `NextRequest` and the standard `Request` object.
 */
function readProvidedSecret(request: Request): string {
  const header = request.headers.get('x-webhook-secret');
  if (header) return header;

  try {
    return new URL(request.url).searchParams.get('secret') ?? '';
  } catch {
    return '';
  }
}

/**
 * Verify a request carries the correct shared webhook secret.
 *
 * Accepts a standard `Request` (and therefore `NextRequest`, which extends it),
 * so it can guard both `app/api` webhook routes and the new-vehicles admin
 * routes that use the plain `Request` signature.
 *
 * @returns `null` when the request is authenticated; otherwise a `NextResponse`
 *          (401 / 500) that the caller should return immediately.
 */
export function verifyWebhookSecret(request: Request): NextResponse | null {
  const expected = process.env.ZOHO_WEBHOOK_SECRET;

  // Misconfiguration: refuse to run if the server has no secret configured.
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured: webhook secret missing.' },
      { status: 500 },
    );
  }

  const provided = readProvidedSecret(request);

  if (!provided || !timingSafeEqual(provided, expected)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return null;
}

/**
 * Verify a cron request carries the correct `CRON_SECRET`.
 *
 * Vercel Cron Jobs automatically send `Authorization: Bearer <CRON_SECRET>`
 * when the `CRON_SECRET` environment variable is configured on the project.
 *
 * @returns `null` when the request is authenticated; otherwise a `NextResponse`
 *          (401 / 500) that the caller should return immediately.
 */
export function verifyCronSecret(request: Request): NextResponse | null {
  const expected = process.env.CRON_SECRET;

  // Misconfiguration: refuse to run if the server has no secret configured.
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured: cron secret missing.' },
      { status: 500 },
    );
  }

  const authHeader = request.headers.get('authorization') ?? '';
  const provided = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : '';

  if (!provided || !timingSafeEqual(provided, expected)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  return null;
}
