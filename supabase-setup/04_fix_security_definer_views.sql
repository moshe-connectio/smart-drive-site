-- ============================================================================
-- Fix: SECURITY DEFINER views flagged by Supabase Advisor (Critical)
-- ----------------------------------------------------------------------------
-- Problem:
--   The views below run with the privileges of their CREATOR (postgres),
--   bypassing Row-Level Security on the underlying tables. Any caller with
--   SELECT on the view (incl. anon) sees ALL rows.
--
-- Fix:
--   Recreate each view with `security_invoker = true` (Postgres 15+/Supabase).
--   The view will then run with the CALLER's privileges, and RLS on the
--   underlying tables (manufacturers / models / trim_levels) will be enforced.
--
-- Run this once in the Supabase SQL Editor.
-- ============================================================================

-- 1) manufacturers_with_counts ------------------------------------------------
DROP VIEW IF EXISTS public.manufacturers_with_counts CASCADE;
CREATE VIEW public.manufacturers_with_counts
WITH (security_invoker = true) AS
SELECT
  m.id, m.name, m.slug, m.logo_url, m.banner_url, m.description,
  m.country, m.website_url,
  COUNT(DISTINCT mo.id) AS models_count,
  COUNT(DISTINCT tl.id) AS total_trim_levels,
  m.is_active, m.display_order, m.created_at, m.updated_at
FROM public.new_vehicles_manufacturers m
LEFT JOIN public.new_vehicles_models mo
  ON m.id = mo.manufacturer_id AND mo.is_active = true
LEFT JOIN public.new_vehicles_trim_levels tl
  ON mo.id = tl.model_id AND tl.is_active = true
WHERE m.is_active = true
GROUP BY m.id, m.name, m.slug, m.logo_url, m.banner_url, m.description,
         m.country, m.website_url, m.is_active, m.display_order,
         m.created_at, m.updated_at
ORDER BY m.display_order, m.name;

-- 2) models_with_manufacturer -------------------------------------------------
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

-- 3) trim_levels_full_info ----------------------------------------------------
DROP VIEW IF EXISTS public.trim_levels_full_info CASCADE;
CREATE VIEW public.trim_levels_full_info
WITH (security_invoker = true) AS
SELECT
  tl.id, tl.name, tl.slug, tl.description, tl.price, tl.monthly_payment,
  tl.transmission, tl.engine_type, tl.fuel_type,
  tl.power_hp, tl.torque_nm, tl.acceleration_0_100, tl.top_speed,
  tl.fuel_consumption, tl.co2_emissions, tl.body_dimensions,
  tl.weight, tl.seats, tl.doors, tl.trunk_volume,
  mo.id   AS model_id,
  mo.name AS model_name,
  mo.slug AS model_slug,
  mo.image_url AS model_image,
  m.id    AS manufacturer_id,
  m.name  AS manufacturer_name,
  m.slug  AS manufacturer_slug,
  m.logo_url AS manufacturer_logo,
  tl.is_active, tl.display_order, tl.created_at, tl.updated_at
FROM public.new_vehicles_trim_levels tl
JOIN public.new_vehicles_models mo
  ON tl.model_id = mo.id
JOIN public.new_vehicles_manufacturers m
  ON mo.manufacturer_id = m.id
WHERE tl.is_active = true AND mo.is_active = true AND m.is_active = true
ORDER BY m.display_order, mo.display_order, tl.display_order;

-- ============================================================================
-- Verification: each view should now return security_invoker = true
-- ============================================================================
-- SELECT c.relname,
--        (SELECT option_value FROM pg_options_to_table(c.reloptions)
--         WHERE option_name = 'security_invoker') AS security_invoker
-- FROM pg_class c
-- JOIN pg_namespace n ON n.oid = c.relnamespace
-- WHERE n.nspname = 'public'
--   AND c.relname IN (
--     'manufacturers_with_counts',
--     'models_with_manufacturer',
--     'trim_levels_full_info'
--   );
