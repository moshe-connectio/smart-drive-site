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

export function calculateFinance(input: FinanceInput): FinanceResult {
  const price = Math.max(0, Number(input.vehiclePrice) || 0);
  const down = Math.max(0, Math.min(price, Number(input.downPayment) || 0));
  const months = Math.max(0, Math.floor(Number(input.termMonths) || 0));
  const annual = Math.max(0, Number(input.annualRatePercent) || 0);
  const loanAmount = price - down;
  const balloon = Math.max(0, Math.min(loanAmount, Number(input.balloon) || 0));

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

  return {
    loanAmount,
    monthlyPayment,
    totalCost,
    totalInterest: Math.max(0, totalInterest),
    balloon,
    isValid: true,
  };
}
