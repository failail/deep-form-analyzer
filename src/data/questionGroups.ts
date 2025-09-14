import { QuestionGroup } from '../types/assessment';

export const questionGroups: QuestionGroup[] = [
  // GROUP 7: CHILDREN
  {
    id: 'children',
    name: 'Children',
    description: 'Information about children and their expenses',
    questionsPerPage: 10,
    condition: {
      dependsOn: 'hasChildren',
      values: ['Yes']
    },
    questions: [
      'numberOfChildren',
      'child1AgeGroup', 
      'child1Diapers',
      'child1Clothing',
      'child1Toys',
      'child1Activities',
      'child1Education',
      'child1Medical',
      'child1HealthInsurance',
      'skip70'
    ]
  },

  // GROUP 8: FINANCIAL DEPENDENTS
  {
    id: 'financial-dependents',
    name: 'Financial Dependents',
    description: 'Information about other financial dependents',
    questionsPerPage: 10,
    condition: {
      dependsOn: 'hasFinancialDependents',
      values: ['Yes']
    },
    questions: [
      'numberOfDependents',
      'dependent1Health',
      'dependent1Living',
      'dependent1Travel',
      'dependent1Entertainment',
      'dependent1Miscellaneous',
      'dependent1HasInsurance',
      'dependent1InsuranceValue',
      'dependent1InsurancePremium',
      'skip80'
    ]
  },

  // GROUP 9: PERSONAL LOANS
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    description: 'Information about personal loans',
    questionsPerPage: 10,
    condition: {
      dependsOn: 'hasPersonalLoans',
      values: ['Yes']
    },
    questions: [
      'numberOfPersonalLoans',
      'loan1Reason',
      'loan1OriginalAmount',
      'loan1OutstandingBalance',
      'loan1InterestRate',
      'loan1PayoffMonths',
      'loan1MonthlyPayment',
      'skip88',
      'skip89',
      'skip90'
    ]
  },

  // GROUP 10: INSURANCE
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Insurance coverage information',
    questionsPerPage: 10,
    questions: [
      'hasHealthInsurance',
      'healthInsuranceCover',
      'healthInsurancePremium',
      'hasAccidentInsurance',
      'accidentInsuranceCover',
      'accidentInsurancePremium',
      'hasLifeInsurance',
      'lifeInsuranceCover',
      'lifeInsurancePremium',
      'skip100'
    ]
  }
];