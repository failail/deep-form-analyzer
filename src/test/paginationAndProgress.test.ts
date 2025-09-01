import { describe, test, expect } from 'vitest'
import { minimalUserData, maximumUserData, typicalUserData } from './testData'
import { 
  generateQuestionsForScenario,
  calculateTotalPagesForScenario
} from './utils/testHelpers'
import { getQuestionsForPage, getProgressInfo } from '@/utils/groupLogic'

describe('Pagination Logic', () => {
  test('Each page shows exactly 10 questions or less for last page', () => {
    const scenarios = [minimalUserData, typicalUserData, maximumUserData]
    
    scenarios.forEach(scenario => {
      const totalPages = calculateTotalPagesForScenario(scenario)
      
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const pageQuestions = getQuestionsForPage(scenario, pageIndex)
        
        if (pageIndex === totalPages - 1) {
          expect(pageQuestions.length).toBeGreaterThan(0)
          expect(pageQuestions.length).toBeLessThanOrEqual(10)
        } else {
          expect(pageQuestions.length).toBe(10)
        }
      }
    })
  })

  test('Progress calculation is accurate', () => {
    const scenario = typicalUserData
    const totalPages = calculateTotalPagesForScenario(scenario)
    
    for (let currentPage = 0; currentPage < totalPages; currentPage++) {
      const progressInfo = getProgressInfo(scenario, currentPage)
      
      expect(progressInfo.progress).toBeGreaterThanOrEqual(0)
      expect(progressInfo.progress).toBeLessThanOrEqual(100)
      expect(progressInfo.startQuestionNumber).toBeGreaterThan(0)
      expect(progressInfo.endQuestionNumber).toBeGreaterThanOrEqual(progressInfo.startQuestionNumber)
    }
  })

  test('Skip entire groups when conditions not met', () => {
    const noVehiclesData = { ...minimalUserData, ownVehicles: 'No' }
    const questions = generateQuestionsForScenario(noVehiclesData)
    const vehicleQuestions = questions.filter(q => q.id.startsWith('vehicle'))
    expect(vehicleQuestions.length).toBe(0)
  })
})