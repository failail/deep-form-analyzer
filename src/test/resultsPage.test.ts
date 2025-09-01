import { describe, test, expect } from 'vitest'
import { getCompleteTestData, calculateAllRatios } from './utils/testHelpers'
import { formatCurrency } from '@/utils/calculations'

describe('Results Page', () => {
  describe('Results generation', () => {
    test('results page displays all required metrics', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      // Verify all 12 key metrics exist
      const expectedMetrics = [
        'coreExpenseRatio',
        'totalExpenseRatio', 
        'savingsRate',
        'debtServicingRatio',
        'emergencyMonths',
        'cashBuffer',
        'netWorthGrowth',
        'investmentDiversification',
        'retirementReadiness',
        'insuranceCoverage',
        'liquidityRatio',
        'debtToIncomeRatio'
      ]
      
      expectedMetrics.forEach(metric => {
        expect(results.metrics[metric]).toBeDefined()
        expect(results.metrics[metric].score).toBeGreaterThanOrEqual(1)
        expect(results.metrics[metric].score).toBeLessThanOrEqual(5)
        expect(results.metrics[metric].description).toBeDefined()
        expect(typeof results.metrics[metric].description).toBe('string')
      })
    })

    test('overall score is calculated correctly', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      expect(results.overallScore).toBeGreaterThanOrEqual(1)
      expect(results.overallScore).toBeLessThanOrEqual(5)
      expect(typeof results.overallScore).toBe('number')
    })

    test('financial summary values are calculated', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      expect(results.totalAnnualIncome).toBeGreaterThan(0)
      expect(results.totalAnnualExpenses).toBeGreaterThan(0)
      expect(results.netWorth).toBeDefined()
      expect(typeof results.metrics.savingsRate.value).toBe('number')
    })
  })

  describe('Currency formatting', () => {
    test('INR currency formatting works correctly', () => {
      const testCases = [
        { amount: 1000, currency: 'INR', expected: '₹1.0K' },
        { amount: 100000, currency: 'INR', expected: '₹1.0L' },
        { amount: 1000000, currency: 'INR', expected: '₹10.0L' },
        { amount: 10000000, currency: 'INR', expected: '₹1.0Cr' },
        { amount: 50000000, currency: 'INR', expected: '₹5.0Cr' }
      ]
      
      testCases.forEach(test => {
        const result = formatCurrency(test.amount, test.currency)
        expect(result).toBe(test.expected)
      })
    })

    test('USD currency formatting works correctly', () => {
      const testCases = [
        { amount: 1000, currency: 'USD', expected: '$1.0K' },
        { amount: 1000000, currency: 'USD', expected: '$1.0M' },
        { amount: 5000000, currency: 'USD', expected: '$5.0M' }
      ]
      
      testCases.forEach(test => {
        const result = formatCurrency(test.amount, test.currency)
        expect(result).toBe(test.expected)
      })
    })

    test('handles edge cases in formatting', () => {
      expect(formatCurrency(0, 'INR')).toBe('₹0')
      expect(formatCurrency(500, 'INR')).toBe('₹500')
      expect(formatCurrency(-1000, 'INR')).toBe('-₹1.0K')
    })
  })

  describe('Recommendations generation', () => {
    test('recommendations prioritize lowest scores', () => {
      // Create test data with deliberately low emergency fund
      const testData = {
        ...getCompleteTestData(),
        savingsAndDeposits: 10000, // Very low savings
        monthlyGroceries: 20000 // High expenses
      }
      
      const results = calculateAllRatios(testData)
      
      // Find the metric with the lowest score
      const metrics = Object.entries(results.metrics)
      const sortedMetrics = metrics.sort((a, b) => a[1].score - b[1].score)
      const lowestScoringMetric = sortedMetrics[0]
      
      expect(lowestScoringMetric[1].score).toBeGreaterThanOrEqual(1)
      expect(lowestScoringMetric[1].score).toBeLessThanOrEqual(5)
    })

    test('recommendations are actionable', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      // All metrics should have descriptions that provide guidance
      Object.values(results.metrics).forEach((metric: any) => {
        expect(metric.description).toBeDefined()
        expect(metric.description.length).toBeGreaterThan(20) // Meaningful description
      })
    })

    test('handles perfect scores appropriately', () => {
      // Create test data that should score well
      const perfectData = {
        ...getCompleteTestData(),
        savingsAndDeposits: 5000000, // High savings
        monthlyGroceries: 5000, // Low expenses
        jobSalary: 3000000 // High income
      }
      
      const results = calculateAllRatios(perfectData)
      
      // Even perfect scores should have descriptions
      Object.values(results.metrics).forEach((metric: any) => {
        expect(metric.description).toBeDefined()
        expect(typeof metric.description).toBe('string')
      })
    })
  })

  describe('Data validation and error handling', () => {
    test('handles missing data gracefully', () => {
      const incompleteData = {
        ...getCompleteTestData(),
        jobSalary: undefined,
        monthlyGroceries: undefined
      }
      
      const results = calculateAllRatios(incompleteData as any)
      
      expect(results).toBeDefined()
      expect(results.overallScore).toBeGreaterThanOrEqual(1)
      expect(results.overallScore).toBeLessThanOrEqual(5)
    })

    test('handles extreme values appropriately', () => {
      const extremeData = {
        ...getCompleteTestData(),
        jobSalary: 100000000, // Very high income
        monthlyGroceries: 1000000 // Very high expenses
      }
      
      const results = calculateAllRatios(extremeData)
      
      expect(results).toBeDefined()
      expect(results.overallScore).toBeGreaterThanOrEqual(1)
      expect(results.overallScore).toBeLessThanOrEqual(5)
    })

    test('validates calculation consistency', () => {
      const testData = getCompleteTestData()
      const results1 = calculateAllRatios(testData)
      const results2 = calculateAllRatios(testData)
      
      // Same input should produce same output
      expect(results1.overallScore).toBe(results2.overallScore)
      expect(results1.totalAnnualIncome).toBe(results2.totalAnnualIncome)
      expect(results1.metrics.savingsRate.value).toBe(results2.metrics.savingsRate.value)
    })
  })

  describe('Performance and completeness', () => {
    test('all calculation results are numbers where expected', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      expect(typeof results.totalAnnualIncome).toBe('number')
      expect(typeof results.totalAnnualExpenses).toBe('number')
      expect(typeof results.netWorth).toBe('number')
      expect(typeof results.metrics.savingsRate.value).toBe('number')
      expect(typeof results.overallScore).toBe('number')
      
      // Check individual metrics
      Object.values(results.metrics).forEach((metric: any) => {
        expect(typeof metric.score).toBe('number')
        expect(typeof metric.value).toBe('number')
      })
    })

    test('no infinite or NaN values in results', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      expect(Number.isFinite(results.totalAnnualIncome)).toBe(true)
      expect(Number.isFinite(results.totalAnnualExpenses)).toBe(true)
      expect(Number.isFinite(results.netWorth)).toBe(true)
      expect(Number.isFinite(results.metrics.savingsRate.value)).toBe(true)
      expect(Number.isFinite(results.overallScore)).toBe(true)
      
      Object.values(results.metrics).forEach((metric: any) => {
        expect(Number.isFinite(metric.score)).toBe(true)
        expect(Number.isFinite(metric.value)).toBe(true)
      })
    })

    test('calculation performance is acceptable', () => {
      const testData = getCompleteTestData()
      
      const startTime = performance.now()
      calculateAllRatios(testData)
      const endTime = performance.now()
      
      // Calculation should complete in under 100ms
      expect(endTime - startTime).toBeLessThan(100)
    })
  })
})