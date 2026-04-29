/**
 * Pure utility functions for vehicle search filtering.
 * Kept side-effect free so they're trivially unit-testable.
 */

/** Format a number as Israeli shekels, or em-dash if missing/invalid. */
export function formatMoney(value: number | null | undefined): string {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `₪${Number(value).toLocaleString('he-IL')}`;
}

/** Snap a numeric value to a step, clamped within [lo, hi]. */
export function clampStep(
  value: number,
  step: number,
  lo: number,
  hi: number
): number {
  if (Number.isNaN(value)) return lo;
  const v = Math.round(value / step) * step;
  return Math.min(hi, Math.max(lo, v));
}

/**
 * Supabase returns DECIMAL columns as strings (not numbers).
 * Coerce safely; return null if the value is missing or non-numeric.
 */
export function toMonthly(value: unknown): number | null {
  if (value == null) return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}
