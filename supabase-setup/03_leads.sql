-- =====================================================================
-- Smart & Drive - Leads Table
-- Run in Supabase SQL Editor
-- =====================================================================

CREATE TABLE IF NOT EXISTS leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Contact
  name             TEXT NOT NULL,
  phone            TEXT NOT NULL,
  email            TEXT,
  message          TEXT,

  -- Source / form context
  form_id          TEXT NOT NULL DEFAULT 'general',   -- e.g. 'vehicle-inquiry', 'test-drive', 'financing', 'general'
  page_url         TEXT,
  page_title       TEXT,

  -- Vehicle context (optional)
  vehicle_id       UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_title    TEXT,

  -- UTM tracking
  utm_source       TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  utm_term         TEXT,
  utm_content      TEXT,

  -- Extra context
  referrer         TEXT,
  user_agent       TEXT,

  -- CRM status
  status           TEXT NOT NULL DEFAULT 'new',       -- new | contacted | qualified | converted | lost
  notes            TEXT,

  -- Flexible extra data
  metadata         JSONB NOT NULL DEFAULT '{}'
);

-- Indexes for common queries
CREATE INDEX idx_leads_created_at   ON leads(created_at DESC);
CREATE INDEX idx_leads_status       ON leads(status);
CREATE INDEX idx_leads_phone        ON leads(phone);
CREATE INDEX idx_leads_form_id      ON leads(form_id);
CREATE INDEX idx_leads_vehicle_id   ON leads(vehicle_id);
CREATE INDEX idx_leads_utm_source   ON leads(utm_source);
CREATE INDEX idx_leads_utm_campaign ON leads(utm_campaign);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_leads_updated_at();

-- RLS: only service-role can read/write (API uses service key)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access"
  ON leads
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
