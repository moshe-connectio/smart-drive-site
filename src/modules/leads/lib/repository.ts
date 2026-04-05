import { createServerSupabaseClient } from '@core/lib/supabase';
import type { CreateLeadInput, Lead } from '../types';

export async function insertLead(
  input: CreateLeadInput,
  userAgent?: string
): Promise<Lead> {
  const supabase = createServerSupabaseClient();

  const row = {
    name:          input.name.trim(),
    phone:         input.phone.trim(),
    email:         input.email?.trim() || null,
    message:       input.message?.trim() || null,
    form_id:       input.form_id ?? 'general',
    page_url:      input.page_url || null,
    page_title:    input.page_title || null,
    vehicle_id:    input.vehicle_id || null,
    vehicle_title: input.vehicle_title || null,
    utm_source:    input.utm?.utm_source    || null,
    utm_medium:    input.utm?.utm_medium    || null,
    utm_campaign:  input.utm?.utm_campaign  || null,
    utm_term:      input.utm?.utm_term      || null,
    utm_content:   input.utm?.utm_content   || null,
    referrer:      input.referrer || null,
    user_agent:    userAgent || null,
    metadata:      input.metadata ?? {},
  };

  const { data, error } = await supabase
    .from('leads')
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(`Failed to insert lead: ${error.message}`);

  return data as Lead;
}
