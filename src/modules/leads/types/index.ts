export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export type LeadFormId =
  | 'general'
  | 'vehicle-inquiry'
  | 'test-drive'
  | 'financing'
  | 'trade-in'
  | 'contact-page';

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/** What the client sends to POST /api/leads */
export interface CreateLeadInput {
  // Required
  name: string;
  phone: string;

  // Optional contact
  email?: string;
  message?: string;

  // Form context
  form_id?: LeadFormId;
  page_url?: string;
  page_title?: string;

  // Vehicle context
  vehicle_id?: string;
  vehicle_title?: string;

  // UTM
  utm?: UtmParams;

  // Extra
  referrer?: string;
  metadata?: Record<string, unknown>;
}

/** The full lead row as stored in the DB */
export interface Lead extends Required<UtmParams> {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  form_id: LeadFormId;
  page_url: string | null;
  page_title: string | null;
  vehicle_id: string | null;
  vehicle_title: string | null;
  referrer: string | null;
  user_agent: string | null;
  status: LeadStatus;
  notes: string | null;
  metadata: Record<string, unknown>;
}
