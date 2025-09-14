import { QuestionGroup } from '../types/assessment';
import { QUESTION_DEFINITIONS } from './questions';

export const questionGroups: QuestionGroup[] = [
  // GROUP 7: CHILDREN
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

  // GROUP 8: FINANCIAL DEPENDENTS
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

  // GROUP 9: PERSONAL LOANS
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

  // GROUP 10: INSURANCE
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Insurance coverage information',
    questionsPerPage: 10,
    questions: Object.values(QUESTION_DEFINITIONS).filter(q => 
      ['hasHealthInsurance', 'healthInsuranceCover', 'healthInsurancePremium', 'hasAccidentInsurance', 'accidentInsuranceCover', 'accidentInsurancePremium', 'hasLifeInsurance', 'lifeInsuranceCover', 'lifeInsurancePremium', 'skip100'].includes(q.id)
    )
  }
];