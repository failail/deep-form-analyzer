  export interface ValidationRule {
  type: string;
  value?: any;
  message: string;
}

export interface Option {
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
  type: 'text' | 'number' | 'radio' | 'select' | 'date' | 'skip' | 'monthYear';
  required?: boolean;
  options?: Option[];
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
  questionsPerPage: number;
  questions: string[];
  condition?: ConditionalLogic;
}

export interface FormData {
  [key: string]: any;
}

export interface MetricResult {
  score: number;
  description: string;
  staticDescription: string;
  value: number;
}

export interface FinancialMetrics {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  savingsRate: MetricResult;
  debtToIncomeRatio: MetricResult;
  emergencyFundMonths: number;
  coreExpenseRatio: MetricResult;
  totalExpenseRatio: MetricResult;
  debtServicingRatio: MetricResult;
  cashBufferRatio: MetricResult;
  debtToAssetsRatio: MetricResult;
  cashToAssetsRatio: MetricResult;
  liquidAssetsRatio: MetricResult;
  debtToLiquidRatio: MetricResult;
  emergencyMonths: MetricResult;
  investmentAllocation: MetricResult;
}

export interface CalculationResults {
  metrics: FinancialMetrics;
  score: number;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  overallScore: number;
  overallDescription: string;
  estimatedNetWorth: number;
  annualIncome: number;
  totalAnnualIncome: number;
  annualExpenses: number;
  totalAnnualExpenses: number;
  annualExpensesMinusSavingsInvestments: number;
  totalDebt: number;
  totalSavingsInvestments: number;
  totalCashInHand: number;
  monthlyDebtPayments: number;
  totalMonthlyInvestments: number;
  totalAssets: number;
  totalAnnualLoanPayments: number;
  totalMonthlyExpenses: number;
  liquidAssets: number;
  totalAnnualInvestments: number;
  netWorth: number;
}