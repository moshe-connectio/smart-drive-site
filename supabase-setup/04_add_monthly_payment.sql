-- =====================================================================
-- Migration: Add monthly_payment column to vehicles
-- =====================================================================
-- Adds an optional monthly payment (in ILS) that the dealer can set per
-- vehicle. When NULL, the front-end falls back to a computed estimate
-- using default financing terms (20% down, 60 months, 6.5% APR).
--
-- Safe to run multiple times (uses IF NOT EXISTS).
-- =====================================================================

ALTER TABLE vehicles
  ADD COLUMN IF NOT EXISTS monthly_payment INTEGER;

COMMENT ON COLUMN vehicles.monthly_payment IS
  'Optional dealer-set monthly payment (ILS) shown on the vehicle card. NULL = compute from price.';

-- Index for the price-based filter (already exists via idx_vehicles_price)
-- so we add one for monthly_payment too, since the home/inventory pages
-- filter by it as well.
CREATE INDEX IF NOT EXISTS idx_vehicles_monthly_payment
  ON vehicles(monthly_payment)
  WHERE monthly_payment IS NOT NULL;
