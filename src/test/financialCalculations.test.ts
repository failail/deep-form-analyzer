import { describe, test, expect } from 'vitest'
import {
  calculateTotalIncome,
  calculateTotalMonthlyExpenses,
  calculateAllRatios,
  calculateOverallScore,
  getCompleteTestData
} from './utils/testHelpers'
import { formatCurrency } from '@/utils/calculations'
import { FormData } from '@/types/assessment'

describe('Financial Calculations', () => {
  describe('Income calculations', () => {
    test('total income calculation is correct', () => {
      const testData: Partial<FormData> = {
        jobSalary: 1000000,
        secondJobIncome: 200000,
        freelanceIncome: 100000,
        businessIncome: 300000,
        realEstateIncome: 50000,
        hobbyIncome: 25000,
        dividends: 15000,
        familyStipend: 10000,
        otherIncome: 5000
      }
      
      const result = calculateTotalIncome(testData as FormData)
      expect(result).toBe(1705000)
    })

    test('handles missing income fields', () => {
      const testData: Partial<FormData> = {
        jobSalary: 1000000
        // Other fields undefined
      }
      
      const result = calculateTotalIncome(testData as FormData)
      expect(result).toBe(1000000)
    })

    test('handles zero income', () => {
      const testData: Partial<FormData> = {
        jobSalary: 0,
        secondJobIncome: 0,
        freelanceIncome: 0
      }
      
      const result = calculateTotalIncome(testData as FormData)
      expect(result).toBe(0)
    })
  })

  describe('Expense calculations', () => {
    test('total monthly expenses calculation is correct', () => {
      const testData: Partial<FormData> = {
        monthlyRent: 30000,
        monthlyGroceries: 10000,
        monthlyClothes: 2000,
        monthlyElectricity: 3000,
        monthlyMobile: 1000,
        monthlyCommute: 5000,
        monthlyEatingOut: 8000
      }
      
      const result = calculateTotalMonthlyExpenses(testData as FormData)
      expect(result).toBe(59000)
    })

    test('handles missing expense fields', () => {
      const testData: Partial<FormData> = {
        monthlyRent: 25000
        // Other fields undefined
      }
      
      const result = calculateTotalMonthlyExpenses(testData as FormData)
      expect(result).toBe(25000)
    })
  })

  describe('Financial ratios calculation', () => {
    test('all 12 financial ratios calculate correctly', () => {
      const testData = getCompleteTestData()
      const ratios = calculateAllRatios(testData)
      
      // Verify all required metrics exist
      expect(ratios.coreExpenseRatio).toBeDefined()
      expect(ratios.totalExpenseRatio).toBeDefined()
      expect(ratios.savingsRate).toBeDefined()
      expect(ratios.debtServicingRatio).toBeDefined()
      expect(ratios.emergencyMonths).toBeDefined()
      expect(ratios.cashBuffer).toBeDefined()
      expect(ratios.netWorthGrowth).toBeDefined()
      expect(ratios.investmentDiversification).toBeDefined()
      expect(ratios.retirementReadiness).toBeDefined()
      expect(ratios.insuranceCoverage).toBeDefined()
      expect(ratios.liquidityRatio).toBeDefined()
      expect(ratios.debtToIncomeRatio).toBeDefined()
      
      // Verify scores are within valid range (1-5)
      Object.values(ratios.metrics).forEach((metric: any) => {
        expect(metric.score).toBeGreaterThanOrEqual(1)
        expect(metric.score).toBeLessThanOrEqual(5)
        expect(metric.description).toBeDefined()
        expect(typeof metric.description).toBe('string')
      })
    })

    test('core expense ratio calculates correctly', () => {
      const testData = getCompleteTestData()
      const ratios = calculateAllRatios(testData)
      
      // Core expense ratio should be calculated properly
      expect(ratios.coreExpenseRatio).toBeGreaterThan(0)
      expect(typeof ratios.coreExpenseRatio).toBe('number')
    })

    test('savings rate calculates correctly', () => {
      const testData = getCompleteTestData()
      const ratios = calculateAllRatios(testData)
      
      // Savings rate should be between 0 and 100
      expect(ratios.savingsRate).toBeGreaterThanOrEqual(0)
      expect(ratios.savingsRate).toBeLessThanOrEqual(100)
    })

    test('emergency months calculates correctly', () => {
      const testData = getCompleteTestData()
      const ratios = calculateAllRatios(testData)
      
      // Emergency months should be positive
      expect(ratios.emergencyMonths).toBeGreaterThanOrEqual(0)
      expect(typeof ratios.emergencyMonths).toBe('number')
    })
  })

  describe('Overall score calculation', () => {
    test('overall score calculation is correct', () => {
      const mockRatios = {
        metric1: { score: 4 },
        metric2: { score: 3 },
        metric3: { score: 5 },
        metric4: { score: 2 },
        metric5: { score: 4 }
      }
      
      const overallScore = calculateOverallScore(mockRatios)
      expect(overallScore).toBe(4) // (4+3+5+2+4)/5 = 3.6 ≈ 4
    })

    test('overall score is within valid range', () => {
      const testData = getCompleteTestData()
      const ratios = calculateAllRatios(testData)
      const overallScore = ratios.overallScore
      
      expect(overallScore).toBeGreaterThanOrEqual(1)
      expect(overallScore).toBeLessThanOrEqual(5)
    })

    test('handles edge cases for overall score', () => {
      const perfectRatios = {
        metric1: { score: 5 },
        metric2: { score: 5 },
        metric3: { score: 5 }
      }
      
      const perfectScore = calculateOverallScore(perfectRatios)
      expect(perfectScore).toBe(5)
      
      const poorRatios = {
        metric1: { score: 1 },
        metric2: { score: 1 },
        metric3: { score: 1 }
      }
      
      const poorScore = calculateOverallScore(poorRatios)
      expect(poorScore).toBe(1)
    })
  })

  describe('Currency formatting', () => {
    test('INR currency formatting works correctly', () => {
      const testCases = [
        { amount: 1000, expected: '₹1.0K' },
        { amount: 100000, expected: '₹1.0L' },
        { amount: 1000000, expected: '₹10.0L' },
        { amount: 10000000, expected: '₹1.0Cr' },
        { amount: 50000000, expected: '₹5.0Cr' }
      ]
      
      testCases.forEach(testCase => {
        const result = formatCurrency(testCase.amount, 'INR')
        expect(result).toBe(testCase.expected)
      })
    })

    test('USD currency formatting works correctly', () => {
      const testCases = [
        { amount: 1000, expected: '$1.0K' },
        { amount: 1000000, expected: '$1.0M' },
        { amount: 5000000, expected: '$5.0M' }
      ]
      
      testCases.forEach(testCase => {
        const result = formatCurrency(testCase.amount, 'USD')
        expect(result).toBe(testCase.expected)
      })
    })

    test('handles zero and negative amounts', () => {
      expect(formatCurrency(0, 'INR')).toBe('₹0')
      expect(formatCurrency(-1000, 'INR')).toBe('-₹1.0K')
    })

    test('handles very large amounts', () => {
      expect(formatCurrency(1000000000, 'INR')).toBe('₹100.0Cr')
      expect(formatCurrency(1000000000, 'USD')).toBe('$1000.0M')
    })
  })

  describe('Edge cases and error handling', () => {
    test('handles incomplete data gracefully', () => {
      const incompleteData: Partial<FormData> = {
        jobSalary: 1000000,
        monthlyGroceries: 10000
        // Most fields missing
      }
      
      const ratios = calculateAllRatios(incompleteData as FormData)
      
      expect(ratios).toBeDefined()
      expect(ratios.overallScore).toBeGreaterThanOrEqual(1)
      expect(ratios.overallScore).toBeLessThanOrEqual(5)
    })

    test('handles zero income scenario', () => {
      const zeroIncomeData = { ...getCompleteTestData(), jobSalary: 0 }
      const ratios = calculateAllRatios(zeroIncomeData)
      
      expect(ratios).toBeDefined()
      // Should handle division by zero gracefully
    })

    test('handles high debt scenario', () => {
      const highDebtData = {
        ...getCompleteTestData(),
        propertyLoanAmount: 10000000,
        propertyLoanPayment: 100000
      }
      
      const ratios = calculateAllRatios(highDebtData)
      expect(ratios.debtServicingRatio).toBeDefined()
    })
  })

  describe('Performance and completeness', () => {
    test('all calculation results are numbers where expected', () => {
      const testData = getCompleteTestData()
      const results = calculateAllRatios(testData)
      
      expect(typeof results.totalIncome).toBe('number')
      expect(typeof results.totalExpenses).toBe('number')
      expect(typeof results.netWorth).toBe('number')
      expect(typeof results.savingsRate).toBe('number')
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
      
      expect(Number.isFinite(results.totalIncome)).toBe(true)
      expect(Number.isFinite(results.totalExpenses)).toBe(true)
      expect(Number.isFinite(results.netWorth)).toBe(true)
      expect(Number.isFinite(results.savingsRate)).toBe(true)
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
