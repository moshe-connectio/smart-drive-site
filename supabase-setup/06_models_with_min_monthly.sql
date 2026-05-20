-- =====================================================================
-- Add MIN(monthly_payment) to models_with_manufacturer view
-- Run this once in the Supabase SQL Editor.
-- =====================================================================

DROP VIEW IF EXISTS public.models_with_manufacturer CASCADE;
CREATE VIEW public.models_with_manufacturer
WITH (security_invoker = true) AS
SELECT
  mo.id, mo.name, mo.slug, mo.image_url, mo.description,
  mo.body_type, mo.segment, mo.base_price,
  m.id   AS manufacturer_id,
  m.name AS manufacturer_name,
  m.slug AS manufacturer_slug,
  m.logo_url AS manufacturer_logo,
  COUNT(DISTINCT tl.id) AS trim_levels_count,
  MIN(tl.price) AS min_price,
  MAX(tl.price) AS max_price,
  MIN(tl.monthly_payment) AS min_monthly_payment,
  MAX(tl.monthly_payment) AS max_monthly_payment,
  mo.is_active, mo.display_order, mo.created_at, mo.updated_at
FROM public.new_vehicles_models mo
JOIN public.new_vehicles_manufacturers m
  ON mo.manufacturer_id = m.id
LEFT JOIN public.new_vehicles_trim_levels tl
  ON mo.id = tl.model_id AND tl.is_active = true
WHERE mo.is_active = true AND m.is_active = true
GROUP BY mo.id, mo.name, mo.slug, mo.image_url, mo.description,
         mo.body_type, mo.segment, mo.base_price,
         m.id, m.name, m.slug, m.logo_url,
         mo.is_active, mo.display_order, mo.created_at, mo.updated_at
ORDER BY m.display_order, mo.display_order, mo.name;
