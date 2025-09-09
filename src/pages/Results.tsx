import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FormData, CalculationResults } from '@/types/assessment';
import { calculateFinancialHealth } from '@/utils/calculations';
import { getLocalizationConfig, formatNumber, formatPercentage, formatScore, LocalizationConfig } from '@/utils/localization';
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

        {/* Category Checklist with Redundancy Check */}
        {renderCategoryChecklist(results, formData, localizationConfig, getScoreBadgeVariant)}

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
                    <strong>Action needed:</strong> {getActionRecommendation(recommendation.name, recommendation.score, results, localizationConfig)}
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

const getActionRecommendation = (metricName: string, score: number, results: CalculationResults, localizationConfig: LocalizationConfig): string => {
  if (metricName.toLowerCase().includes('expense')) {
    if (score <= 2) {
      const excessAmount = Math.max(0, results.totalAnnualExpenses - (results.totalAnnualIncome * 0.7));
      return `Reduce your annual expenses by ${formatNumber(excessAmount, localizationConfig)} to achieve a healthier 70% expense ratio. Start with discretionary spending like dining out and entertainment.`;
    }
    return "Review your monthly expenses and identify areas where you can cut back by 10-15%.";
  }
  
  if (metricName.toLowerCase().includes('savings')) {
    if (score <= 2) {
      const targetSavings = results.totalAnnualIncome * 0.2 - (results.totalAnnualIncome - results.totalAnnualExpenses);
      return `Increase your savings by ${formatNumber(targetSavings, localizationConfig)} annually to reach a healthy 20% savings rate. Consider automating this amount monthly.`;
    }
    return "Set up automatic transfers to boost your savings rate to at least 20% of income.";
  }
  
  if (metricName.toLowerCase().includes('emergency') || metricName.toLowerCase().includes('cash')) {
    const targetAmount = results.totalMonthlyExpenses * 6;
    const currentAmount = results.liquidAssets;
    const gap = Math.max(0, targetAmount - currentAmount);
    return `Build your emergency fund by ${formatNumber(gap, localizationConfig)} to cover 6 months of expenses. Save ${formatNumber(gap / 12, localizationConfig)} monthly to reach this goal in a year.`;
  }
  
  return "Focus on improving this metric through consistent financial discipline and regular monitoring.";
};

interface ChecklistCategory {
  name: string;
  description: string;
  isVisible: boolean;
  score?: number;
  status: 'good' | 'fair' | 'poor';
}

const renderCategoryChecklist = (
  results: CalculationResults, 
  formData: FormData, 
  localizationConfig: LocalizationConfig,
  getScoreBadgeVariant: (score: number) => "default" | "secondary" | "destructive" | "outline"
) => {
  // Define all possible checklist categories
  const allCategories: ChecklistCategory[] = [
    {
      name: "Personal Finance Health",
      description: "Overall financial wellness score",
      isVisible: true, // This is always shown in the executive summary
      score: results.overallScore,
      status: results.overallScore >= 4 ? 'good' : results.overallScore >= 3 ? 'fair' : 'poor'
    },
    {
      name: "Insurance Check",
      description: "Insurance coverage assessment",
      isVisible: !!(formData.lifeInsuranceValue || formData.healthInsuranceValue),
      score: calculateInsuranceScore(formData),
      status: calculateInsuranceScore(formData) >= 4 ? 'good' : calculateInsuranceScore(formData) >= 3 ? 'fair' : 'poor'
    },
    {
      name: "Emergency Fund Status",
      description: "Cash buffer for emergencies",
      isVisible: true, // Already shown in ratios as "Emergency Months Covered"
      score: results.metrics.emergencyMonths.score,
      status: results.metrics.emergencyMonths.score >= 4 ? 'good' : results.metrics.emergencyMonths.score >= 3 ? 'fair' : 'poor'
    },
    {
      name: "Debt Health", 
      description: "Debt management and servicing capacity",
      isVisible: true, // Already shown in ratios as "Debt Servicing Ratio" and "Debt-to-Income Ratio"
      score: Math.min(results.metrics.debtServicingRatio.score, results.metrics.debtToIncomeRatio.score),
      status: Math.min(results.metrics.debtServicingRatio.score, results.metrics.debtToIncomeRatio.score) >= 4 ? 'good' : 
              Math.min(results.metrics.debtServicingRatio.score, results.metrics.debtToIncomeRatio.score) >= 3 ? 'fair' : 'poor'
    },
    {
      name: "Investment Diversification",
      description: "Portfolio allocation and investment spread",
      isVisible: true, // Already shown in ratios as "Investment Allocation"
      score: results.metrics.investmentAllocation.score,
      status: results.metrics.investmentAllocation.score >= 4 ? 'good' : results.metrics.investmentAllocation.score >= 3 ? 'fair' : 'poor'
    },
    {
      name: "Retirement Prep",
      description: "Retirement savings and planning readiness",
      isVisible: !!(formData.retirementSavings || formData.annualRetirementInvestments),
      score: calculateRetirementScore(formData, results),
      status: calculateRetirementScore(formData, results) >= 4 ? 'good' : calculateRetirementScore(formData, results) >= 3 ? 'fair' : 'poor'
    },
    {
      name: "Financial Freedom Score",
      description: "Path to financial independence assessment",
      isVisible: results.annualIncome > results.annualExpenses,
      score: calculateFinancialFreedomScore(results),
      status: calculateFinancialFreedomScore(results) >= 4 ? 'good' : calculateFinancialFreedomScore(results) >= 3 ? 'fair' : 'poor'
    },
    {
      name: "FIRE Plan Readiness",
      description: "Financial Independence, Retire Early planning status",
      isVisible: results.metrics.savingsRate.value > 0.15, // Only show if savings rate > 15%
      score: calculateFIREScore(results),
      status: calculateFIREScore(results) >= 4 ? 'good' : calculateFIREScore(results) >= 3 ? 'fair' : 'poor'
    }
  ];

  // Apply redundancy check
  const sectionsAlreadyShown = [
    'Personal Finance Health', // Shown in executive summary
    'Emergency Fund Status',   // Shown in ratios section
    'Debt Health',            // Shown in ratios section  
    'Investment Diversification' // Shown in ratios section
  ];

  // Filter out redundant categories
  const nonRedundantCategories = allCategories.filter(category => {
    // If category is not visible based on user data, exclude it
    if (!category.isVisible) return false;
    
    // If category is already shown elsewhere in detail, exclude it
    if (sectionsAlreadyShown.includes(category.name)) return false;
    
    return true;
  });

  // If no categories remain after filtering, don't show the section
  if (nonRedundantCategories.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6" />
          Financial Health Category Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nonRedundantCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                {category.status === 'good' ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : category.status === 'fair' ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <div>
                  <div className="font-medium text-foreground">{category.name}</div>
                  <div className="text-sm text-muted-foreground">{category.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {category.score && (
                  <Badge variant={getScoreBadgeVariant(category.score)}>
                    {formatScore(category.score)}/5
                  </Badge>
                )}
                <Badge variant={category.status === 'good' ? 'default' : category.status === 'fair' ? 'secondary' : 'destructive'}>
                  {category.status === 'good' ? 'Good' : category.status === 'fair' ? 'Fair' : 'Needs Work'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions for calculating category scores
const calculateInsuranceScore = (formData: FormData): number => {
  const lifeInsurance = formData.lifeInsuranceValue || 0;
  const healthInsurance = formData.healthInsuranceValue || 0;
  const annualIncome = formData.jobSalary || 0;
  
  if (!lifeInsurance && !healthInsurance) return 1;
  if (lifeInsurance >= annualIncome * 5 && healthInsurance > 0) return 5;
  if (lifeInsurance >= annualIncome * 3 && healthInsurance > 0) return 4;
  if (lifeInsurance >= annualIncome && healthInsurance > 0) return 3;
  if (lifeInsurance > 0 || healthInsurance > 0) return 2;
  return 1;
};

const calculateRetirementScore = (formData: FormData, results: CalculationResults): number => {
  const retirementSavings = formData.retirementSavings || 0;
  const annualRetirementInvestment = formData.annualRetirementInvestments || 0;
  const annualIncome = results.annualIncome;
  
  if (!retirementSavings && !annualRetirementInvestment) return 1;
  
  const retirementSavingsRatio = retirementSavings / annualIncome;
  const retirementInvestmentRatio = annualRetirementInvestment / annualIncome;
  
  if (retirementSavingsRatio >= 3 && retirementInvestmentRatio >= 0.15) return 5;
  if (retirementSavingsRatio >= 2 && retirementInvestmentRatio >= 0.1) return 4;
  if (retirementSavingsRatio >= 1 && retirementInvestmentRatio >= 0.05) return 3;
  if (retirementSavingsRatio >= 0.5 || retirementInvestmentRatio >= 0.03) return 2;
  return 1;
};

const calculateFinancialFreedomScore = (results: CalculationResults): number => {
  const netWorth = results.estimatedNetWorth;
  const annualExpenses = results.annualExpenses;
  const savingsRate = results.metrics.savingsRate.value;
  
  if (netWorth <= 0 || annualExpenses <= 0) return 1;
  
  const yearsOfExpensesCovered = netWorth / annualExpenses;
  
  if (yearsOfExpensesCovered >= 25 && savingsRate >= 0.5) return 5;
  if (yearsOfExpensesCovered >= 15 && savingsRate >= 0.3) return 4;
  if (yearsOfExpensesCovered >= 10 && savingsRate >= 0.2) return 3;
  if (yearsOfExpensesCovered >= 5 && savingsRate >= 0.1) return 2;
  return 1;
};

const calculateFIREScore = (results: CalculationResults): number => {
  const savingsRate = results.metrics.savingsRate.value;
  const netWorth = results.estimatedNetWorth;
  const annualExpenses = results.annualExpenses;
  
  if (savingsRate < 0.15) return 1; // Minimum threshold for FIRE consideration
  
  const yearsToFIRE = netWorth > 0 && annualExpenses > 0 ? 
    Math.max(0, (25 * annualExpenses - netWorth) / (results.annualIncome * savingsRate)) : 999;
  
  if (yearsToFIRE <= 10 && savingsRate >= 0.5) return 5;
  if (yearsToFIRE <= 15 && savingsRate >= 0.4) return 4;
  if (yearsToFIRE <= 20 && savingsRate >= 0.3) return 3;
  if (yearsToFIRE <= 30 && savingsRate >= 0.2) return 2;
  return 1;
};

export default Results;