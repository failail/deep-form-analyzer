import { QuestionGroup } from '@/types/assessment';

export const QUESTION_GROUPS: QuestionGroup[] = [
  // GROUP 1: Personal Basics
  {
    id: 'personal-basics',
    name: 'Personal Basics',
    description: 'Basic personal information',
    questionsPerPage: 10,
    questions: [
      {
        id: 'fullName',
        title: "What's your full name?",
        type: 'text',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'minLength', value: 2, message: 'Minimum length is 2 characters' }
        ],
        section: 'Personal Information',
        questionNumber: 1,
        groupId: 'personal-basics'
      },
      {
        id: 'age',
        title: "What's your age?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 18, message: 'Minimum age is 18' },
          { type: 'max', value: 100, message: 'Maximum age is 100' }
        ],
        section: 'Personal Information',
        questionNumber: 2,
        groupId: 'personal-basics'
      },
      {
        id: 'dateOfBirth',
        title: "What's your date of birth?",
        type: 'date',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' }
        ],
        section: 'Personal Information',
        questionNumber: 3,
        groupId: 'personal-basics'
      },
      {
        id: 'country',
        title: 'Which country do you live in?',
        type: 'select',
        required: true,
        options: [
          { value: 'India', label: 'India' },
          { value: 'United States', label: 'United States' },
          { value: 'Canada', label: 'Canada' },
          { value: 'United Kingdom', label: 'United Kingdom' },
          { value: 'Australia', label: 'Australia' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 4,
        groupId: 'personal-basics'
      },
      {
        id: 'gender',
        title: "What's your gender?",
        type: 'radio',
        required: true,
        options: [
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
          { value: 'Prefer not to say', label: 'Prefer not to say' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 5,
        groupId: 'personal-basics'
      },
      {
        id: 'maritalStatus',
        title: "What's your marital status?",
        type: 'radio',
        required: true,
        options: [
          { value: 'Single', label: 'Single' },
          { value: 'Married', label: 'Married' },
          { value: 'Divorced', label: 'Divorced' },
          { value: 'Widowed', label: 'Widowed' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 6,
        groupId: 'personal-basics'
      },
      {
        id: 'spouseAge',
        title: "What's your spouse's age?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 18, message: 'Minimum age is 18' }
        ],
        conditional: {
          dependsOn: 'maritalStatus',
          values: ['Married']
        },
        section: 'Personal Information',
        questionNumber: 7,
        groupId: 'personal-basics'
      },
      {
        id: 'employmentStatus',
        title: "What's your employment status?",
        type: 'radio',
        required: true,
        options: [
          { value: 'Employed', label: 'Employed' },
          { value: 'Self-employed', label: 'Self-employed' },
          { value: 'Unemployed', label: 'Unemployed' },
          { value: 'Retired', label: 'Retired' },
          { value: 'Student', label: 'Student' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 8,
        groupId: 'personal-basics'
      },
      {
        id: 'industry',
        title: 'Which industry do you work in?',
        type: 'select',
        required: true,
        options: [
          { value: 'Technology', label: 'Technology' },
          { value: 'Finance', label: 'Finance' },
          { value: 'Healthcare', label: 'Healthcare' },
          { value: 'Education', label: 'Education' },
          { value: 'Manufacturing', label: 'Manufacturing' },
          { value: 'Other', label: 'Other' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        conditional: {
          dependsOn: 'employmentStatus',
          values: ['Employed', 'Self-employed']
        },
        section: 'Personal Information',
        questionNumber: 9,
        groupId: 'personal-basics'
      },
      {
        id: 'annualIncome',
        title: "What's your annual income?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Income cannot be negative' }
        ],
        section: 'Personal Information',
        questionNumber: 10,
        groupId: 'personal-basics'
      },
      {
        id: 'householdIncome',
        title: "What's your total household income?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Income cannot be negative' }
        ],
        section: 'Personal Information',
        questionNumber: 11,
        groupId: 'personal-basics'
      },
      {
        id: 'fixedExpenses',
        title: "What are your monthly fixed expenses?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Expenses cannot be negative' }
        ],
        section: 'Personal Information',
        questionNumber: 12,
        groupId: 'personal-basics'
      },
      {
        id: 'variableExpenses',
        title: "What are your monthly variable expenses?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Expenses cannot be negative' }
        ],
        section: 'Personal Information',
        questionNumber: 13,
        groupId: 'personal-basics'
      },
      {
        id: 'medicalExpenses',
        title: "What are your monthly medical expenses?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Expenses cannot be negative' }
        ],
        section: 'Personal Information',
        questionNumber: 14,
        groupId: 'personal-basics'
      }
    ]
  },

  // GROUP 2: Screening Questions
  {
    id: 'screening',
    name: 'Screening Questions',
    description: 'Gateway questions to determine applicable sections',
    questionsPerPage: 10,
    questions: [
      {
        id: 'hasChildren',
        title: 'Do you have children?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 15,
        groupId: 'screening'
      },
      {
        id: 'hasVehicles',
        title: 'Do you own any vehicles?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 16,
        groupId: 'screening'
      },
      {
        id: 'hasAdditionalProperties',
        title: 'Do you own additional properties?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 17,
        groupId: 'screening'
      },
      {
        id: 'hasFinancialDependents',
        title: 'Do you have financial dependents?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 18,
        groupId: 'screening'
      },
      {
        id: 'hasPersonalLoans',
        title: 'Do you have personal loans?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 19,
        groupId: 'screening'
      },
      {
        id: 'hasLifeInsurance',
        title: 'Do you have life insurance?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 20,
        groupId: 'screening'
      },
      {
        id: 'hasHealthInsurance',
        title: 'Do you have health insurance?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 21,
        groupId: 'screening'
      },
      {
        id: 'hasTermInsurance',
        title: 'Do you have term insurance?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Screening',
        questionNumber: 22,
        groupId: 'screening'
      }
    ]
  },

  // GROUP 3: Housing
  {
    id: 'housing',
    name: 'Housing',
    description: 'Housing and property information',
    questionsPerPage: 10,
    questions: [
      {
        id: 'currentResidenceType',
        title: 'Do you rent or own your current residence?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Rent', label: 'Rent' },
          { value: 'Own', label: 'Own' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Housing',
        questionNumber: 23,
        groupId: 'housing'
      },
      {
        id: 'rentAmount',
        title: 'What is your monthly rent?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Rent cannot be negative' }
        ],
        conditional: {
          dependsOn: 'currentResidenceType',
          values: ['Rent']
        },
        section: 'Housing',
        questionNumber: 24,
        groupId: 'housing'
      },
      {
        id: 'homeLoanEMI',
        title: 'What is your monthly home loan EMI?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'EMI cannot be negative' }
        ],
        conditional: {
          dependsOn: 'currentResidenceType',
          values: ['Own']
        },
        section: 'Housing',
        questionNumber: 25,
        groupId: 'housing'
      },
      {
        id: 'homeValue',
        title: 'What is the current value of your home?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Value cannot be negative' }
        ],
        conditional: {
          dependsOn: 'currentResidenceType',
          values: ['Own']
        },
        section: 'Housing',
        questionNumber: 26,
        groupId: 'housing'
      },
      {
        id: 'homeOwnership',
        title: 'What percentage of the home do you own?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Percentage cannot be negative' },
          { type: 'max', value: 100, message: 'Percentage cannot exceed 100' }
        ],
        conditional: {
          dependsOn: 'currentResidenceType',
          values: ['Own']
        },
        section: 'Housing',
        questionNumber: 27,
        groupId: 'housing'
      }
    ]
  },

  // GROUP 4: Additional Properties
  {
    id: 'additional-properties',
    name: 'Additional Properties',
    description: 'Information about additional properties you own',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasAdditionalProperties',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numAdditionalProperties',
        title: 'How many additional properties do you own?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Must be at least 1' }
        ],
        section: 'Additional Properties',
        questionNumber: 28,
        groupId: 'additional-properties'
      },
      {
        id: 'propertyLoanEMI',
        title: 'What is your total monthly EMI for property loans?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'EMI cannot be negative' }
        ],
        section: 'Additional Properties',
        questionNumber: 29,
        groupId: 'additional-properties'
      },
      {
        id: 'totalPropertyValue',
        title: 'What is the total value of your additional properties?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Value cannot be negative' }
        ],
        section: 'Additional Properties',
        questionNumber: 30,
        groupId: 'additional-properties'
      },
      {
        id: 'rentalIncome',
        title: 'What is your monthly rental income from these properties?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Income cannot be negative' }
        ],
        section: 'Additional Properties',
        questionNumber: 31,
        groupId: 'additional-properties'
      }
    ]
  },

  // GROUP 5: Vehicles
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Information about your vehicles',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasVehicles',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numVehicles',
        title: 'How many vehicles do you own?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Must be at least 1' }
        ],
        section: 'Vehicles',
        questionNumber: 32,
        groupId: 'vehicles'
      },
      {
        id: 'vehicleLoanEMI',
        title: 'What is your total monthly vehicle loan EMI?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'EMI cannot be negative' }
        ],
        section: 'Vehicles',
        questionNumber: 33,
        groupId: 'vehicles'
      },
      {
        id: 'vehicleInsurancePremium',
        title: 'What is your annual vehicle insurance premium?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Premium cannot be negative' }
        ],
        section: 'Vehicles',
        questionNumber: 34,
        groupId: 'vehicles'
      },
      {
        id: 'vehicleValue',
        title: 'What is the total current value of your vehicles?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Value cannot be negative' }
        ],
        section: 'Vehicles',
        questionNumber: 35,
        groupId: 'vehicles'
      }
    ]
  },

  // GROUP 6: Children
  {
    id: 'children',
    name: 'Children',
    description: 'Information about your children',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasChildren',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numChildren',
        title: 'How many children do you have?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Must be at least 1' }
        ],
        section: 'Children',
        questionNumber: 36,
        groupId: 'children'
      },
      {
        id: 'avgMonthlyChildExpenses',
        title: 'What are your average monthly expenses per child?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Expenses cannot be negative' }
        ],
        section: 'Children',
        questionNumber: 37,
        groupId: 'children'
      },
      {
        id: 'avgAnnualEducationCosts',
        title: 'What are your average annual education costs per child?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Costs cannot be negative' }
        ],
        section: 'Children',
        questionNumber: 38,
        groupId: 'children'
      },
      {
        id: 'childFutureSavingsGoal',
        title: "What is your savings goal for each child's future (education/marriage)?",
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Goal cannot be negative' }
        ],
        section: 'Children',
        questionNumber: 39,
        groupId: 'children'
      },
      {
        id: 'childFutureGoalTimeframe',
        title: 'In how many years do you need to achieve this goal per child?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Must be at least 1 year' }
        ],
        section: 'Children',
        questionNumber: 40,
        groupId: 'children'
      }
    ]
  },

  // GROUP 7: Financial Dependents
  {
    id: 'financial-dependents',
    name: 'Financial Dependents',
    description: 'Information about your financial dependents',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasFinancialDependents',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numFinancialDependents',
        title: 'How many financial dependents do you have?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Must be at least 1' }
        ],
        section: 'Financial Dependents',
        questionNumber: 41,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependentExpenses',
        title: 'What are your monthly expenses for dependents?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Expenses cannot be negative' }
        ],
        section: 'Financial Dependents',
        questionNumber: 42,
        groupId: 'financial-dependents'
      },
      {
        id: 'durationOfSupport',
        title: 'For how many more years will you need to support them?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Must be at least 1 year' }
        ],
        section: 'Financial Dependents',
        questionNumber: 43,
        groupId: 'financial-dependents'
      }
    ]
  },

  // GROUP 8: Personal Loans
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    description: 'Information about your personal loans',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasPersonalLoans',
      values: ['Yes']
    },
    questions: [
      {
        id: 'totalPersonalLoanAmount',
        title: 'What is your total outstanding personal loan amount?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Amount cannot be negative' }
        ],
        section: 'Personal Loans',
        questionNumber: 44,
        groupId: 'personal-loans'
      },
      {
        id: 'personalLoanEMI',
        title: 'What is your total monthly personal loan EMI?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'EMI cannot be negative' }
        ],
        section: 'Personal Loans',
        questionNumber: 45,
        groupId: 'personal-loans'
      },
      {
        id: 'remainingLoanDuration',
        title: 'What is the remaining duration of your loans (in years)?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Duration cannot be negative' }
        ],
        section: 'Personal Loans',
        questionNumber: 46,
        groupId: 'personal-loans'
      }
    ]
  },

  // GROUP 9: Insurance
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Information about your insurance coverage',
    questionsPerPage: 10,
    questions: [
      {
        id: 'lifeInsuranceCover',
        title: 'What is your life insurance coverage amount?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Coverage cannot be negative' }
        ],
        conditional: {
          dependsOn: 'hasLifeInsurance',
          values: ['Yes']
        },
        section: 'Insurance',
        questionNumber: 47,
        groupId: 'insurance'
      },
      {
        id: 'healthInsuranceCover',
        title: 'What is your health insurance coverage amount?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Coverage cannot be negative' }
        ],
        conditional: {
          dependsOn: 'hasHealthInsurance',
          values: ['Yes']
        },
        section: 'Insurance',
        questionNumber: 48,
        groupId: 'insurance'
      },
      {
        id: 'termInsuranceCover',
        title: 'What is your term insurance coverage amount?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Coverage cannot be negative' }
        ],
        conditional: {
          dependsOn: 'hasTermInsurance',
          values: ['Yes']
        },
        section: 'Insurance',
        questionNumber: 49,
        groupId: 'insurance'
      },
      {
        id: 'employerInsuranceIncluded',
        title: 'Do you have insurance coverage through your employer?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Insurance',
        questionNumber: 50,
        groupId: 'insurance'
      },
      {
        id: 'insurancePremiums',
        title: 'What are your total annual insurance premiums?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Premiums cannot be negative' }
        ],
        section: 'Insurance',
        questionNumber: 51,
        groupId: 'insurance'
      }
    ]
  }
];

// Flattened questions for backwards compatibility
export const QUESTIONS = QUESTION_GROUPS.flatMap(group => group.questions);