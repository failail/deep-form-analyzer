import { FormData, CalculationResults, FinancialMetrics } from '@/types/assessment';

export const calculateFinancialHealth = (formData: FormData): CalculationResults => {
  // Helper function to get number value or 0
  const getValue = (key: string): number => {
    const value = formData[key];
    return typeof value === 'number' ? value : (parseFloat(value) || 0);
  };

  // Total Calculations
  const totalAnnualIncome = getValue('jobSalary') + getValue('secondJobIncome') + getValue('freelanceIncome');
  
  const totalMonthlyExpenses = getValue('monthlyGroceriesToiletries') + 
    getValue('monthlyClothesShoes') + 
    getValue('monthlyElectricity') + 
    getValue('monthlyMobile') + 
    getValue('monthlyDiningOut') + 
    (getValue('monthlyRent') || 0);
  
  const totalAnnualExpenses = totalMonthlyExpenses * 12;
  const totalAnnualLoanPayments = 0; // Will be calculated based on loans
  const totalAssets = getValue('savingsAccountsFD') + getValue('investmentValue') + (getValue('homeCurrentValue') || 0);
  const totalDebt = 0; // Will be calculated based on loan balances
  const netWorth = totalAssets - totalDebt;
  const liquidAssets = getValue('savingsAccountsFD') + getValue('investmentValue');
  const totalAnnualInvestments = 0; // Will be calculated based on investment inputs

  // Calculate 12 Financial Health Ratios
  const calculateRatio = (ratio: number, type: 'coreExpense' | 'totalExpense' | 'debtServicing' | 'cashBuffer' | 'emergencyMonths' | 'savingsRate' | 'investmentAllocation' | 'debtToIncome' | 'debtToAssets' | 'cashToAssets' | 'liquidAssets' | 'debtToLiquid'): { value: number; score: number; description: string } => {
    let score = 1;
    let description = '';

    switch (type) {
      case 'coreExpense':
        const coreExpenseRatio = ratio * 100;
        if (coreExpenseRatio < 40) { score = 5; description = "Outstanding expense management! Your core living costs are well controlled."; }
        else if (coreExpenseRatio <= 50) { score = 4; description = "Good expense discipline. Your essential expenses leave room for savings and investments."; }
        else if (coreExpenseRatio <= 60) { score = 3; description = "Reasonable expense management, but there's scope for optimisation."; }
        else if (coreExpenseRatio <= 75) { score = 2; description = "Your expenses are consuming too much income. Time to review and cut back."; }
        else { score = 1; description = "Critical expense levels. Immediate expense reduction needed to avoid financial stress."; }
        break;

      case 'totalExpense':
        const totalExpenseRatio = ratio * 100;
        if (totalExpenseRatio < 60) { score = 5; description = "Excellent overall spending control! You're living well below your means."; }
        else if (totalExpenseRatio <= 70) { score = 4; description = "Good expense management with healthy room for savings."; }
        else if (totalExpenseRatio <= 80) { score = 3; description = "Your total expenses are reasonable but could be optimised."; }
        else if (totalExpenseRatio <= 95) { score = 2; description = "Expenses are too high relative to income. Consider lifestyle adjustments."; }
        else { score = 1; description = "Dangerous expense levels. Immediate action needed to avoid financial crisis."; }
        break;

      case 'savingsRate':
        const savingsRatePercent = ratio * 100;
        if (savingsRatePercent > 30) { score = 5; description = "Outstanding savings discipline! You're building wealth rapidly."; }
        else if (savingsRatePercent >= 20) { score = 4; description = "Strong savings rate that will compound into significant wealth."; }
        else if (savingsRatePercent >= 15) { score = 3; description = "Decent savings rate, but there's room for improvement."; }
        else if (savingsRatePercent >= 10) { score = 2; description = "Low savings rate. Your future self needs more financial support."; }
        else { score = 1; description = "Critical savings deficit. Your financial future is at risk without immediate changes."; }
        break;

      case 'cashBuffer':
        const cashBufferRatio = ratio * 100;
        if (cashBufferRatio > 100) { score = 5; description = "Outstanding cash reserves! You can handle major financial shocks."; }
        else if (cashBufferRatio >= 75) { score = 4; description = "Strong cash position providing excellent financial security."; }
        else if (cashBufferRatio >= 50) { score = 3; description = "Decent cash buffer, but consider building it further."; }
        else if (cashBufferRatio >= 25) { score = 2; description = "Limited cash reserves. Build your emergency fund priority."; }
        else { score = 1; description = "Dangerously low cash. Any emergency could create serious problems."; }
        break;

      case 'emergencyMonths':
        if (ratio >= 6) { score = 5; description = "Perfect emergency fund! You can weather extended financial storms."; }
        else if (ratio >= 4) { score = 4; description = "Strong emergency coverage providing good financial security."; }
        else if (ratio >= 3) { score = 3; description = "Basic emergency fund in place. Consider building to 6 months."; }
        else if (ratio >= 1) { score = 2; description = "Insufficient emergency coverage. Build this fund immediately."; }
        else { score = 1; description = "No emergency protection. Any unexpected expense could devastate your finances."; }
        break;

      default:
        score = 3;
        description = "Analysis pending for this metric.";
    }

    return { value: ratio, score, description };
  };

  // Calculate specific ratios
  const coreExpenseRatio = totalAnnualIncome > 0 ? (totalAnnualExpenses - totalAnnualLoanPayments) / totalAnnualIncome : 0;
  const totalExpenseRatio = totalAnnualIncome > 0 ? totalAnnualExpenses / totalAnnualIncome : 0;
  const savingsRate = totalAnnualIncome > 0 ? (totalAnnualIncome - totalAnnualExpenses) / totalAnnualIncome : 0;
  const cashBufferRatio = totalAnnualExpenses > 0 ? getValue('savingsAccountsFD') / totalAnnualExpenses : 0;
  const emergencyMonths = totalMonthlyExpenses > 0 ? getValue('savingsAccountsFD') / totalMonthlyExpenses : 0;

  const metrics: FinancialMetrics = {
    coreExpenseRatio: calculateRatio(coreExpenseRatio, 'coreExpense'),
    totalExpenseRatio: calculateRatio(totalExpenseRatio, 'totalExpense'),
    debtServicingRatio: calculateRatio(0, 'debtServicing'),
    cashBufferRatio: calculateRatio(cashBufferRatio, 'cashBuffer'),
    emergencyMonths: calculateRatio(emergencyMonths, 'emergencyMonths'),
    savingsRate: calculateRatio(savingsRate, 'savingsRate'),
    investmentAllocation: calculateRatio(0, 'investmentAllocation'),
    debtToIncomeRatio: calculateRatio(0, 'debtToIncome'),
    debtToAssetsRatio: calculateRatio(0, 'debtToAssets'),
    cashToAssetsRatio: calculateRatio(0, 'cashToAssets'),
    liquidAssetsRatio: calculateRatio(0, 'liquidAssets'),
    debtToLiquidRatio: calculateRatio(0, 'debtToLiquid')
  };

  // Calculate overall score (weighted average)
  const overallScore = (
    metrics.coreExpenseRatio.score * 0.11 +
    metrics.totalExpenseRatio.score * 0.08 +
    metrics.debtServicingRatio.score * 0.11 +
    metrics.cashBufferRatio.score * 0.11 +
    metrics.emergencyMonths.score * 0.11 +
    metrics.savingsRate.score * 0.08 +
    metrics.investmentAllocation.score * 0.06 +
    metrics.debtToIncomeRatio.score * 0.08 +
    metrics.debtToAssetsRatio.score * 0.08 +
    metrics.cashToAssetsRatio.score * 0.06 +
    metrics.liquidAssetsRatio.score * 0.06 +
    metrics.debtToLiquidRatio.score * 0.06
  );

  let overallDescription = '';
  if (overallScore >= 4.5) overallDescription = "Excellent - You're crushing it! Your financial health is outstanding.";
  else if (overallScore >= 3.5) overallDescription = "Good - Solid foundation with room to optimise some areas.";
  else if (overallScore >= 2.5) overallDescription = "Fair - Let's fix some key areas together to improve your financial health.";
  else if (overallScore >= 1.5) overallDescription = "Poor - Time for some serious improvements to secure your financial future.";
  else overallDescription = "Critical - We need to act fast, but you've got this with the right plan.";

  return {
    totalAnnualIncome,
    totalMonthlyExpenses,
    totalAnnualExpenses,
    totalAnnualLoanPayments,
    totalAssets,
    totalDebt,
    netWorth,
    liquidAssets,
    totalAnnualInvestments,
    metrics,
    overallScore,
    overallDescription
  };
};

export const formatCurrency = (amount: number, currencyCode: string = 'INR'): string => {
  const currencySymbols: { [key: string]: string } = {
    'INR': '₹',
    'USD': '$',
    'GBP': '£',
    'EUR': '€',
    'CAD': 'C$',
    'AUD': 'A$',
    'SGD': 'S$',
    'AED': 'د.إ'
  };

  const symbol = currencySymbols[currencyCode] || '₹';

  // Indian style formatting for INR
  if (currencyCode === 'INR') {
    if (amount >= 10000000) {
      return `${symbol}${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `${symbol}${(amount / 1000).toFixed(1)}K`;
    } else {
      return `${symbol}${amount.toLocaleString()}`;
    }
  }

  // Standard formatting for other currencies
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  } else {
    return `${symbol}${amount.toLocaleString()}`;
  }
};