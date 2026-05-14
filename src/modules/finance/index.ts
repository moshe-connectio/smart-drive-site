export { default as FinanceCalculator } from './components/FinanceCalculator';
export { default as FinanceCalculatorSection } from './components/FinanceCalculatorSection';
export { FinanceVehicleSuggestions } from './components/FinanceVehicleSuggestions';
export { calculateFinance } from './lib/calculator';
export {
  getEffectiveMonthlyPayment,
  DEFAULT_FINANCE_DEFAULTS,
} from './lib/monthlyPayment';
export type { FinanceInput, FinanceResult } from './types';
