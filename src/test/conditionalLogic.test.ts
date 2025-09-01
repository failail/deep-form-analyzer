import { describe, test, expect } from 'vitest'
import { generateQuestionsForScenario, generateGroupsForScenario } from './utils/testHelpers'
import { FormData } from '@/types/assessment'

describe('Conditional Logic', () => {
  test('Single user skips partner age question', () => {
    const singleUserData: Partial<FormData> = {
      relationshipStatus: 'Single',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      hasChildren: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(singleUserData as FormData)
    const partnerAgeQuestion = questions.find(q => q.id === 'partnerAge')
    expect(partnerAgeQuestion).toBeUndefined()
  })

  test('Married user includes partner age question', () => {
    const marriedUserData: Partial<FormData> = {
      relationshipStatus: 'Married',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      hasChildren: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(marriedUserData as FormData)
    const partnerAgeQuestion = questions.find(q => q.id === 'partnerAge')
    expect(partnerAgeQuestion).toBeDefined()
  })

  test('Renter skips ownership questions', () => {
    const renterData: Partial<FormData> = {
      relationshipStatus: 'Single',
      housingType: 'Rent it',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      hasChildren: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(renterData as FormData)
    const ownershipQuestions = questions.filter(q => 
      q.id.includes('propertyPurchasePrice') || 
      q.id.includes('propertyLoan') ||
      q.id.includes('propertyLoanAmount')
    )
    expect(ownershipQuestions.length).toBe(0)
  })

  test('Owner includes ownership questions', () => {
    const ownerData: Partial<FormData> = {
      relationshipStatus: 'Single',
      housingType: 'Own it',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      propertyPurchasePrice: 5000000,
      propertyCurrentValue: 6000000,
      propertyLoan: 'Yes',
      propertyLoanAmount: 2000000,
      propertyMaintenanceCost: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      hasChildren: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(ownerData as FormData)
    const ownershipQuestions = questions.filter(q => 
      q.id.includes('propertyPurchasePrice') || 
      q.id.includes('propertyLoan')
    )
    expect(ownershipQuestions.length).toBeGreaterThan(0)
  })

  test('No vehicles skips entire vehicle group', () => {
    const noVehiclesData: Partial<FormData> = {
      relationshipStatus: 'Single',
      ownVehicles: 'No',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      hasChildren: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const groups = generateGroupsForScenario(noVehiclesData as FormData)
    const vehicleGroup = groups.find(g => g.name === 'Vehicles')
    expect(vehicleGroup).toBeUndefined()
    
    const questions = generateQuestionsForScenario(noVehiclesData as FormData)
    const vehicleQuestions = questions.filter(q => q.id.startsWith('vehicle'))
    expect(vehicleQuestions.length).toBe(0)
  })

  test('Multiple children creates questions for each child', () => {
    const multipleChildrenData: Partial<FormData> = {
      relationshipStatus: 'Married',
      hasChildren: 'Yes',
      numberOfChildren: 3,
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(multipleChildrenData as FormData)
    const child1Questions = questions.filter(q => q.id.includes('child1'))
    const child2Questions = questions.filter(q => q.id.includes('child2'))
    const child3Questions = questions.filter(q => q.id.includes('child3'))
    
    expect(child1Questions.length).toBeGreaterThan(5)
    expect(child2Questions.length).toBeGreaterThan(5)
    expect(child3Questions.length).toBeGreaterThan(5)
  })

  test('No children skips entire children group', () => {
    const noChildrenData: Partial<FormData> = {
      relationshipStatus: 'Single',
      hasChildren: 'No',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const groups = generateGroupsForScenario(noChildrenData as FormData)
    const childrenGroup = groups.find(g => g.name === 'Children')
    expect(childrenGroup).toBeUndefined()
  })

  test('Multiple dependents creates questions for each dependent', () => {
    const multipleDependentsData: Partial<FormData> = {
      relationshipStatus: 'Single',
      otherDependents: 'Yes',
      numberOfDependents: 2,
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      workSituation: 'Full-time employed',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      hasChildren: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(multipleDependentsData as FormData)
    const dependent1Questions = questions.filter(q => q.id.includes('dependent1'))
    const dependent2Questions = questions.filter(q => q.id.includes('dependent2'))
    
    expect(dependent1Questions.length).toBeGreaterThan(5)
    expect(dependent2Questions.length).toBeGreaterThan(5)
  })

  test('Retired user skips industry and job function questions', () => {
    const retiredUserData: Partial<FormData> = {
      relationshipStatus: 'Single',
      workSituation: 'Retired',
      retirementDate: '2020-01-01',
      dateOfBirth: '1960-01-01',
      gender: 'Male',
      country: 'India',
      city: 'Mumbai',
      currency: 'INR (Indian Rupees)',
      firstName: 'John',
      housingType: 'Rent it',
      monthlyRent: 25000,
      rentalDeposit: 50000,
      additionalProperties: 'No',
      ownVehicles: 'No',
      hasChildren: 'No',
      otherDependents: 'No',
      personalLoans: 'No'
    }
    
    const questions = generateQuestionsForScenario(retiredUserData as FormData)
    const industryQuestion = questions.find(q => q.id === 'industry')
    const jobFunctionQuestion = questions.find(q => q.id === 'jobFunction')
    const retirementAgeQuestion = questions.find(q => q.id === 'retirementAge')
    
    expect(industryQuestion).toBeUndefined()
    expect(jobFunctionQuestion).toBeUndefined()
    expect(retirementAgeQuestion).toBeUndefined()
  })
})