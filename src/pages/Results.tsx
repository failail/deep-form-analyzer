import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FormData, CalculationResults } from '@/types/assessment';
import { calculateFinancialHealth } from '@/utils/calculations';
import { getLocalizationConfig, formatNumber, formatPercentage, formatScore, formatCurrency, LocalizationConfig } from '@/utils/localization';
import { Download, ArrowLeft, Award, TrendingUp, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    let data = location.state?.formData;
    
    // Fallback to localStorage only if no state data is available
    if (!data) {
      try {
        const savedData = localStorage.getItem('assessmentData');
        data = savedData ? JSON.parse(savedData) : {};
      } catch (error) {
        console.error('Error reading localStorage:', error);
        data = {};
      }
    }
    
    if (!data || Object.keys(data).length === 0) {
      navigate('/assessment');
      return;
    }

    setFormData(data);
    const calculatedResults = calculateFinancialHealth(data);
    setResults(calculatedResults);
  }, [location.state, navigate]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('results-content');
    if (!element || !results || !formData) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`ManageMeMoney-Financial-Report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!results || !formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading your results...</h2>
          <p className="text-muted-foreground">Calculating your financial health metrics</p>
        </div>
      </div>
    );
  }

  const country = formData.country || 'India';
  const currency = formData.currency || 'INR';
  const firstName = formData.firstName || 'there';
  const localizationConfig = getLocalizationConfig(country, currency);

  // Get priority recommendations (lowest scores first)
  const metricEntries = Object.entries(results.metrics).map(([key, metric]) => ({
    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    ...metric
  }));
  
  const priorityRecommendations = metricEntries
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-success';
    if (score >= 3) return 'text-accent';
    if (score >= 2) return 'text-muted-foreground';
    return 'text-destructive';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 4) return 'default';
    if (score >= 3) return 'secondary';
    if (score >= 2) return 'outline';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold font-manrope">
              <span className="text-foreground">ManageMe</span>
              <span className="text-primary" style={{ fontSize: '1.2em' }}>.</span>
              <span className="text-foreground">Money</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/assessment')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assessment
              </Button>
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl" id="results-content">
        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl">Financial Health Assessment Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 text-primary">
                {formatScore(results.overallScore)}/5.0
              </div>
              <p className="text-xl text-muted-foreground mb-4">{results.overallDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.estimatedNetWorth, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Estimated Net Worth</div>
                <div className="text-xs text-muted-foreground mt-1">Total Assets - Total Liabilities</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.annualIncome, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Annual Income</div>
                <div className="text-xs text-muted-foreground mt-1">Monthly income × 12</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.annualExpenses, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Annual Expenses</div>
                <div className="text-xs text-muted-foreground mt-1">Monthly expenses × 12</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.annualExpensesMinusSavingsInvestments, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Annual Expenses Minus Savings/Investments</div>
                <div className="text-xs text-muted-foreground mt-1">Expenses after deducting savings & investments</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.totalDebt, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Total Debt</div>
                <div className="text-xs text-muted-foreground mt-1">Sum of all liabilities</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.totalSavingsInvestments, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Total Savings & Investments</div>
                <div className="text-xs text-muted-foreground mt-1">Long-term savings and investment instruments</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.totalCashInHand, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Total Cash In Hand</div>
                <div className="text-xs text-muted-foreground mt-1">Liquid cash components</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.monthlyDebtPayments, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Monthly Debt Payments</div>
                <div className="text-xs text-muted-foreground mt-1">Monthly debt outflows</div>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(results.totalMonthlyInvestments, localizationConfig)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">Monthly Investments</div>
                <div className="text-xs text-muted-foreground mt-1">Recurring investment outflows</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 12 Financial Health Ratios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Financial Health Ratios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              {/* 1. Core Expense Ratio */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">1. Core Expense Ratio</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.coreExpenseRatio.score)}>
                    {results.metrics.coreExpenseRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.coreExpenseRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.coreExpenseRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.coreExpenseRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.coreExpenseRatio.value * 100)}
                  </p>
                </div>
              </div>

              {/* 2. Total Expense Ratio */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">2. Total Expense Ratio</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.totalExpenseRatio.score)}>
                    {results.metrics.totalExpenseRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.totalExpenseRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.totalExpenseRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.totalExpenseRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.totalExpenseRatio.value * 100)}
                  </p>
                </div>
              </div>

              {/* 3. Debt Servicing Ratio */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">3. Debt Servicing Ratio</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.debtServicingRatio.score)}>
                    {results.metrics.debtServicingRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.debtServicingRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.debtServicingRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.debtServicingRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.debtServicingRatio.value * 100)}
                  </p>
                </div>
              </div>

              {/* 4. Cash Buffer Ratio */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">4. Cash Buffer Ratio</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.cashBufferRatio.score)}>
                    {results.metrics.cashBufferRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.cashBufferRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.cashBufferRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.cashBufferRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatScore(results.metrics.cashBufferRatio.value)} months
                  </p>
                </div>
              </div>

              {/* 5. Total Debt / Total Assets */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">5. Total Debt / Total Assets</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.debtToAssetsRatio.score)}>
                    {results.metrics.debtToAssetsRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.debtToAssetsRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.debtToAssetsRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.debtToAssetsRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.debtToAssetsRatio.value * 100)}
                  </p>
                </div>
              </div>

              {/* 6. Cash / Total Assets */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">6. Cash / Total Assets</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.cashToAssetsRatio.score)}>
                    {results.metrics.cashToAssetsRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.cashToAssetsRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.cashToAssetsRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.cashToAssetsRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.cashToAssetsRatio.value * 100)}
                  </p>
                </div>
              </div>

              {/* 7. Liquid Assets / Total Assets */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">7. Liquid Assets / Total Assets</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.liquidAssetsRatio.score)}>
                    {results.metrics.liquidAssetsRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.liquidAssetsRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.liquidAssetsRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.liquidAssetsRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.liquidAssetsRatio.value * 100)}
                  </p>
                </div>
              </div>

              {/* 8. Total Debt / Liquid Investments */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">8. Total Debt / Liquid Investments</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.debtToLiquidRatio.score)}>
                    {results.metrics.debtToLiquidRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.debtToLiquidRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.debtToLiquidRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.debtToLiquidRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatScore(results.metrics.debtToLiquidRatio.value)}x
                  </p>
                </div>
              </div>

              {/* 9. Emergency Months Covered */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">9. Emergency Months Covered</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.emergencyMonths.score)}>
                    {results.metrics.emergencyMonths.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.emergencyMonths.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.emergencyMonths.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.emergencyMonths.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatScore(results.metrics.emergencyMonths.value)} months
                  </p>
                </div>
              </div>

              {/* 10. Savings Rate */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">10. Savings Rate</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.savingsRate.score)}>
                    {results.metrics.savingsRate.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.savingsRate.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.savingsRate.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.savingsRate.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.savingsRate.value * 100)}
                  </p>
                </div>
              </div>

              {/* 11. Investment Allocation */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">11. Investment Allocation</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.investmentAllocation.score)}>
                    {results.metrics.investmentAllocation.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.investmentAllocation.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.investmentAllocation.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.investmentAllocation.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatPercentage(results.metrics.investmentAllocation.value * 100)}
                  </p>
                </div>
              </div>

              {/* 12. Debt-to-Income Ratio */}
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">12. Debt-to-Income Ratio</h3>
                  <Badge variant={getScoreBadgeVariant(results.metrics.debtToIncomeRatio.score)}>
                    {results.metrics.debtToIncomeRatio.score}/5
                  </Badge>
                </div>
                <div className="mb-3">
                  <Progress value={(results.metrics.debtToIncomeRatio.score / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">{results.metrics.debtToIncomeRatio.description}</p>
                  <p className="text-xs text-muted-foreground">{results.metrics.debtToIncomeRatio.staticDescription}</p>
                  <p className="text-xs text-muted-foreground">
                    Current Value: {formatScore(results.metrics.debtToIncomeRatio.value)}x
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Priority Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Priority Recommendations for {firstName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {priorityRecommendations.map((recommendation, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Priority {index + 1}</Badge>
                    <div className="font-medium text-foreground">{recommendation.name}</div>
                    <Badge variant={getScoreBadgeVariant(recommendation.score)}>
                      {recommendation.score}/5
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{recommendation.description}</p>
                  <p className="text-sm text-foreground">
                    <strong>Action needed:</strong> {getPrioritySpecificRecommendation(recommendation.name, recommendation.score, results, currency, index)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Income & Expense Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Income Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Primary Salary</span>
                  <span className="font-medium">
                    {formatNumber(formData.jobSalary || 0, localizationConfig)} 
                    ({formatPercentage((formData.jobSalary || 0) / results.totalAnnualIncome * 100)})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Secondary Income</span>
                  <span className="font-medium">
                    {formatNumber((formData.secondJobIncome || 0) + (formData.freelanceIncome || 0), localizationConfig)}
                    ({formatPercentage(((formData.secondJobIncome || 0) + (formData.freelanceIncome || 0)) / results.totalAnnualIncome * 100)})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assets & Liabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <strong>Total Assets: {formatNumber(results.totalAssets, localizationConfig)}</strong>
                  <div className="ml-4 text-sm text-muted-foreground">
                    <div>Cash & FDs: {formatNumber(formData.savingsAccountsFD || 0, localizationConfig)}</div>
                    <div>Investments: {formatNumber(formData.investmentValue || 0, localizationConfig)}</div>
                    <div>Property: {formatNumber(formData.homeCurrentValue || 0, localizationConfig)}</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <strong>Total Debt: {formatNumber(results.totalDebt, localizationConfig)}</strong>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
          <Button variant="outline" onClick={() => navigate('/assessment')}>
            Retake Assessment
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-primary hover:bg-primary/90">
            Download PDF Report
          </Button>
        </div>
      </main>
    </div>
  );
};

const getPrioritySpecificRecommendation = (metricName: string, score: number, results: CalculationResults, currency: string, index: number): string => {
  const lowerName = metricName.toLowerCase();
  
  // Core Expense Ratio - Focus on fixed/essential costs
  if (lowerName.includes('core') && lowerName.includes('expense')) {
    const coreExpenses = results.totalAnnualExpenses - results.totalAnnualLoanPayments;
    const targetCore = results.totalAnnualIncome * 0.5;
    const excessAmount = Math.max(0, coreExpenses - targetCore);
    return `Reduce essential expenses by ${formatCurrency(excessAmount, currency)}. Focus on renegotiating rent, switching to cheaper utilities, refinancing loans at lower rates, or finding more affordable transport options.`;
  }
  
  // Total Expense Ratio - Focus on discretionary/lifestyle costs
  if (lowerName.includes('total') && lowerName.includes('expense')) {
    const excessAmount = Math.max(0, results.totalAnnualExpenses - (results.totalAnnualIncome * 0.7));
    return `Cut discretionary spending by ${formatCurrency(excessAmount, currency)}. Target dining out, entertainment, shopping, subscriptions, and lifestyle upgrades. Track every rupee for 3 months to identify waste.`;
  }

  // Debt Servicing Ratio
  if (lowerName.includes('debt') && lowerName.includes('servicing')) {
    const currentRatio = (results.totalAnnualLoanPayments / results.totalAnnualIncome * 100).toFixed(1);
    return `Your EMIs consume ${currentRatio}% of income. Reduce by prepaying highest-interest loans or extending tenure of low-interest loans to free up monthly cash flow for other priorities.`;
  }

  // Cash Buffer - Different approaches based on priority level
  if (lowerName.includes('cash') && lowerName.includes('buffer')) {
    const targetAmount = results.totalMonthlyExpenses * 6;
    const gap = Math.max(0, targetAmount - results.liquidAssets);
    if (index === 0) {
      return `URGENT: Build emergency fund by ${formatCurrency(gap, currency)}. Open a separate savings account and automate ${formatCurrency(gap / 12, currency)} monthly transfers immediately.`;
    }
    return `Strengthen emergency fund by ${formatCurrency(gap, currency)}. Consider liquid funds or high-yield savings accounts for better returns while maintaining accessibility.`;
  }

  // Emergency Months
  if (lowerName.includes('emergency') && lowerName.includes('months')) {
    const targetAmount = results.totalMonthlyExpenses * 6;
    const gap = Math.max(0, targetAmount - results.liquidAssets);
    return `Build ${formatCurrency(gap, currency)} emergency fund to cover 6 months expenses. Start with ${formatCurrency(gap / 12, currency)} monthly and increase by 10% every quarter until target reached.`;
  }

  // Savings Rate
  if (lowerName.includes('savings') && lowerName.includes('rate')) {
    const currentSavings = results.totalAnnualIncome - results.totalAnnualExpenses;
    const targetSavings = results.totalAnnualIncome * 0.2;
    const gap = Math.max(0, targetSavings - currentSavings);
    return `Boost savings by ${formatCurrency(gap, currency)} annually. Set up automatic transfers on salary day and treat savings as a non-negotiable expense, not leftover money.`;
  }

  // Investment Allocation
  if (lowerName.includes('investment') && lowerName.includes('allocation')) {
    const targetInvestment = results.totalAnnualIncome * 0.15;
    const gap = Math.max(0, targetInvestment - results.totalAnnualInvestments);
    return `Start investing ${formatCurrency(gap, currency)} annually through SIPs. Begin with large-cap equity funds if new to investing, or diversified hybrid funds for lower risk.`;
  }

  // Debt to Income
  if (lowerName.includes('debt') && lowerName.includes('income') && !lowerName.includes('servicing')) {
    const debtRatio = (results.totalDebt / results.totalAnnualIncome * 100).toFixed(1);
    return `Total debt is ${debtRatio}% of annual income. Create aggressive debt payoff plan: list all debts by interest rate, pay minimums on all, then attack highest-rate debt with every extra rupee.`;
  }

  // Debt to Assets
  if (lowerName.includes('debt') && lowerName.includes('assets')) {
    const debtAssetRatio = (results.totalDebt / results.totalAssets * 100).toFixed(1);
    return `Debt represents ${debtAssetRatio}% of total assets. Balance debt reduction with asset building: allocate 70% of surplus to debt payments, 30% to wealth building to avoid stopping financial growth entirely.`;
  }

  // Cash to Assets
  if (lowerName.includes('cash') && lowerName.includes('assets')) {
    const liquidRatio = (results.liquidAssets / results.totalAssets * 100).toFixed(1);
    return `Only ${liquidRatio}% of assets are liquid. Build cash reserves through liquid funds and high-yield savings while maintaining growth investments for better financial flexibility.`;
  }

  // Liquid Assets Ratio
  if (lowerName.includes('liquid') && lowerName.includes('assets')) {
    const liquidRatio = (results.liquidAssets / results.totalAssets * 100).toFixed(1);
    return `${liquidRatio}% asset liquidity needs improvement. Gradually shift some fixed deposits to liquid funds and maintain 20-30% of portfolio in easily accessible investments for opportunities and emergencies.`;
  }

  // Debt to Liquid Assets
  if (lowerName.includes('debt') && lowerName.includes('liquid')) {
    const ratio = results.liquidAssets > 0 ? (results.totalDebt / results.liquidAssets).toFixed(1) : '∞';
    return `Debt is ${ratio}x your liquid assets. Build liquid cushion first before aggressive debt payoff - you need cash buffer to avoid borrowing again during emergencies.`;
  }

  // Fallback to regular recommendation if no specific match
  return getActionRecommendation(metricName, score, results, currency);
};

const getActionRecommendation = (metricName: string, score: number, results: CalculationResults, currency: string): string => {
  const lowerName = metricName.toLowerCase();
  
  // Core Expense Ratio
  if (lowerName.includes('core') && lowerName.includes('expense')) {
    const currentValue = ((results.totalAnnualExpenses - results.totalAnnualLoanPayments) / results.totalAnnualIncome * 100).toFixed(1);
    if (score <= 2) {
      const excessAmount = Math.max(0, (results.totalAnnualExpenses - results.totalAnnualLoanPayments) - (results.totalAnnualIncome * 0.6));
      return `Reduce your annual expenses by ${formatCurrency(excessAmount, currency)} to achieve a healthier 60% expense ratio. Start with discretionary spending like dining out and entertainment.`;
    }
    return `This ratio shows how much of your income goes into unavoidable monthly spending—think rent, utilities, EMIs. Current Value: ${currentValue}%`;
  }
  
  // Total Expense Ratio  
  if (lowerName.includes('total') && lowerName.includes('expense')) {
    const currentValue = (results.totalAnnualExpenses / results.totalAnnualIncome * 100).toFixed(1);
    if (score <= 2) {
      const excessAmount = Math.max(0, results.totalAnnualExpenses - (results.totalAnnualIncome * 0.75));
      return `Reduce your annual expenses by ${formatCurrency(excessAmount, currency)} to achieve a healthier 75% expense ratio. Start with discretionary spending like dining out and entertainment.`;
    }
    return `This is the total of your essential and lifestyle expenses vs your monthly income. Higher the number, lower the savings and flexibility. Current Value: ${currentValue}%`;
  }

  // Debt Servicing Ratio
  if (lowerName.includes('debt') && lowerName.includes('servicing')) {
    const currentValue = (results.totalAnnualLoanPayments / results.totalAnnualIncome * 100).toFixed(1);
    if (score <= 2) {
      return `This tells you how much of your income is used for EMIs and other loan repayments. A higher number signals potential distress or low creditworthiness. Try to stay under 30%. Current Value: ${currentValue}%`;
    }
    return `This tells you how much of your income is used for EMIs and other loan repayments. Current Value: ${currentValue}%`;
  }

  // Cash Buffer Ratio
  if (lowerName.includes('cash') && lowerName.includes('buffer')) {
    const currentValue = results.totalAnnualExpenses > 0 ? (results.liquidAssets / results.totalAnnualExpenses * 100).toFixed(1) : '0';
    const targetAmount = results.totalMonthlyExpenses * 6;
    const gap = Math.max(0, targetAmount - results.liquidAssets);
    if (score <= 2) {
      return `Build your emergency fund by ${formatCurrency(gap, currency)} to cover 6 months of expenses. Save ${formatCurrency(gap / 12, currency)} monthly to reach this goal in a year.`;
    }
    return `This shows your ability to handle financial emergencies without borrowing. Current Value: ${currentValue}%`;
  }

  // Emergency Months
  if (lowerName.includes('emergency')) {
    const currentValue = results.totalMonthlyExpenses > 0 ? (results.liquidAssets / results.totalMonthlyExpenses).toFixed(1) : '0';
    const targetAmount = results.totalMonthlyExpenses * 6;
    const gap = Math.max(0, targetAmount - results.liquidAssets);
    if (score <= 2) {
      return `Build your emergency fund by ${formatCurrency(gap, currency)} to cover 6 months of expenses. Save ${formatCurrency(gap / 12, currency)} monthly to reach this goal in a year.`;
    }
    return `This tells you how many months of expenses you can cover with your liquid savings. Current Value: ${currentValue} months`;
  }

  // Savings Rate
  if (lowerName.includes('savings')) {
    const currentValue = ((results.totalAnnualIncome - results.totalAnnualExpenses) / results.totalAnnualIncome * 100).toFixed(1);
    if (score <= 2) {
      const targetSavings = results.totalAnnualIncome * 0.2 - (results.totalAnnualIncome - results.totalAnnualExpenses);
      return `Increase your savings by ${formatCurrency(targetSavings, currency)} annually to reach a healthy 20% savings rate. Consider automating this amount monthly.`;
    }
    return `This measures how much of your income you're saving each month. Higher is better for wealth building. Current Value: ${currentValue}%`;
  }

  // Investment Allocation
  if (lowerName.includes('investment')) {
    const currentValue = (results.totalAnnualInvestments / results.totalAnnualIncome * 100).toFixed(1);
    if (score <= 2) {
      const targetInvestment = results.totalAnnualIncome * 0.15;
      const gap = Math.max(0, targetInvestment - results.totalAnnualInvestments);
      return `Increase your annual investments by ${formatCurrency(gap, currency)} to reach a healthy 15% allocation. Start with SIPs in diversified mutual funds.`;
    }
    return `This shows what percentage of your income goes toward building long-term wealth through investments. Current Value: ${currentValue}%`;
  }

  // Debt to Income
  if (lowerName.includes('debt') && lowerName.includes('income')) {
    const currentValue = (results.totalDebt / results.totalAnnualIncome * 100).toFixed(1);
    if (score <= 2) {
      return `Create a debt reduction plan: list all debts by interest rate, pay minimums on all, then attack the highest rate debt aggressively. Current Value: ${currentValue}%`;
    }
    return `This compares your total outstanding debt to your annual income. Lower is better for financial stability. Current Value: ${currentValue}%`;
  }

  // Debt to Assets
  if (lowerName.includes('debt') && lowerName.includes('assets')) {
    const currentValue = (results.totalDebt / results.totalAssets * 100).toFixed(1);
    if (score <= 2) {
      return `Focus on both debt reduction and asset building: accelerate debt payments while continuing to build savings and investments. Current Value: ${currentValue}%`;
    }
    return `This shows what portion of your total wealth is actually debt. Lower percentages indicate stronger financial health. Current Value: ${currentValue}%`;
  }

  // Cash to Assets / Liquid Assets Ratio
  if (lowerName.includes('liquid') || (lowerName.includes('cash') && lowerName.includes('assets'))) {
    const currentValue = (results.liquidAssets / results.totalAssets * 100).toFixed(1);
    if (score <= 2) {
      return `Build up your cash and liquid investments for better financial flexibility and emergency preparedness. Current Value: ${currentValue}%`;
    }
    return `This tells you what percentage of your wealth is easily accessible in emergencies or opportunities. Current Value: ${currentValue}%`;
  }

  // Debt to Liquid Assets
  if (lowerName.includes('debt') && lowerName.includes('liquid')) {
    const currentValue = results.liquidAssets > 0 ? (results.totalDebt / results.liquidAssets).toFixed(1) : '∞';
    if (score <= 2) {
      return `Build emergency funds first, then accelerate debt payments to improve this ratio and financial stability. Current Value: ${currentValue}x`;
    }
    return `This compares your total debt to your liquid savings. Lower multiples indicate better debt management. Current Value: ${currentValue}x`;
  }
  
  return "Focus on improving this metric through consistent financial discipline and regular monitoring.";
};

export default Results;