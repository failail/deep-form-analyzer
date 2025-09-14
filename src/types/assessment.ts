export interface ConditionalLogic {
  dependsOn: string;
  values: string[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'date' | 'radio' | 'select' | 'monthYear' | 'skip';
  options?: string[];
  conditional?: ConditionalLogic;
  required?: boolean;
  validation?: any;
}

export interface QuestionGroup {
  id: string;
  name: string;
  description: string;
  questionsPerPage: number;
  questions: Question[];
  conditional?: ConditionalLogic;
}

export interface FormData {
  [key: string]: string | number | boolean;
}

export interface FinancialMetrics {
  monthlyIncome: number;
  monthlyExpenses: number;
  netWorth: number;
  debtToIncomeRatio: number;
  emergencyFundRatio: number;
  savingsRate: number;
  coreExpenseRatio: number;
  totalExpenseRatio: number;
  debtServicingRatio: number;
  cashBufferRatio: number;
  debtToAssetsRatio: number;
  cashToAssetsRatio: number;
  liquidAssetsRatio: number;
  debtToLiquidRatio: number;
  emergencyMonths: number;
  investmentAllocation: number;
}

export interface CalculationResults {
  score: number;
  level: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  metrics: FinancialMetrics;
  recommendations: string[];
  overallScore: number;
  overallDescription: string;
  estimatedNetWorth: number;
  annualIncome: number;
  annualExpenses: number;
  annualExpensesMinusSavingsInvestments: number;
  totalDebt: number;
  totalSavingsInvestments: number;
  totalCashInHand: number;
  monthlyDebtPayments: number;
  totalMonthlyInvestments: number;
}