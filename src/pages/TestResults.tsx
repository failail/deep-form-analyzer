import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateFinancialHealth, formatCurrency } from '@/utils/calculations';
import { highDebtUserScenario, goodHealthUserScenario, retirementReadyUserScenario } from '@/test-scenarios';
import { useNavigate } from 'react-router-dom';

const TestResults = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  const scenarios = {
    'high-debt': {
      name: 'Scenario A - High Debt User',
      data: highDebtUserScenario,
      description: 'Annual income: ₹8L, Monthly rent: ₹30K, Personal loan: ₹5L balance, Cash savings: ₹50K, Monthly expenses: ₹60K'
    },
    'good-health': {
      name: 'Scenario B - Good Financial Health User',
      data: goodHealthUserScenario,
      description: 'Annual income: ₹15L, Own home: ₹50L value + ₹20L loan, Cash savings: ₹8L, Investments: ₹6L, Monthly expenses: ₹70K'
    },
    'retirement-ready': {
      name: 'Scenario C - Retirement Ready User',
      data: retirementReadyUserScenario,
      description: 'Annual income: ₹20L+, Multiple properties and investments, High cash reserves, Low monthly expenses'
    }
  };

  const testScenario = (scenarioKey: string) => {
    const scenario = scenarios[scenarioKey as keyof typeof scenarios];
    if (!scenario) return;

    // Save to localStorage and navigate to results
    localStorage.setItem('assessmentData', JSON.stringify(scenario.data));
    navigate('/results', { state: { formData: scenario.data } });
  };

  const verifyCalculations = (scenarioKey: string) => {
    const scenario = scenarios[scenarioKey as keyof typeof scenarios];
    if (!scenario) return;

    const results = calculateFinancialHealth(scenario.data);
    setSelectedScenario(scenarioKey);
    
    // Log detailed calculations for verification
    console.log(`=== ${scenario.name} ===`);
    console.log('Raw Calculation Results:', results);
    
    if (scenarioKey === 'high-debt') {
      // Manual verification for Scenario A
      const monthlyExpenses = 60000; // Approximate from data
      const emergencyMonths = 50000 / monthlyExpenses;
      const savingsRate = (800000 - (monthlyExpenses * 12)) / 800000;
      const debtServicing = (15000 * 12) / 800000;
      
      console.log('Manual Calculations for Scenario A:');
      console.log(`Emergency months: ${emergencyMonths.toFixed(2)} (${50000} ÷ ${monthlyExpenses})`);
      console.log(`Savings rate: ${(savingsRate * 100).toFixed(1)}% ((${800000} - ${monthlyExpenses * 12}) ÷ ${800000})`);
      console.log(`Debt servicing ratio: ${(debtServicing * 100).toFixed(1)}% (${15000 * 12} ÷ ${800000})`);
      console.log(`Expected overall score: 2.0-2.5/5.0 (Poor category)`);
      console.log('---');
      console.log('Calculated Results:');
      console.log(`Emergency months: ${results.metrics.emergencyMonths.value.toFixed(2)}`);
      console.log(`Savings rate: ${(results.metrics.savingsRate.value * 100).toFixed(1)}%`);
      console.log(`Debt servicing ratio: ${(results.metrics.debtServicingRatio.value * 100).toFixed(1)}%`);
      console.log(`Overall score: ${results.overallScore.toFixed(1)}/5.0`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              <span className="text-foreground">ManageMe</span>
              <span className="text-primary text-2xl">.</span>
              <span className="text-foreground">Money</span>
              <span className="text-muted-foreground ml-2">- Test Results</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Results Page Verification Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Test the three scenarios to verify calculations, currency formatting, and recommendation logic.
            </p>
            
            <div className="space-y-6">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <div key={key} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{scenario.name}</h3>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => verifyCalculations(key)}
                      >
                        Verify Calculations
                      </Button>
                      <Button onClick={() => testScenario(key)}>
                        View Results Page
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedScenario && (
              <div className="mt-8 p-4 bg-accent/10 border border-accent rounded-lg">
                <h4 className="font-medium mb-2">Calculation Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Check the browser console for detailed calculation breakdowns and manual verification.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  The calculations should match the expected formulas for financial ratios.
                </p>
              </div>
            )}

            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Verification Checklist:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Overall score (X.X/5.0) with correct description</li>
                <li>✓ All 12 financial ratios with individual scores (1-5) and descriptions</li>
                <li>✓ Income/expense breakdown with percentages</li>
                <li>✓ Assets and liabilities summary</li>
                <li>✓ Priority recommendations ordered by lowest ratio scores</li>
                <li>✓ Proper currency formatting (₹10.0L, ₹5.0Cr format)</li>
                <li>✓ British English throughout</li>
                <li>✓ Download PDF functionality working</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TestResults;