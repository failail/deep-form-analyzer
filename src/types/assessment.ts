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
  id: string;
  name: string;
  description: string;
  conditional?: ConditionalLogic;
  questions: Question[];
  questionsPerPage: number;
}

export interface FormData {
  [key: string]: any;
}

export interface FinancialMetrics {
  coreExpenseRatio: {
    value: number;
    score: number;
    description: string;
  };
  totalExpenseRatio: {
    value: number;
    score: number;
    description: string;
  };
  debtServicingRatio: {
    value: number;
    score: number;
    description: string;
  };
  cashBufferRatio: {
    value: number;
    score: number;
    description: string;
  };
  emergencyMonths: {
    value: number;
    score: number;
    description: string;
  };
  savingsRate: {
    value: number;
    score: number;
    description: string;
  };
  investmentAllocation: {
    value: number;
    score: number;
    description: string;
  };
  debtToIncomeRatio: {
    value: number;
    score: number;
    description: string;
  };
  debtToAssetsRatio: {
    value: number;
    score: number;
    description: string;
  };
  cashToAssetsRatio: {
    value: number;
    score: number;
    description: string;
  };
  liquidAssetsRatio: {
    value: number;
    score: number;
    description: string;
  };
  debtToLiquidRatio: {
    value: number;
    score: number;
    description: string;
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