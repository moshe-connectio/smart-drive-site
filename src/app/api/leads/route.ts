import { NextRequest, NextResponse } from 'next/server';
import { insertLead } from '@modules/leads/lib/repository';
import { fireLeadWebhook } from '@modules/leads/lib/webhook';
import { logger } from '@core/lib/logger';
import { rateLimit, getClientIp } from '@shared/utils/rate-limit';
import type { CreateLeadInput } from '@modules/leads/types';

const PHONE_RE = /^[\d\s\-+()]{7,20}$/;

// Allow at most 5 lead submissions per IP within a 60-second window.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function validate(body: unknown): CreateLeadInput {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body');
  }

  const b = body as Record<string, unknown>;

  if (!b.name || typeof b.name !== 'string' || b.name.trim().length < 2) {
    throw new Error('name is required (min 2 chars)');
  }
  if (!b.phone || typeof b.phone !== 'string' || !PHONE_RE.test(b.phone.trim())) {
    throw new Error('phone is required and must be a valid phone number');
  }

  return b as unknown as CreateLeadInput;
}

/**
 * POST /api/leads
 *
 * Body: CreateLeadInput (see src/modules/leads/types/index.ts)
 * Returns: { success: true, id: string }
 */
export async function POST(req: NextRequest) {
  // Rate-limit by client IP to mitigate spam / abuse.
  const ip = getClientIp(req);
  const { allowed, retryAfter } = rateLimit(
    `leads:${ip}`,
    RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_MS,
  );
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  let input: CreateLeadInput;
  try {
    input = validate(body);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Validation error' },
      { status: 422 }
    );
  }

  try {
    const userAgent = req.headers.get('user-agent') ?? undefined;
    const lead = await insertLead(input, userAgent);

    // Fire webhook asynchronously — don't block the response
    void fireLeadWebhook(lead);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    logger.error('[POST /api/leads]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
