/**
 * Finance Calculator — types
 */

export interface FinanceInput {
  /** Total vehicle price in ILS */
  vehiclePrice: number;
  /** Down payment in ILS (already deducted from loan) */
  downPayment: number;
  /** Loan term in months */
  termMonths: number;
  /** Annual nominal interest rate, percent (e.g. 6.5) */
  annualRatePercent: number;
  /** Optional balloon / residual payment in ILS, paid at end of term */
  balloon: number;
}

export interface FinanceResult {
  /** Amount actually borrowed (price − down payment) */
  loanAmount: number;
  /** Calculated monthly payment in ILS */
  monthlyPayment: number;
  /** Sum of all monthly payments + balloon + down payment */
  totalCost: number;
  /** Total interest paid over the life of the loan */
  totalInterest: number;
  /** Balloon amount paid at the end (echoed back for clarity) */
  balloon: number;
  /** True when inputs are valid and a payment was computed */
  isValid: boolean;
}
