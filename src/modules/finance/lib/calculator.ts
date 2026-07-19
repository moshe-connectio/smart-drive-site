/**
 * Finance Calculator — pure math
 *
 * Implements the standard amortization formula with an optional
 * balloon (future-value) payment, as commonly used in Israeli auto finance.
 *
 *   PMT = (PV − FV / (1 + r)^n) · r / (1 − (1 + r)^−n)
 *
 * where:
 *   PV = loan principal (price − down payment)
 *   FV = balloon paid at month n (0 if none)
 *   r  = monthly rate (annual / 12 / 100)
 *   n  = term in months
 *
 * When r = 0 (interest-free) the formula degenerates to (PV − FV) / n.
 */

import type { FinanceInput, FinanceResult } from '../types';

const EMPTY_RESULT: FinanceResult = {
  loanAmount: 0,
  monthlyPayment: 0,
  totalCost: 0,
  totalInterest: 0,
  balloon: 0,
  isValid: false,
};

const MAX_FINANCE_VALUE = 10_000_000;
const MAX_TERM_MONTHS = 120;
const MAX_ANNUAL_RATE_PERCENT = 100;

function finiteNonNegative(value: number, max: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(max, value)) : 0;
}

export function calculateFinance(input: FinanceInput): FinanceResult {
  const price = finiteNonNegative(Number(input.vehiclePrice), MAX_FINANCE_VALUE);
  const down = Math.min(price, finiteNonNegative(Number(input.downPayment), price));
  const months = Math.min(
    MAX_TERM_MONTHS,
    Math.floor(finiteNonNegative(Number(input.termMonths), MAX_TERM_MONTHS)),
  );
  const annual = finiteNonNegative(Number(input.annualRatePercent), MAX_ANNUAL_RATE_PERCENT);
  const loanAmount = price - down;
  const balloon = Math.min(loanAmount, finiteNonNegative(Number(input.balloon), loanAmount));

  if (price <= 0 || months <= 0 || loanAmount <= 0) {
    return { ...EMPTY_RESULT, loanAmount, balloon };
  }

  const r = annual / 100 / 12;

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = (loanAmount - balloon) / months;
  } else {
    const compound = Math.pow(1 + r, months);
    const pvOfBalloon = balloon / compound;
    monthlyPayment = ((loanAmount - pvOfBalloon) * r) / (1 - 1 / compound);
  }

  if (!Number.isFinite(monthlyPayment) || monthlyPayment < 0) {
    return { ...EMPTY_RESULT, loanAmount, balloon };
  }

  const totalCost = down + monthlyPayment * months + balloon;
  const totalInterest = totalCost - price;

  if (!Number.isFinite(totalCost) || !Number.isFinite(totalInterest)) {
    return { ...EMPTY_RESULT, loanAmount, balloon };
  }

  return {
    loanAmount,
    monthlyPayment,
    totalCost,
    totalInterest: Math.max(0, totalInterest),
    balloon,
    isValid: true,
  };
}
