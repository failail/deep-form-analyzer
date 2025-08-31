import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FormData, CalculationResults } from '@/types/assessment';
import { calculateFinancialHealth, formatCurrency } from '@/utils/calculations';
import { Download, ArrowLeft, Award, TrendingUp, AlertTriangle } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const data = location.state?.formData || JSON.parse(localStorage.getItem('assessmentData') || '{}');
    
    if (!data || Object.keys(data).length === 0) {
      navigate('/assessment');
      return;
    }

    setFormData(data);
    const calculatedResults = calculateFinancialHealth(data);
    setResults(calculatedResults);
  }, [location.state, navigate]);

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

  const currency = formData.currency || 'INR';
  const firstName = formData.firstName || 'there';

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
            <div className="text-xl font-bold">
              <span className="text-foreground">ManageMe</span>
              <span className="text-primary text-2xl">.</span>
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
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
                {results.overallScore.toFixed(1)}/5.0
              </div>
              <p className="text-xl text-muted-foreground mb-4">{results.overallDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(results.netWorth, currency)}
                </div>
                <div className="text-sm text-muted-foreground">Net Worth</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(results.totalAnnualIncome, currency)}
                </div>
                <div className="text-sm text-muted-foreground">Annual Income</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(results.totalAnnualExpenses, currency)}
                </div>
                <div className="text-sm text-muted-foreground">Annual Expenses</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {formatCurrency(results.totalAnnualIncome - results.totalAnnualExpenses, currency)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Annual Surplus ({((results.totalAnnualIncome - results.totalAnnualExpenses) / results.totalAnnualIncome * 100).toFixed(1)}% savings rate)
                </div>
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
                      (metric.value > 1 ? metric.value.toFixed(1) + ' months' : (metric.value * 100).toFixed(1) + '%') : 
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
                    <strong>Action needed:</strong> {getActionRecommendation(recommendation.name, recommendation.score, results, currency)}
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
                    {formatCurrency(formData.jobSalary || 0, currency)} 
                    ({((formData.jobSalary || 0) / results.totalAnnualIncome * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Secondary Income</span>
                  <span className="font-medium">
                    {formatCurrency((formData.secondJobIncome || 0) + (formData.freelanceIncome || 0), currency)}
                    ({(((formData.secondJobIncome || 0) + (formData.freelanceIncome || 0)) / results.totalAnnualIncome * 100).toFixed(1)}%)
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
                  <strong>Total Assets: {formatCurrency(results.totalAssets, currency)}</strong>
                  <div className="ml-4 text-sm text-muted-foreground">
                    <div>Cash & FDs: {formatCurrency(formData.savingsAccountsFD || 0, currency)}</div>
                    <div>Investments: {formatCurrency(formData.investmentValue || 0, currency)}</div>
                    <div>Property: {formatCurrency(formData.homeCurrentValue || 0, currency)}</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <strong>Total Debt: {formatCurrency(results.totalDebt, currency)}</strong>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
          <Button variant="outline" onClick={() => navigate('/assessment')}>
            Retake Assessment
          </Button>
        </div>
      </main>
    </div>
  );
};

const getActionRecommendation = (metricName: string, score: number, results: CalculationResults, currency: string): string => {
  if (metricName.toLowerCase().includes('expense')) {
    if (score <= 2) {
      const excessAmount = Math.max(0, results.totalAnnualExpenses - (results.totalAnnualIncome * 0.7));
      return `Reduce your annual expenses by ${formatCurrency(excessAmount, currency)} to achieve a healthier 70% expense ratio. Start with discretionary spending like dining out and entertainment.`;
    }
    return "Review your monthly expenses and identify areas where you can cut back by 10-15%.";
  }
  
  if (metricName.toLowerCase().includes('savings')) {
    if (score <= 2) {
      const targetSavings = results.totalAnnualIncome * 0.2 - (results.totalAnnualIncome - results.totalAnnualExpenses);
      return `Increase your savings by ${formatCurrency(targetSavings, currency)} annually to reach a healthy 20% savings rate. Consider automating this amount monthly.`;
    }
    return "Set up automatic transfers to boost your savings rate to at least 20% of income.";
  }
  
  if (metricName.toLowerCase().includes('emergency') || metricName.toLowerCase().includes('cash')) {
    const targetAmount = results.totalMonthlyExpenses * 6;
    const currentAmount = results.liquidAssets;
    const gap = Math.max(0, targetAmount - currentAmount);
    return `Build your emergency fund by ${formatCurrency(gap, currency)} to cover 6 months of expenses. Save ${formatCurrency(gap / 12, currency)} monthly to reach this goal in a year.`;
  }
  
  return "Focus on improving this metric through consistent financial discipline and regular monitoring.";
};

export default Results;