import { QuestionGroup } from '../types/assessment';
import { QUESTION_DEFINITIONS } from './questions';

export const QUESTION_GROUPS: QuestionGroup[] = [
  // GROUP 1: PERSONAL BASICS
  {
    id: 'personal-basics',
    name: 'Personal Basics',
    description: 'Basic personal information',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['fullName', 'dateOfBirth', 'gender', 'maritalStatus', 'country', 'state', 'city', 'citizenship', 'residencyStatus', 'occupationType'].includes(q.id)
    )
  },

  // GROUP 2: EMPLOYMENT & EDUCATION
  {
    id: 'employment-education',
    name: 'Employment & Education',
    description: 'Employment and education information',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['industry', 'employmentType', 'yearsInJob', 'educationLevel'].includes(q.id)
    )
  },

  // GROUP 3: SCREENING QUESTIONS
  {
    id: 'screening-questions',
    name: 'Screening Questions',
    description: 'Quick screening to determine applicable sections',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['hasChildren', 'hasVehicles', 'hasAdditionalProperties', 'hasPersonalLoans', 'hasFinancialDependents', 'hasHomeLoan'].includes(q.id)
    )
  },

  // GROUP 4: HOUSING
  {
    id: 'housing',
    name: 'Housing',
    description: 'Housing and accommodation expenses',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['homeOwnershipStatus', 'monthlyRent', 'homeLoanEMI', 'homeLoanOutstanding', 'homeInsurance', 'propertyTax', 'utilityBills', 'homeMaintenanceCost', 'residenceType'].includes(q.id)
    )
  },

  // GROUP 5: INCOME & ASSETS
  {
    id: 'income-assets',
    name: 'Income & Assets',
    description: 'Income sources and asset information',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['monthlySalary', 'spouseMonthlyIncome', 'sideIncome', 'rentalIncomeTotal', 'investmentIncome', 'totalCashSavings', 'totalInvestments', 'totalGold', 'cryptoHoldings'].includes(q.id)
    )
  },

  // GROUP 6: ADDITIONAL PROPERTIES
  {
    id: 'additional-properties',
    name: 'Additional Properties',
    description: 'Information about additional properties owned',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasAdditionalProperties',
      values: ['Yes']
    },
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['numPropertiesOwned', 'propertyLocations', 'propertyValues', 'propertyLoans', 'rentalIncome', 'maintenanceCosts', 'propertyInsurance'].includes(q.id)
    )
  },

  // GROUP 7: VEHICLES
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Vehicle ownership and related expenses',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasVehicles',
      values: ['Yes']
    },
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['numVehicles', 'vehicleType', 'vehicleLoan', 'vehicleEMI', 'vehicleInsurance', 'fuelCosts', 'maintenanceCostsVehicle'].includes(q.id)
    )
  },

  // GROUP 8: CHILDREN
  {
    id: 'children',
    name: 'Children',
    description: 'Information about children and their expenses',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasChildren',
      values: ['Yes']
    },
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['numberOfChildren', 'child1AgeGroup', 'child1Diapers', 'child1Clothing', 'child1Toys', 'child1Activities', 'child1Education', 'child1Medical', 'child1HealthInsurance', 'skip70'].includes(q.id)
    )
  },

  // GROUP 9: FINANCIAL DEPENDENTS
  {
    id: 'financial-dependents',
    name: 'Financial Dependents',
    description: 'Information about other financial dependents',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasFinancialDependents',
      values: ['Yes']
    },
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['numberOfDependents', 'dependent1Health', 'dependent1Living', 'dependent1Travel', 'dependent1Entertainment', 'dependent1Miscellaneous', 'dependent1HasInsurance', 'dependent1InsuranceValue', 'dependent1InsurancePremium', 'skip80'].includes(q.id)
    )
  },

  // GROUP 10: PERSONAL LOANS
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    description: 'Information about personal loans',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasPersonalLoans',
      values: ['Yes']
    },
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['numberOfPersonalLoans', 'loan1Reason', 'loan1OriginalAmount', 'loan1OutstandingBalance', 'loan1InterestRate', 'loan1PayoffMonths', 'loan1MonthlyPayment', 'skip88', 'skip89', 'skip90'].includes(q.id)
    )
  },

  // GROUP 11: INSURANCE
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Insurance coverage information',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['hasHealthInsurance', 'healthInsuranceCover', 'healthInsurancePremium', 'hasAccidentInsurance', 'accidentInsuranceCover', 'accidentInsurancePremium', 'hasLifeInsurance', 'lifeInsuranceCover', 'lifeInsurancePremium', 'skip100'].includes(q.id)
    )
  },

  // GROUP 12: MONTHLY EXPENSES - FOOD & DINING
  {
    id: 'monthly-expenses-food',
    name: 'Monthly Expenses - Food & Dining',
    description: 'Food and dining expenses',
    questionsPerPage: 10,
    questions: []
  },

  // GROUP 13: MONTHLY EXPENSES - TRANSPORTATION
  {
    id: 'monthly-expenses-transport',
    name: 'Monthly Expenses - Transportation',
    description: 'Transportation and travel expenses',
    questionsPerPage: 10,
    questions: []
  },

  // GROUP 14: MONTHLY EXPENSES - ENTERTAINMENT & LIFESTYLE
  {
    id: 'monthly-expenses-entertainment',
    name: 'Monthly Expenses - Entertainment & Lifestyle',
    description: 'Entertainment and lifestyle expenses',
    questionsPerPage: 10,
    questions: []
  },

  // GROUP 15: MONTHLY EXPENSES - HEALTHCARE & WELLNESS
  {
    id: 'monthly-expenses-healthcare',
    name: 'Monthly Expenses - Healthcare & Wellness',
    description: 'Healthcare and wellness expenses',
    questionsPerPage: 10,
    questions: []
  },

  // GROUP 16: FINANCIAL GOALS & PLANNING
  {
    id: 'financial-goals',
    name: 'Financial Goals & Planning',
    description: 'Financial goals and future planning',
    questionsPerPage: 10,
    questions: []
  }
];

// Legacy export for compatibility
export const questionGroups = QUESTION_GROUPS;