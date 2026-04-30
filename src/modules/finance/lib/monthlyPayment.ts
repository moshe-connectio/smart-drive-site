/**
 * Effective monthly payment for a vehicle.
 *
 * - If the dealer set `monthly_payment` explicitly, return it.
 * - Otherwise compute a default-financing estimate from `price`,
 *   using the same calculator the public finance page uses, with
 *   sensible Israeli-market defaults: 20% down, 60 months, 6.5% APR,
 *   no balloon.
 *
 * Returns 0 when the price is unknown / non-positive, so callers can
 * safely use it inside numeric range comparisons.
 */

import { calculateFinance } from './calculator';

export const DEFAULT_FINANCE_DEFAULTS = {
  downPaymentPct: 20,
  termMonths: 60,
  annualRatePercent: 6.5,
} as const;

interface VehicleLike {
  price: number | null;
  monthly_payment: number | null;
}

export function getEffectiveMonthlyPayment(vehicle: VehicleLike): number {
  if (
    typeof vehicle.monthly_payment === 'number' &&
    vehicle.monthly_payment > 0
  ) {
    return Math.round(vehicle.monthly_payment);
  }

  const price = typeof vehicle.price === 'number' ? vehicle.price : 0;
  if (price <= 0) return 0;

  const result = calculateFinance({
    vehiclePrice: price,
    downPayment: Math.round((price * DEFAULT_FINANCE_DEFAULTS.downPaymentPct) / 100),
    termMonths: DEFAULT_FINANCE_DEFAULTS.termMonths,
    annualRatePercent: DEFAULT_FINANCE_DEFAULTS.annualRatePercent,
    balloon: 0,
  });

  return result.isValid ? Math.round(result.monthlyPayment) : 0;
}
