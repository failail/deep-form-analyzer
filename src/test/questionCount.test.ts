import { describe, test, expect } from 'vitest'
import { minimalUserData, maximumUserData, typicalUserData } from './testData'
import { 
  generateQuestionsForScenario, 
  generateGroupsForScenario,
  calculateTotalPagesForScenario
} from './utils/testHelpers'

describe('Question Count Verification', () => {
  test('Minimal user path shows expected number of questions', () => {
    const questions = generateQuestionsForScenario(minimalUserData)
    const groups = generateGroupsForScenario(minimalUserData)
    
    // Minimal user should have: Groups 1, 2, 8, 9, 10, 11, 12, 13, 14
    const expectedGroupNames = [
      'Personal Basics',
      'Housing', 
      'Insurance',
      'Monthly Expenses 1',
      'Monthly Expenses 2', 
      'Annual Expenses',
      'Investments',
      'Assets',
      'Income'
    ]
    
    const actualGroupNames = groups.map(g => g.name)
    expectedGroupNames.forEach(groupName => {
      expect(actualGroupNames).toContain(groupName)
    })
    
    // Should be around 90 questions (9 groups * 10 questions per group)
    expect(questions.length).toBeGreaterThanOrEqual(85)
    expect(questions.length).toBeLessThanOrEqual(95)
  })

  test('Maximum user path shows 250+ questions', () => {
    const questions = generateQuestionsForScenario(maximumUserData)
    const groups = generateGroupsForScenario(maximumUserData)
    
    // Maximum user should have all 14 groups
    expect(groups.length).toBeGreaterThanOrEqual(14)
    
    // Should have 250+ questions due to all conditional expansions
    expect(questions.length).toBeGreaterThan(250)
  })

  test('Typical user path shows moderate question count', () => {
    const questions = generateQuestionsForScenario(typicalUserData)
    const groups = generateGroupsForScenario(typicalUserData)
    
    // Typical user should have most groups (around 12-13)
    expect(groups.length).toBeGreaterThanOrEqual(12)
    expect(groups.length).toBeLessThanOrEqual(14)
    
    // Should be around 140 questions
    expect(questions.length).toBeGreaterThan(130)
    expect(questions.length).toBeLessThan(160)
  })

  test('Page calculation works correctly for all scenarios', () => {
    const scenarios = [minimalUserData, typicalUserData, maximumUserData]
    
    scenarios.forEach(scenario => {
      const questions = generateQuestionsForScenario(scenario)
      const pages = calculateTotalPagesForScenario(scenario)
      const expectedPages = Math.ceil(questions.length / 10)
      
      expect(pages).toBe(expectedPages)
    })
  })

  test('All question types are properly counted', () => {
    const questions = generateQuestionsForScenario(maximumUserData)
    
    // Verify we have various question types
    const questionTypes = [...new Set(questions.map(q => q.type))]
    expect(questionTypes).toContain('text')
    expect(questionTypes).toContain('number')
    expect(questionTypes).toContain('radio')
    expect(questionTypes).toContain('select')
    expect(questionTypes).toContain('date')
    
    // Verify no 'skip' questions are included in count
    const skipQuestions = questions.filter(q => q.type === 'skip')
    expect(skipQuestions.length).toBe(0)
  })
})