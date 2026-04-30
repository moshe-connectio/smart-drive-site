export { default as FinanceCalculator } from './components/FinanceCalculator';
export { calculateFinance } from './lib/calculator';
export {
  getEffectiveMonthlyPayment,
  DEFAULT_FINANCE_DEFAULTS,
} from './lib/monthlyPayment';
export type { FinanceInput, FinanceResult } from './types';
