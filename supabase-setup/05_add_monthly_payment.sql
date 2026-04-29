-- ============================================================================
-- Migration: Add monthly_payment column to new_vehicles_trim_levels
-- ----------------------------------------------------------------------------
-- Adds a "monthly_payment" field to each trim level so the UI can display the
-- estimated monthly leasing/loan payment alongside the sticker price.
--
-- Run this once in the Supabase SQL Editor.
-- ============================================================================

ALTER TABLE public.new_vehicles_trim_levels
  ADD COLUMN IF NOT EXISTS monthly_payment DECIMAL(10, 2);

COMMENT ON COLUMN public.new_vehicles_trim_levels.monthly_payment IS
  'Estimated monthly payment in ILS (lease / loan), shown next to the price.';

-- ----------------------------------------------------------------------------
-- The trim_levels_full_info view already does `SELECT tl.*` so it picks up the
-- new column automatically. We still recreate it (with security_invoker) to
-- ensure the cached column list is refreshed.
-- ----------------------------------------------------------------------------
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
