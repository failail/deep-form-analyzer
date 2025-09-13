// Types for the ManageMeMoney Financial Assessment

export type QuestionType = 
  | 'text'
  | 'number' 
  | 'date'
  | 'radio'
  | 'select'
  | 'monthYear'
  | 'skip';

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern';
  value?: number | string | RegExp;
  message: string;
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface ConditionalLogic {
  dependsOn: string;
  values: string[];
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  validation?: ValidationRule[];
  conditional?: ConditionalLogic;
  section: string;
  questionNumber: number;
  groupId: string;
}

export interface QuestionGroup {
  name: string;
  condition?: { question: string; equals: any };
  questions: string[];
}

export interface FormData {
  [key: string]: any;
}

export interface FinancialMetrics {
  coreExpenseRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  totalExpenseRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  debtServicingRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  cashBufferRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  debtToAssetsRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  cashToAssetsRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  liquidAssetsRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  debtToLiquidRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  emergencyMonths: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  savingsRate: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  investmentAllocation: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
  debtToIncomeRatio: {
    value: number;
    score: number;
    description: string;
    staticDescription: string;
  };
}

export interface CalculationResults {
  totalAnnualIncome: number;
  totalMonthlyExpenses: number;
  totalAnnualExpenses: number;
  totalAnnualLoanPayments: number;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
  liquidAssets: number;
  totalAnnualInvestments: number;
  metrics: FinancialMetrics;
  overallScore: number;
  overallDescription: string;
  // NEW METRICS FOR SUMMARY DISPLAY
  estimatedNetWorth: number;
  annualIncome: number;
  annualExpenses: number;
  annualExpensesMinusSavingsInvestments: number;
  totalSavingsInvestments: number;
  totalCashInHand: number;
  monthlyDebtPayments: number;
  totalMonthlyInvestments: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCY_OPTIONS: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'INR (Indian Rupees)' },
  { code: 'USD', symbol: '$', name: 'USD (US Dollars)' },
  { code: 'GBP', symbol: '£', name: 'GBP (British Pounds)' },
  { code: 'EUR', symbol: '€', name: 'EUR (Euros)' },
  { code: 'CAD', symbol: 'C$', name: 'CAD (Canadian Dollars)' },
  { code: 'AUD', symbol: 'A$', name: 'AUD (Australian Dollars)' },
  { code: 'SGD', symbol: 'S$', name: 'SGD (Singapore Dollars)' },
  { code: 'AED', symbol: 'د.إ', name: 'AED (UAE Dirhams)' },
];