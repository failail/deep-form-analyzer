import { FormData, CalculationResults, FinancialMetrics } from '@/types/assessment';

const getMetricDescription = (type: string, score: number): string => {
  switch (type) {
    case 'coreExpense':
      if (score <= 2) return "Core expenses are way too high—you're operating with very little buffer.";
      if (score === 3) return "Core expenses are manageable but could be optimised for better financial stability.";
      if (score === 4) return "Good control over core expenses, leaving room for savings and investments.";
      return "Excellent core expense management! Your essential costs are well controlled.";

    case 'totalExpense':
      if (score <= 2) return "You're likely spending more than you earn. Risk of debt is high.";
      if (score === 3) return "Total expenses are reasonable but there's scope for optimisation.";
      if (score === 4) return "Good expense management with healthy room for savings.";
      return "Excellent overall spending control! You're living well below your means.";

    case 'debtServicing':
      if (score <= 2) return "High debt burden. Debt reduction should be a priority.";
      if (score === 3) return "Manageable debt, but needs to be watched.";
      if (score === 4) return "Good debt control. Your debt payments are within reasonable limits.";
      return "Excellent debt management! Your debt payments are very manageable.";

    case 'cashBuffer':
      if (score <= 2) return "You're very exposed to emergencies—no real cushion.";
      if (score === 3) return "Decent cash buffer, but consider building it further.";
      if (score === 4) return "Strong cash position providing excellent financial security.";
      return "Outstanding cash reserves! You can handle major financial shocks.";

    case 'emergencyMonths':
      if (score <= 2) return "No emergency protection. Any unexpected expense could devastate your finances.";
      if (score === 3) return "Basic emergency fund in place. Consider building to 6 months.";
      if (score === 4) return "Strong emergency coverage providing good financial security.";
      return "Perfect emergency fund! You can weather extended financial storms.";

    case 'savingsRate':
      if (score <= 2) return "Critical savings deficit. Your financial future is at risk without immediate changes.";
      if (score === 3) return "Decent savings rate, but there's room for improvement.";
      if (score === 4) return "Strong savings rate that will compound into significant wealth.";
      return "Outstanding savings discipline! You're building wealth rapidly.";

    case 'investmentAllocation':
      if (score <= 2) return "No significant investments. You're missing out on wealth creation opportunities.";
      if (score === 3) return "Reasonable investment allocation, but consider increasing it.";
      if (score === 4) return "Good investment discipline creating wealth for your future.";
      return "Excellent investment allocation! You're building long-term wealth effectively.";

    case 'debtToIncome':
      if (score <= 2) return "Critical debt burden. Immediate debt restructuring needed.";
      if (score === 3) return "Moderate debt burden that requires attention.";
      if (score === 4) return "Good debt levels relative to your income.";
      return "Excellent debt-to-income ratio! Your debt levels are very manageable.";

    case 'debtToAssets':
      if (score <= 2) return "High debt levels. Focus on debt reduction.";
      if (score === 3) return "Moderate debt burden that requires attention.";
      if (score === 4) return "Good debt levels relative to your assets.";
      return "Excellent debt-to-assets ratio! Your debt levels are very manageable.";

    case 'cashToAssets':
      if (score <= 2) return "Dangerously low cash. Any emergency could create serious problems.";
      if (score === 3) return "Decent cash position, but consider building liquid reserves.";
      if (score === 4) return "Good cash allocation providing financial flexibility.";
      return "Excellent cash position! You have strong liquidity for opportunities and emergencies.";

    case 'liquidAssets':
      if (score <= 2) return "Very low liquid assets. You need better emergency preparedness.";
      if (score === 3) return "Reasonable liquid asset allocation, but could be improved.";
      if (score === 4) return "Good liquid asset balance providing financial flexibility.";
      return "Excellent liquid asset allocation! Perfect balance of accessibility and growth.";

    case 'debtToLiquid':
      if (score <= 2) return "Critical debt-to-liquid ratio. Immediate action needed to build cash reserves.";
      if (score === 3) return "High debt relative to liquid assets. Focus on building emergency funds.";
      if (score === 4) return "Good debt-to-liquid ratio providing reasonable financial stability.";
      return "Excellent debt-to-liquid ratio! You have strong liquidity relative to debt obligations.";

    default:
      return "Analysis pending for this metric.";
  }
};

export const calculateFinancialHealth = (formData: FormData): CalculationResults => {
  // Helper function to get number value or 0
  const getValue = (key: string): number => {
    const value = formData[key];
    return typeof value === 'number' ? value : (parseFloat(value) || 0);
  };

  // NEW METRIC CALCULATIONS (exact field mapping as specified)
  
  // 1. Estimated Net Worth = Total Assets - Total Liabilities
  const totalAssets = getValue('savingsAccountsFD') + getValue('physicalCash') + 
    getValue('investmentValue') + getValue('retirementSavings') + getValue('jewelleryValue') + 
    getValue('collectiblesValue') + getValue('currentHomesValue') + getValue('currentVehiclesValue');

  const totalLiabilities = getValue('homeOutstandingLoan') + getValue('property1OutstandingLoan') + 
    getValue('vehicle1OutstandingLoan') + getValue('loan1OutstandingBalance');

  const estimatedNetWorth = totalAssets - totalLiabilities;

  // 2. Annual Income = Sum of all income sources
  const annualIncome = getValue('jobSalary') + getValue('secondJobIncome') + getValue('freelanceIncome') + 
    getValue('sideBusinessIncome') + getValue('realEstateIncome') + getValue('hobbyIncome') + 
    getValue('dividendIncome') + getValue('familyStipend') + getValue('otherAnnualIncome');

  // 3. Annual Expenses = (Monthly expenses × 12) + Annual expenses
  // Calculate monthly expenses from all monthly expense groups
  const monthlyExpensesTotal = getValue('monthlyGroceriesToiletries') + getValue('monthlyClothesShoes') + 
    getValue('monthlyElectricity') + getValue('monthlyMobile') + getValue('monthlyDiningOut') + 
    getValue('monthlyCommute') + getValue('monthlyEntertainment') + getValue('monthlyHobbies') + 
    getValue('monthlyAppSubscriptions') + getValue('monthlyInternet') + getValue('monthlyTV') + 
    getValue('monthlyCookingGas') + getValue('monthlyMakeupBeauty') + getValue('monthlyHousehelpCleaningService') + 
    getValue('monthlyPets') + getValue('monthlyAlcohol') + getValue('monthlyCigarettes') + 
    getValue('monthlyMedication') + getValue('monthlyHealthExams') + getValue('monthlyRent') + 
    getValue('vehicle1FuelCost');
  
  // Add annual expenses directly
  const annualExpensesFromAnnualGroup = getValue('annualVacationCost') + getValue('annualGiftingCost') + 
    getValue('annualClothingCost') + getValue('annualInsurancePremiums') + getValue('annualSpecialExpenses');
  
  const annualExpenses = (monthlyExpensesTotal * 12) + annualExpensesFromAnnualGroup;

  // 4. Annual Expenses Minus Savings/Investments
  const annualSavingsInvestments = getValue('annualRetirementInvestments') + 
    (getValue('monthlyMutualFunds') * 12) + (getValue('monthlyTaxSaving') * 12) + 
    (getValue('monthlySavingsDeposits') * 12);
  const annualExpensesMinusSavingsInvestments = annualExpenses - annualSavingsInvestments;

  // 5. Total Debt = Sum of all outstanding loan balances
  const totalDebt = getValue('homeOutstandingLoan') + getValue('property1OutstandingLoan') + 
    getValue('vehicle1OutstandingLoan') + getValue('loan1OutstandingBalance');

  // 6. Total Savings & Investments
  const totalSavingsInvestments = getValue('savingsAccountsFD') + getValue('investmentValue') + 
    getValue('retirementSavings') + (getValue('monthlyMutualFunds') * 12) + 
    (getValue('monthlyTaxSaving') * 12) + (getValue('monthlySavingsDeposits') * 12);

  // 7. Total Cash In Hand
  const totalCashInHand = getValue('physicalCash');

  // 8. Monthly Debt Payments = Sum of EMIs
  const monthlyDebtPayments = getValue('homeMonthlyPayment') + getValue('property1MonthlyPayment') + 
    getValue('vehicle1MonthlyPayment') + getValue('loan1MonthlyPayment');

  // 9. Monthly Investments = Sum of recurring investment deposits
  const totalMonthlyInvestments = getValue('monthlyMutualFunds') + getValue('monthlyTaxSaving') + 
    getValue('monthlySavingsDeposits');

  // Legacy calculations for backward compatibility
  const totalAnnualIncome = annualIncome;
  const totalAnnualExpenses = annualExpenses;
  const netWorth = estimatedNetWorth;
  
  // Legacy calculations for compatibility
  const totalAnnualLoanPayments = monthlyDebtPayments * 12;
  const liquidAssets = totalCashInHand;
  const totalAnnualInvestments = totalMonthlyInvestments * 12;
  const totalMonthlyExpenses = monthlyExpensesTotal;

  // Helper function for ratio calculations with dynamic and static copy
  const calculateRatio = (ratio: number, type: 'coreExpense' | 'totalExpense' | 'debtServicing' | 'cashBuffer' | 'debtToAssets' | 'cashToAssets' | 'liquidAssets' | 'debtToLiquid' | 'emergencyMonths' | 'savingsRate' | 'investmentAllocation' | 'debtToIncome'): { value: number; score: number; description: string; staticDescription: string } => {
    let score = 1;
    let description = '';
    let staticDescription = '';

    switch (type) {
      case 'coreExpense':
        const coreExpensePercent = ratio * 100;
        staticDescription = "This ratio shows how much of your income goes into unavoidable monthly spending—think rent, utilities, EMIs. If this is high, your ability to save, invest, or absorb a shock goes down. Try to bring this below 60% for long-term stability.";
        
        if (coreExpensePercent < 40) { 
          score = 5; 
          description = "You're in a great place—core expenses are under control."; 
        }
        else if (coreExpensePercent <= 65) { 
          score = 4; 
          description = "You're okay, but your essential costs are starting to limit flexibility."; 
        }
        else if (coreExpensePercent <= 85) { 
          score = 3; 
          description = "Your core expenses are eating into financial breathing room."; 
        }
        else { 
          score = 2; 
          description = "Core expenses are way too high—you're operating with very little buffer."; 
        }
        break;

      case 'totalExpense':
        const totalExpensePercent = ratio * 100;
        staticDescription = "This is the total of your essential and lifestyle expenses vs your monthly income. Higher the number, lower the savings and flexibility. Aim to keep it below 75% for long-term financial health.";
        
        if (totalExpensePercent < 50) { 
          score = 5; 
          description = "Excellent. You're living well below your means."; 
        }
        else if (totalExpensePercent <= 75) { 
          score = 4; 
          description = "You're living within your means, but not by much."; 
        }
        else if (totalExpensePercent <= 90) { 
          score = 3; 
          description = "You're at risk of spending too much month to month."; 
        }
        else { 
          score = 2; 
          description = "You're likely spending more than you earn. Risk of debt is high."; 
        }
        break;

      case 'debtServicing':
        const debtServicingPercent = ratio * 100;
        staticDescription = "This tells you how much of your income is used for EMIs and other loan repayments. A higher number signals potential distress or low creditworthiness. Try to stay under 30%.";
        
        if (debtServicingPercent < 10) { 
          score = 5; 
          description = "You're in a strong zone—debt is well under control."; 
        }
        else if (debtServicingPercent <= 30) { 
          score = 4; 
          description = "Manageable debt, but needs to be watched."; 
        }
        else if (debtServicingPercent <= 45) { 
          score = 3; 
          description = "Debt is putting stress on your income."; 
        }
        else { 
          score = 2; 
          description = "Too much income going to debt—financial risk is high."; 
        }
        break;

      case 'cashBuffer':
        staticDescription = "How many months you can survive your current lifestyle with the cash you already have. The higher this is, the more protected you are against sudden expenses or income loss.";
        
        if (ratio < 0.5) { 
          score = 2; 
          description = "You're very exposed to emergencies—no real cushion."; 
        }
        else if (ratio <= 1.5) { 
          score = 3; 
          description = "You have some buffer, but it won't last long."; 
        }
        else if (ratio <= 3) { 
          score = 4; 
          description = "You have a decent short-term buffer."; 
        }
        else { 
          score = 5; 
          description = "Strong cash buffer. You're well prepared for short-term emergencies."; 
        }
        break;

      case 'debtToAssets':
        const debtToAssetsPercent = ratio * 100;
        staticDescription = "Shows how much of your assets are funded by debt. Lower is better. Try to keep this below 30% if possible, especially in volatile income situations.";
        
        if (debtToAssetsPercent < 20) { 
          score = 5; 
          description = "Healthy leverage. Your assets are comfortably larger than your debt."; 
        }
        else if (debtToAssetsPercent <= 40) { 
          score = 4; 
          description = "Acceptable leverage, but don't go higher."; 
        }
        else if (debtToAssetsPercent <= 60) { 
          score = 3; 
          description = "Debt is starting to weigh on your assets."; 
        }
        else { 
          score = 2; 
          description = "Debt is too high relative to your assets. Risk of distress."; 
        }
        break;

      case 'cashToAssets':
        const cashToAssetsPercent = ratio * 100;
        staticDescription = "This ratio helps you understand how liquid your overall portfolio is. Having too much in cash means low returns. Too little and you may not survive a shock. Balance is key.";
        
        if (cashToAssetsPercent < 5) { 
          score = 2; 
          description = "Your liquidity is low—you might struggle in a crisis."; 
        }
        else if (cashToAssetsPercent <= 10) { 
          score = 3; 
          description = "You have basic liquidity, but not much more."; 
        }
        else if (cashToAssetsPercent <= 20) { 
          score = 4; 
          description = "Good liquidity balance—assets aren't all locked up."; 
        }
        else { 
          score = 5; 
          description = "Very high liquidity. That's safe, but unused cash might lose value."; 
        }
        break;

      case 'liquidAssets':
        const liquidAssetsPercent = ratio * 100;
        staticDescription = "How easily your assets can be turned into cash. Good liquidity is critical if you face job loss, a health event, or need fast cash. Too much liquidity may indicate conservative investing.";
        
        if (liquidAssetsPercent < 15) { 
          score = 2; 
          description = "Too much of your money is tied up in illiquid assets."; 
        }
        else if (liquidAssetsPercent <= 35) { 
          score = 3; 
          description = "Not bad, but a little more liquidity wouldn't hurt."; 
        }
        else if (liquidAssetsPercent <= 60) { 
          score = 4; 
          description = "Nice balance—liquidity is healthy."; 
        }
        else { 
          score = 5; 
          description = "Very high liquidity. Consider deploying some of it for growth."; 
        }
        break;

      case 'debtToLiquid':
        staticDescription = "This ratio compares your debt to how much you can quickly liquidate to repay it. Useful if you want to assess how much financial strain you're under in a crisis.";
        
        if (ratio < 0.5) { 
          score = 5; 
          description = "You could clear debt easily if needed. Excellent."; 
        }
        else if (ratio <= 1) { 
          score = 4; 
          description = "Debt is manageable but don't let it rise."; 
        }
        else if (ratio <= 2) { 
          score = 3; 
          description = "Your debt is starting to outpace liquid investments."; 
        }
        else { 
          score = 2; 
          description = "Debt is far higher than what you could repay quickly. Risk is high."; 
        }
        break;

      case 'emergencyMonths':
        staticDescription = "A must-have for everyone—this is how many months you can survive without income. Health issues, job loss, or family events can hit anytime. Target 3–6 months at a minimum.";
        
        if (ratio < 1) { 
          score = 2; 
          description = "Emergency funds are dangerously low."; 
        }
        else if (ratio <= 3) { 
          score = 3; 
          description = "Okay for short-term issues, but risky."; 
        }
        else if (ratio <= 6) { 
          score = 4; 
          description = "Good buffer—gives you breathing room."; 
        }
        else { 
          score = 5; 
          description = "Excellent. You can weather long-term emergencies."; 
        }
        break;

      case 'savingsRate':
        const savingsRatePercent = ratio * 100;
        staticDescription = "This is how much of your income you actually save. More savings = more freedom, more options. 25%+ is a great place to be.";
        
        if (savingsRatePercent < 10) { 
          score = 2; 
          description = "You're saving too little to build future wealth."; 
        }
        else if (savingsRatePercent <= 25) { 
          score = 3; 
          description = "You're saving, but could do more."; 
        }
        else if (savingsRatePercent <= 40) { 
          score = 4; 
          description = "Strong savings rate—well done."; 
        }
        else { 
          score = 5; 
          description = "Excellent. You're building a serious buffer."; 
        }
        break;

      case 'investmentAllocation':
        const investmentPercent = ratio * 100;
        staticDescription = "A good financial plan is long-term in nature. This metric shows how much of your investments are aimed at long-term goals like retirement, not just short-term liquidity.";
        
        if (investmentPercent < 25) { 
          score = 2; 
          description = "You may be too short-term focused. Risk of low growth."; 
        }
        else if (investmentPercent <= 50) { 
          score = 3; 
          description = "Balanced approach but review asset goals."; 
        }
        else if (investmentPercent <= 75) { 
          score = 4; 
          description = "You're prioritizing long-term wealth. Smart."; 
        }
        else { 
          score = 5; 
          description = "Excellent. You're investing for the future."; 
        }
        break;

      case 'debtToIncome':
        staticDescription = "This is the big picture: your total borrowings vs income. Lower is always better. If you're over 2x, it's time to actively reduce debt.";
        
        if (ratio < 1) { 
          score = 5; 
          description = "Debt is well within income limits. You're in a good place."; 
        }
        else if (ratio <= 2) { 
          score = 4; 
          description = "Debt is reasonable, but stay alert."; 
        }
        else if (ratio <= 4) { 
          score = 3; 
          description = "Debt is starting to overpower your income."; 
        }
        else { 
          score = 2; 
          description = "You're heavily leveraged. Time to cut back or restructure."; 
        }
        break;

      default:
        score = 3;
        description = "Analysis pending for this metric.";
        staticDescription = "Additional analysis required for this metric.";
    }

    return { 
      value: ratio, 
      score, 
      description: getMetricDescription(type, score),
      staticDescription 
    };
  };

  // Calculate the 12 exact financial ratios as specified
  const monthlyIncome = totalAnnualIncome / 12;
  const coreMonthlyExpenses = (monthlyExpensesTotal - getValue('monthlyDiningOut') - getValue('monthlyEntertainment') - getValue('monthlyHobbies') - getValue('monthlyAppSubscriptions') - getValue('monthlyAlcohol') - getValue('monthlyCigarettes')) + monthlyDebtPayments;
  const liquidInvestments = getValue('savingsAccountsFD') + getValue('investmentValue') + getValue('retirementSavings');
  const longTermInvestments = getValue('investmentValue') + getValue('retirementSavings') + (getValue('monthlyMutualFunds') * 12);
  
  // 1. Core Expense Ratio = Monthly core expenses ÷ Monthly income
  const coreExpenseRatio = monthlyIncome > 0 ? coreMonthlyExpenses / monthlyIncome : 0;
  
  // 2. Total Expense Ratio = (Core + Lifestyle expenses) ÷ Monthly income
  const totalExpenseRatio = monthlyIncome > 0 ? monthlyExpensesTotal / monthlyIncome : 0;
  
  // 3. Debt Servicing Ratio = Monthly debt payments ÷ Monthly income
  const debtServicingRatio = monthlyIncome > 0 ? monthlyDebtPayments / monthlyIncome : 0;
  
  // 4. Cash Buffer Ratio = Cash in hand ÷ Monthly expenses
  const cashBufferRatio = monthlyExpensesTotal > 0 ? totalCashInHand / monthlyExpensesTotal : 0;
  
  // 5. Total Debt / Total Assets
  const debtToAssetsRatio = totalAssets > 0 ? totalDebt / totalAssets : 0;
  
  // 6. Cash / Total Assets
  const cashToAssetsRatio = totalAssets > 0 ? totalCashInHand / totalAssets : 0;
  
  // 7. Liquid Assets / Total Assets
  const liquidAssetsRatio = totalAssets > 0 ? liquidInvestments / totalAssets : 0;
  
  // 8. Total Debt / Liquid Investments
  const debtToLiquidRatio = liquidInvestments > 0 ? totalDebt / liquidInvestments : 0;
  
  // 9. Emergency Months Covered = Cash buffer ÷ Core monthly expenses
  const emergencyMonths = coreMonthlyExpenses > 0 ? totalCashInHand / coreMonthlyExpenses : 0;
  
  // 10. Savings Rate = Monthly savings ÷ Monthly income
  const monthlySavings = monthlyIncome - monthlyExpensesTotal;
  const savingsRate = monthlyIncome > 0 ? monthlySavings / monthlyIncome : 0;
  
  // 11. Investment Allocation = Long-term investments ÷ Total investments
  const totalInvestments = liquidInvestments + longTermInvestments;
  const investmentAllocation = totalInvestments > 0 ? longTermInvestments / totalInvestments : 0;
  
  // 12. Debt-to-Income Ratio = Total outstanding debt ÷ Annual income
  const debtToIncomeRatio = totalAnnualIncome > 0 ? totalDebt / totalAnnualIncome : 0;

  const metrics: FinancialMetrics = {
    coreExpenseRatio: calculateRatio(coreExpenseRatio, 'coreExpense'),
    totalExpenseRatio: calculateRatio(totalExpenseRatio, 'totalExpense'),
    debtServicingRatio: calculateRatio(debtServicingRatio, 'debtServicing'),
    cashBufferRatio: calculateRatio(cashBufferRatio, 'cashBuffer'),
    debtToAssetsRatio: calculateRatio(debtToAssetsRatio, 'debtToAssets'),
    cashToAssetsRatio: calculateRatio(cashToAssetsRatio, 'cashToAssets'),
    liquidAssetsRatio: calculateRatio(liquidAssetsRatio, 'liquidAssets'),
    debtToLiquidRatio: calculateRatio(debtToLiquidRatio, 'debtToLiquid'),
    emergencyMonths: calculateRatio(emergencyMonths, 'emergencyMonths'),
    savingsRate: calculateRatio(savingsRate, 'savingsRate'),
    investmentAllocation: calculateRatio(investmentAllocation, 'investmentAllocation'),
    debtToIncomeRatio: calculateRatio(debtToIncomeRatio, 'debtToIncome')
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
    overallDescription,
    // NEW METRICS FOR SUMMARY DISPLAY
    estimatedNetWorth,
    annualIncome,
    annualExpenses,
    annualExpensesMinusSavingsInvestments,
    totalSavingsInvestments,
    totalCashInHand,
    monthlyDebtPayments,
    totalMonthlyInvestments
  };
};

// Legacy formatCurrency function - kept for backward compatibility
// New code should use formatNumber from localization.ts
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

  // Use proper localized formatting - import required functions
  const { getLocalizationConfig, formatNumber } = require('./localization');
  const country = currencyCode === 'INR' ? 'India' : 'United States';
  const config = getLocalizationConfig(country, currencyCode);
  return formatNumber(amount, config, true);
};