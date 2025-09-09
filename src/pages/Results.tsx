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
import { Download, ArrowLeft, Award, TrendingUp, AlertTriangle } from 'lucide-react';
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
              <Button variant="outline">
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

        {/* Financial Health Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Financial Health Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {metricEntries.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-foreground">{metric.name}</div>
                    <Badge variant={getScoreBadgeVariant(metric.score)}>
                      Score: {metric.score}/5
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <Progress 
                      value={(metric.score / 5) * 100} 
                      className="h-2"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{metric.description}</p>
                   <p className="text-xs text-muted-foreground">
                     Current Value: {typeof metric.value === 'number' ? 
                       (metric.value > 1 ? formatScore(metric.value) + ' months' : formatPercentage(metric.value * 100)) : 
                       metric.value
                     }
                   </p>
                  {index < metricEntries.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
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

export default Results;