import type { Lead } from '../types';

/**
 * Fires the configured webhook with the lead payload.
 * Compatible with Zapier / Make (Integromat) / n8n / custom endpoints.
 * Set LEADS_WEBHOOK_URL in your .env file.
 * Optionally set LEADS_WEBHOOK_SECRET for a shared-secret header.
 *
 * Non-blocking: errors are logged but not re-thrown so the API
 * always returns success to the client.
 */
export async function fireLeadWebhook(lead: Lead): Promise<void> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;

  const secret = process.env.LEADS_WEBHOOK_SECRET;

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (secret) headers['x-webhook-secret'] = secret;

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event:      'lead.created',
        timestamp:  new Date().toISOString(),
        lead: {
          id:            lead.id,
          created_at:    lead.created_at,
          name:          lead.name,
          phone:         lead.phone,
          email:         lead.email,
          message:       lead.message,
          form_id:       lead.form_id,
          page_url:      lead.page_url,
          page_title:    lead.page_title,
          vehicle_title: lead.vehicle_title,
          utm_source:    lead.utm_source,
          utm_medium:    lead.utm_medium,
          utm_campaign:  lead.utm_campaign,
          utm_term:      lead.utm_term,
          utm_content:   lead.utm_content,
          referrer:      lead.referrer,
          status:        lead.status,
          metadata:      lead.metadata,
        },
      }),
    });

    if (!res.ok) {
      console.error(`[leads-webhook] HTTP ${res.status} from webhook`);
    }
  } catch (err) {
    console.error('[leads-webhook] Failed to fire webhook:', err);
  }
}
