import { NextRequest, NextResponse } from 'next/server';
import { insertLead } from '@modules/leads/lib/repository';
import { fireLeadWebhook } from '@modules/leads/lib/webhook';
import type { CreateLeadInput } from '@modules/leads/types';

const PHONE_RE = /^[\d\s\-+()]{7,20}$/;

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
    console.error('[POST /api/leads]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
