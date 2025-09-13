import { FormData, Question } from '@/types/assessment'
import { getVisibleQuestions, getVisibleGroups, getTotalPages } from '@/utils/groupLogic'
import { calculateFinancialHealth } from '@/utils/calculations'

export const generateQuestionsForScenario = (formData: FormData): Question[] => {
  return getVisibleQuestions(formData)
}

export const generateGroupsForScenario = (formData: FormData) => {
  return getVisibleGroups(formData)
}

export const calculateTotalPagesForScenario = (formData: FormData) => {
  return getTotalPages(formData)
}

export const validateAllRequiredFields = (formData: FormData): boolean => {
  const requiredFields = [
    'dateOfBirth',
    'gender', 
    'relationshipStatus',
    'workSituation',
    'country',
    'city',
    'currency',
    'firstName',
    'housingType'
  ]
  
  return requiredFields.every(field => formData[field])
}

export const validateDateOfBirth = (dateString: string): boolean => {
  const date = new Date(dateString)
  const minDate = new Date('1920-01-01')
  const maxDate = new Date()
  
  return date >= minDate && date <= maxDate
}

export const validateIncome = (amount: number): boolean => {
  return amount >= 0
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateOptional = (value: string): boolean => {
  return true // Optional fields can be empty
}

export const validateFirstName = (name: string): boolean => {
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name)
}

export const calculateTotalIncome = (formData: FormData): number => {
  return (formData.jobSalary || 0) +
         (formData.secondJobIncome || 0) +
         (formData.freelanceIncome || 0) +
         (formData.businessIncome || 0) +
         (formData.realEstateIncome || 0) +
         (formData.hobbyIncome || 0) +
         (formData.dividends || 0) +
         (formData.familyStipend || 0) +
         (formData.otherIncome || 0)
}

export const calculateTotalMonthlyExpenses = (formData: FormData): number => {
  const monthlyFields = [
    'monthlyRent', 'monthlyGroceriesToiletries', 'monthlyClothesShoes', 'monthlyMakeupBeauty',
    'monthlyHousehelpCleaningService', 'monthlyCookingGas', 'monthlyElectricity',
    'monthlyMobile', 'monthlyInternet', 'monthlyTV', 'monthlyAppSubscriptions',
    'monthlyCommute', 'monthlyPets', 'monthlyEntertainment', 'monthlyHobbies',
    'monthlyDiningOut', 'monthlyAlcohol', 'monthlyCigarettes', 'monthlyMedication',
    'monthlyHealthExams'
  ]
  
  return monthlyFields.reduce((total, field) => {
    return total + (formData[field] || 0)
  }, 0)
}

export const calculateAllRatios = (formData: FormData) => {
  return calculateFinancialHealth(formData)
}

export const calculateOverallScore = (ratios: any): number => {
  const scores = Object.values(ratios).filter(ratio => 
    typeof ratio === 'object' && ratio !== null && 'score' in ratio
  ).map((ratio: any) => ratio.score)
  
  const totalScore = scores.reduce((sum: number, score: number) => sum + score, 0)
  return Math.round(totalScore / scores.length)
}

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0]
}

export const getCompleteTestData = (): FormData => {
  return {
    // Personal basics
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    relationshipStatus: 'Married',
    partnerAge: '31-35',
    workSituation: 'Full-time employed',
    industry: 'Technology',
    jobFunction: 'Engineering/Technical',
    smoker: 'No',
    retirementAge: 60,
    country: 'India',
    city: 'Mumbai',
    currency: 'INR (Indian Rupees)',
    firstName: 'Test',
    
    // Housing
    housingType: 'Own it',
    propertyPurchasePrice: 5000000,
    propertyCurrentValue: 6000000,
    propertyLoan: 'Yes',
    propertyLoanAmount: 2000000,
    propertyLoanPayment: 30000,
    propertyMaintenanceCost: 50000,
    additionalProperties: 'No',
    
    ownVehicles: 'Yes',
    numberOfVehicles: '1',
    vehicle1PurchasePrice: 800000,
    vehicle1CurrentValue: 500000,
    vehicle1Loan: 'No',
    vehicle1FuelCost: 5000,
    vehicle1InsuranceCost: 30000,
    vehicle1MaintenanceCost: 15000,
    
    hasChildren: 'No',
    otherDependents: 'No',
    personalLoans: 'No',
    
    healthInsurance: 'Yes',
    healthInsuranceCover: 500000,
    healthInsurancePremium: 15000,
    accidentInsurance: 'No',
    lifeInsurance: 'Yes',
    lifeInsuranceCover: 2000000,
    lifeInsurancePremium: 25000,
    otherInsurance: 'No',
    
    // Monthly expenses
    monthlyGroceriesToiletries: 10000,
    monthlyClothesShoes: 2000,
    monthlyMakeupBeauty: 1500,
    monthlyHousehelpCleaningService: 5000,
    monthlyCookingGas: 1000,
    monthlyElectricity: 3500,
    monthlyMobile: 800,
    monthlyInternet: 1200,
    monthlyTV: 600,
    monthlyAppSubscriptions: 1500,
    monthlyCommute: 4000,
    monthlyPets: 0,
    monthlyEntertainment: 3000,
    monthlyHobbies: 2000,
    monthlyDiningOut: 6000,
    monthlyAlcohol: 1500,
    monthlyCigarettes: 0,
    monthlyMedication: 1000,
    monthlyHealthExams: 2500,
    
    // Annual expenses
    annualEducation: 50000,
    annualHomeDecorRenovation: 75000,
    annualGadgets: 50000,
    annualMobile: 30000,
    annualHomeTravelCost: 40000,
    annualHolidays: 150000,
    annualGifts: 40000,
    
    // Investments  
    annualRetirementSchemes: 200000,
    monthlyMutualFunds: 20000,
    monthlyTaxSaving: 8000,
    monthlySavingsDeposits: 15000,
    
    // Assets
    savingsAccountsFD: 1000000,
    physicalCash: 25000,
    investmentValue: 500000,
    retirementSavings: 200000,
    jewelleryValue: 150000,
    collectiblesValue: 50000,
    homeCurrentValue: 6000000,
    vehicleCurrentValue: 500000,
    
    // Income
    jobSalary: 2000000,
    secondJobIncome: 0,
    freelanceIncome: 0,
    businessIncome: 0,
    realEstateIncome: 0,
    hobbyIncome: 0,
    dividends: 15000,
    familyStipend: 0,
    otherIncome: 0
  }
}