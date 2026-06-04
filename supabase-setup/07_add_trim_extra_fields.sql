-- ============================================================================
-- Migration: Add extra trim-level fields synced from Zoho CRM
-- ----------------------------------------------------------------------------
-- Adds optional spec fields to each trim level. They are displayed on the
-- trim-levels page ONLY when they contain data (the UI hides empty fields).
--
--   engine_cc        נפח מנוע (סמ״ק)            -> Zoho: Engine_cc
--   drivetrain       הנעה (קדמית/אחורית/כפולה)  -> Zoho: Drivetrain
--   battery_kwh      קיבולת סוללה (קוט״ש)       -> Zoho: Battery_kwh
--   range_km         טווח חשמלי (ק״מ)           -> Zoho: Range_km
--   charging_kw      הספק טעינה (kW)            -> Zoho: Charging_kw
--   pollution_level  דרגת זיהום אוויר            -> Zoho: Pollution_Level
--   safety_level     רמת בטיחות                 -> Zoho: Safety_Level
--   screen_inch      מסך מולטימדיה (אינץ׳)       -> Zoho: Screen_inch
--   warranty         אחריות (טקסט, "3 שנים")     -> Zoho: Warranty
--
-- Safe to run multiple times (uses IF NOT EXISTS).
-- Run this once in the Supabase SQL Editor.
-- ============================================================================

ALTER TABLE public.new_vehicles_trim_levels
  ADD COLUMN IF NOT EXISTS engine_cc       INTEGER,
  ADD COLUMN IF NOT EXISTS drivetrain      VARCHAR(100),
  ADD COLUMN IF NOT EXISTS battery_kwh     DECIMAL(6, 2),
  ADD COLUMN IF NOT EXISTS range_km        INTEGER,
  ADD COLUMN IF NOT EXISTS charging_kw     DECIMAL(6, 2),
  ADD COLUMN IF NOT EXISTS pollution_level VARCHAR(50),
  ADD COLUMN IF NOT EXISTS safety_level    VARCHAR(50),
  ADD COLUMN IF NOT EXISTS screen_inch     DECIMAL(4, 1),
  ADD COLUMN IF NOT EXISTS warranty        VARCHAR(100);

COMMENT ON COLUMN public.new_vehicles_trim_levels.engine_cc       IS 'נפח מנוע בסמ״ק (Engine_cc)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.drivetrain      IS 'הנעה: קדמית / אחורית / כפולה (Drivetrain)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.battery_kwh     IS 'קיבולת סוללה בקוט״ש — חשמלי/היברידי (Battery_kwh)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.range_km        IS 'טווח נסיעה חשמלי בק״מ (Range_km)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.charging_kw     IS 'הספק טעינה ב-kW (Charging_kw)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.pollution_level IS 'דרגת זיהום אוויר (Pollution_Level)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.safety_level    IS 'רמת בטיחות (Safety_Level)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.screen_inch     IS 'גודל מסך מולטימדיה באינץ׳ (Screen_inch)';
COMMENT ON COLUMN public.new_vehicles_trim_levels.warranty        IS 'אחריות, טקסט חופשי (Warranty)';

-- ----------------------------------------------------------------------------
-- Recreate trim_levels_full_info so the new columns are exposed to the app.
-- (The view lists columns explicitly, so it must be refreshed.)
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
  tl.engine_cc, tl.drivetrain, tl.battery_kwh, tl.range_km, tl.charging_kw,
  tl.pollution_level, tl.safety_level, tl.screen_inch, tl.warranty,
  mo.id   AS model_id,
  mo.name AS model_name,
  mo.name_he AS model_name_he,
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
