},

  // GROUP 6: CHILDREN
  {
    id: 'children',
    name: 'Children',
    description: 'Information about children and their expenses',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasChildren',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numberOfChildren',
        title: 'How many kids do you have?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Minimum value is 1' },
          { type: 'max', value: 10, message: 'Maximum value is 10' }
        ],
        section: 'Children & Dependents',
        questionNumber: 55,
        groupId: 'children'
      },
      {
        id: 'child1AgeGroup',
        title: 'Child 1: Please share the age band for this child',
        type: 'select',
        required: true,
        options: [
          { value: '0-2 years', label: '0-2 years' },
          { value: '3-5 years', label: '3-5 years' },
          { value: '6-12 years', label: '6-12 years' },
          { value: '13-18 years', label: '13-18 years' },
          { value: '19+ years dependent', label: '19+ years dependent' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Children & Dependents',
        questionNumber: 56,
        groupId: 'children'
      },
      {
        id: 'child1Diapers',
        title: 'Child 1: Monthly expenses for diapers',
        type: 'number',
        validation: [{ type: 'min', value: 0, message: 'Minimum value is 0' }],
        conditional: {
          dependsOn: 'child1AgeGroup',
          values: ['0-2 years']
        },
        section: 'Children & Dependents',
        questionNumber: 57,
        groupId: 'children'
      },
      {
        id: 'child1Clothing',
        title: 'Child 1: Monthly expenses for clothing, shoes',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 500, message: 'Minimum value is 500' }
        ],
        section: 'Children & Dependents',
        questionNumber: 58,
        groupId: 'children'
      },
      {
        id: 'child1Toys',
        title: 'Child 1: Monthly expenses for toys and games',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Children & Dependents',
        questionNumber: 59,
        groupId: 'children'
      },
      {
        id: 'child1Activities',
        title: 'Child 1: Monthly expense for hobbies, sports, activities',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Children & Dependents',
        questionNumber: 60,
        groupId: 'children'
      },
      {
        id: 'child1Education',
        title: 'Child 1: Monthly expense for school/college fees',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Children & Dependents',
        questionNumber: 61,
        groupId: 'children'
      },
      {
        id: 'child1Medical',
        title: 'Child 1: Monthly expenses for medical, treatments, medicines',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Children & Dependents',
        questionNumber: 62,
        groupId: 'children'
      },
      {
        id: 'child1HealthInsurance',
        title: 'Child 1: Do you have health insurance that covers this child?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Children & Dependents',
        questionNumber: 63,
        groupId: 'children'
      },
      { id: 'skip64', title: 'Skip', type: 'skip', section: 'Children & Dependents', questionNumber: 64, groupId: 'children' }
    ]
  },

  // GROUP 7: FINANCIAL DEPENDENTS
  {
    id: 'financial-dependents',
    name: 'Financial Dependents',
    description: 'Information about other financial dependents',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasFinancialDependents',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numberOfDependents',
        title: 'How many financial dependents do you have?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Minimum value is 1' },
          { type: 'max', value: 5, message: 'Maximum value is 5' }
        ],
        section: 'Financial Dependents',
        questionNumber: 65,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1Health',
        title: 'Dependent 1: Health related monthly expenses not covered by insurance',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Financial Dependents',
        questionNumber: 66,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1Living',
        title: 'Dependent 1: Rent, grocery, utilities expenses monthly',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 2000, message: 'Minimum value is 2,000' }
        ],
        section: 'Financial Dependents',
        questionNumber: 67,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1Travel',
        title: 'Dependent 1: Travel and commute monthly expenses',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Financial Dependents',
        questionNumber: 68,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1Entertainment',
        title: 'Dependent 1: Entertainment, leisure, hobby monthly expenses',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Financial Dependents',
        questionNumber: 69,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1Miscellaneous',
        title: 'Dependent 1: Other miscellaneous expenses monthly',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Financial Dependents',
        questionNumber: 70,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1HasInsurance',
        title: 'Dependent 1: Do you have health insurance to cover this dependent?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Financial Dependents',
        questionNumber: 71,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1InsuranceValue',
        title: 'Dependent 1: What is the value of the insurance cover?',
        type: 'number',
        validation: [{ type: 'min', value: 100000, message: 'Minimum value is 100,000' }],
        conditional: {
          dependsOn: 'dependent1HasInsurance',
          values: ['Yes']
        },
        section: 'Financial Dependents',
        questionNumber: 72,
        groupId: 'financial-dependents'
      },
      {
        id: 'dependent1InsurancePremium',
        title: 'Dependent 1: What is the annual premium?',
        type: 'number',
        validation: [{ type: 'min', value: 5000, message: 'Minimum value is 5,000' }],
        conditional: {
          dependsOn: 'dependent1HasInsurance',
          values: ['Yes']
        },
        section: 'Financial Dependents',
        questionNumber: 73,
        groupId: 'financial-dependents'
      },
      { id: 'skip74', title: 'Skip', type: 'skip', section: 'Financial Dependents', questionNumber: 74, groupId: 'financial-dependents' }
    ]
  },

  // GROUP 8: PERSONAL LOANS
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    description: 'Information about personal loans',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasPersonalLoans',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numberOfPersonalLoans',
        title: 'How many personal loans do you have?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Minimum value is 1' },
          { type: 'max', value: 5, message: 'Maximum value is 5' }
        ],
        section: 'Personal Loans',
        questionNumber: 75,
        groupId: 'personal-loans'
      },
      {
        id: 'loan1Reason',
        title: 'Loan 1: What was the reason for the loan?',
        type: 'select',
        required: true,
        options: [
          { value: 'Personal', label: 'Personal' },
          { value: 'Education', label: 'Education' },
          { value: 'Wedding', label: 'Wedding' },
          { value: 'Holiday', label: 'Holiday' },
          { value: 'Medical expenses', label: 'Medical expenses' },
          { value: 'Business', label: 'Business' },
          { value: 'Emergency', label: 'Emergency' },
          { value: 'Vehicle purchase', label: 'Vehicle purchase' },
          { value: 'Other', label: 'Other' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Loans',
        questionNumber: 76,
        groupId: 'personal-loans'
      },
      {
        id: 'loan1OriginalAmount',
        title: 'Loan 1: What is the original loan amount?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 25000, message: 'Minimum value is 25,000' }
        ],
        section: 'Personal Loans',
        questionNumber: 77,
        groupId: 'personal-loans'
      },
      {
        id: 'loan1OutstandingBalance',
        title: 'Loan 1: What is the current outstanding balance?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1000, message: 'Minimum value is 1,000' }
        ],
        section: 'Personal Loans',
        questionNumber: 78,
        groupId: 'personal-loans'
      },
      {
        id: 'loan1InterestRate',
        title: 'Loan 1: What is the interest rate on this loan?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 10, message: 'Minimum value is 10' },
          { type: 'max', value: 36, message: 'Maximum value is 36' }
        ],
        section: 'Personal Loans',
        questionNumber: 79,
        groupId: 'personal-loans'
      },
      {
        id: 'loan1PayoffMonths',
        title: 'Loan 1: How many months would you need to pay it off at current EMI?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1, message: 'Minimum value is 1' },
          { type: 'max', value: 600, message: 'Maximum value is 600' }
        ],
        section: 'Personal Loans',
        questionNumber: 80,
        groupId: 'personal-loans'
      },
      {
        id: 'loan1MonthlyPayment',
        title: 'Loan 1: What is the monthly payment towards this loan?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 1000, message: 'Minimum value is 1,000' }
        ],
        section: 'Personal Loans',
        questionNumber: 81,
        groupId: 'personal-loans'
      },
      { id: 'skip82', title: 'Skip', type: 'skip', section: 'Personal Loans', questionNumber: 82, groupId: 'personal-loans' },
      { id: 'skip83', title: 'Skip', type: 'simport { QuestionGroup } from '@/types/assessment';

export const QUESTION_GROUPS: QuestionGroup[] = [
  // GROUP 1: PERSONAL BASICS
  {
    id: 'personal-basics',
    name: 'Personal Basics',
    description: 'Basic personal information',
    questionsPerPage: 10,
    questions: [
      {
        id: 'dateOfBirth',
        title: "What's your date of birth?",
        type: 'date',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: '1920-01-01', message: 'Please enter a valid date' },
          { type: 'max', value: new Date().toISOString().split('T')[0], message: 'Please enter a valid date' }
        ],
        section: 'Personal Information',
        questionNumber: 1,
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
        questionNumber: 2,
        groupId: 'personal-basics'
      },
      {
        id: 'relationshipStatus',
        title: "What's your relationship status?",
        type: 'radio',
        required: true,
        options: [
          { value: 'Single', label: 'Single' },
          { value: 'In relationship not living together', label: 'In relationship not living together' },
          { value: 'In relationship living together', label: 'In relationship living together' },
          { value: 'Married', label: 'Married' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 3,
        groupId: 'personal-basics'
      },
      {
        id: 'partnerAge',
        title: "What's your partner's age range?",
        type: 'select',
        required: true,
        options: [
          { value: '18-25', label: '18-25' },
          { value: '26-30', label: '26-30' },
          { value: '31-35', label: '31-35' },
          { value: '36-40', label: '36-40' },
          { value: '41-45', label: '41-45' },
          { value: '46-50', label: '46-50' },
          { value: '51-55', label: '51-55' },
          { value: '56-60', label: '56-60' },
          { value: '60+', label: '60+' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        conditional: {
          dependsOn: 'relationshipStatus',
          values: ['In relationship not living together', 'In relationship living together', 'Married']
        },
        section: 'Personal Information',
        questionNumber: 4,
        groupId: 'personal-basics'
      },
      {
        id: 'workSituation',
        title: "What's your current work situation?",
        type: 'radio',
        required: true,
        options: [
          { value: 'Full-time employed', label: 'Full-time employed' },
          { value: 'Part-time employed', label: 'Part-time employed' },
          { value: 'Self-employed', label: 'Self-employed' },
          { value: 'Freelancer', label: 'Freelancer' },
          { value: 'Retired', label: 'Retired' },
          { value: 'Unemployed', label: 'Unemployed' },
          { value: 'Student', label: 'Student' },
          { value: 'Homemaker', label: 'Homemaker' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 5,
        groupId: 'personal-basics'
      },
      {
        id: 'retirementDate',
        title: 'When did you retire?',
        type: 'date',
        required: true,
        validation: [{ type: 'required', message: 'This field is required' }],
        conditional: {
          dependsOn: 'workSituation',
          values: ['Retired']
        },
        section: 'Personal Information',
        questionNumber: 6,
        groupId: 'personal-basics'
      },
      {
        id: 'industry',
        title: 'Which industry do you work in?',
        type: 'select',
        required: true,
        options: [
          { value: 'Technology', label: 'Technology' },
          { value: 'Finance & Banking', label: 'Finance & Banking' },
          { value: 'Healthcare', label: 'Healthcare' },
          { value: 'Education', label: 'Education' },
          { value: 'Manufacturing', label: 'Manufacturing' },
          { value: 'Retail', label: 'Retail' },
          { value: 'Consulting', label: 'Consulting' },
          { value: 'Real Estate', label: 'Real Estate' },
          { value: 'Media & Entertainment', label: 'Media & Entertainment' },
          { value: 'Government', label: 'Government' },
          { value: 'Non-profit', label: 'Non-profit' },
          { value: 'Agriculture', label: 'Agriculture' },
          { value: 'Energy', label: 'Energy' },
          { value: 'Transportation', label: 'Transportation' },
          { value: 'Other', label: 'Other' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        conditional: {
          dependsOn: 'workSituation',
          values: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Freelancer']
        },
        section: 'Personal Information',
        questionNumber: 7,
        groupId: 'personal-basics'
      },
      {
        id: 'jobFunction',
        title: "What's your primary job function?",
        type: 'select',
        required: true,
        options: [
          { value: 'Engineering/Technical', label: 'Engineering/Technical' },
          { value: 'Sales & Marketing', label: 'Sales & Marketing' },
          { value: 'Operations', label: 'Operations' },
          { value: 'Finance & Accounting', label: 'Finance & Accounting' },
          { value: 'Human Resources', label: 'Human Resources' },
          { value: 'Management/Leadership', label: 'Management/Leadership' },
          { value: 'Customer Service', label: 'Customer Service' },
          { value: 'Research & Development', label: 'Research & Development' },
          { value: 'Legal', label: 'Legal' },
          { value: 'Design/Creative', label: 'Design/Creative' },
          { value: 'Administrative', label: 'Administrative' },
          { value: 'Other', label: 'Other' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        conditional: {
          dependsOn: 'workSituation',
          values: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Freelancer']
        },
        section: 'Personal Information',
        questionNumber: 8,
        groupId: 'personal-basics'
      },
      {
        id: 'smoker',
        title: 'Are you a smoker?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 9,
        groupId: 'personal-basics'
      },
      {
        id: 'targetRetirementAge',
        title: 'At what age do you plan to retire?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 50, message: 'Minimum value is 50' },
          { type: 'max', value: 80, message: 'Maximum value is 80' }
        ],
        conditional: {
          dependsOn: 'workSituation',
          values: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Freelancer', 'Unemployed', 'Student', 'Homemaker']
        },
        section: 'Personal Information',
        questionNumber: 10,
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
          { value: 'United Kingdom', label: 'United Kingdom' },
          { value: 'Canada', label: 'Canada' },
          { value: 'Australia', label: 'Australia' },
          { value: 'Singapore', label: 'Singapore' },
          { value: 'UAE', label: 'UAE' },
          { value: 'Germany', label: 'Germany' },
          { value: 'Other', label: 'Other' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 11,
        groupId: 'personal-basics'
      },
      {
        id: 'city',
        title: 'Which city do you live in?',
        type: 'text',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'minLength', value: 2, message: 'Minimum length is 2 characters' }
        ],
        section: 'Personal Information',
        questionNumber: 12,
        groupId: 'personal-basics'
      },
      {
        id: 'currency',
        title: "What's your preferred currency?",
        type: 'select',
        required: true,
        options: [
          { value: 'INR', label: 'INR (Indian Rupees)' },
          { value: 'USD', label: 'USD (US Dollars)' },
          { value: 'GBP', label: 'GBP (British Pounds)' },
          { value: 'EUR', label: 'EUR (Euros)' },
          { value: 'CAD', label: 'CAD (Canadian Dollars)' },
          { value: 'AUD', label: 'AUD (Australian Dollars)' },
          { value: 'SGD', label: 'SGD (Singapore Dollars)' },
          { value: 'AED', label: 'AED (UAE Dirhams)' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 13,
        groupId: 'personal-basics'
      },
      {
        id: 'firstName',
        title: "What's your first name?",
        type: 'text',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'minLength', value: 2, message: 'Minimum length is 2 characters' },
          { type: 'pattern', value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces allowed' }
        ],
        section: 'Personal Information',
        questionNumber: 14,
        groupId: 'personal-basics'
      }
    ]
  },

  // GROUP 2: SCREENING QUESTIONS
  {
    id: 'screening',
    name: 'Screening',
    description: 'Gateway questions to determine applicable sections',
    questionsPerPage: 10,
    questions: [
      {
        id: 'hasVehicles',
        title: 'Do you own any vehicles for personal/family use?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 15,
        groupId: 'screening'
      },
      {
        id: 'hasChildren',
        title: 'Do you have kids?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 16,
        groupId: 'screening'
      },
      {
        id: 'hasFinancialDependents',
        title: 'Do you have any other financial dependents?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 17,
        groupId: 'screening'
      },
      {
        id: 'hasPersonalLoans',
        title: 'Do you have any personal loans apart from home and vehicle loans?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Personal Information',
        questionNumber: 18,
        groupId: 'screening'
      },
      { id: 'skip19', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 19, groupId: 'screening' },
      { id: 'skip20', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 20, groupId: 'screening' },
      { id: 'skip21', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 21, groupId: 'screening' },
      { id: 'skip22', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 22, groupId: 'screening' },
      { id: 'skip23', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 23, groupId: 'screening' },
      { id: 'skip24', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 24, groupId: 'screening' }
    ]
  },

  // GROUP 3: HOUSING
  {
    id: 'housing',
    name: 'Housing',
    description: 'Housing and property information',
    questionsPerPage: 10,
    questions: [
      {
        id: 'housingType',
        title: 'In your primary residence, do you rent it or own it?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Rent it', label: 'Rent it' },
          { value: 'Own it', label: 'Own it' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Housing & Real Estate',
        questionNumber: 25,
        groupId: 'housing'
      },
      {
        id: 'monthlyRent',
        title: 'What is your monthly rent?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        conditional: {
          dependsOn: 'housingType',
          values: ['Rent it']
        },
        section: 'Housing & Real Estate',
        questionNumber: 26,
        groupId: 'housing'
      },
      {
        id: 'rentalDeposit',
        title: 'What is your annual rental deposit?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        conditional: {
          dependsOn: 'housingType',
          values: ['Rent it']
        },
        section: 'Housing & Real Estate',
        questionNumber: 27,
        groupId: 'housing'
      },
      {
        id: 'homePurchasePrice',
        title: 'What was the price you purchased this property at?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 100000, message: 'Minimum value is 100,000' }
        ],
        conditional: {
          dependsOn: 'housingType',
          values: ['Own it']
        },
        section: 'Housing & Real Estate',
        questionNumber: 28,
        groupId: 'housing'
      },
      {
        id: 'homeCurrentValue',
        title: 'What is the estimated current value of the property?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 100000, message: 'Minimum value is 100,000' }
        ],
        conditional: {
          dependsOn: 'housingType',
          values: ['Own it']
        },
        section: 'Housing & Real Estate',
        questionNumber: 29,
        groupId: 'housing'
      },
      {
        id: 'hasHomeLoan',
        title: 'Do you have a loan on the property?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        conditional: {
          dependsOn: 'housingType',
          values: ['Own it']
        },
        section: 'Housing & Real Estate',
        questionNumber: 30,
        groupId: 'housing'
      },
      {
        id: 'homeOutstandingLoan',
        title: 'What is the outstanding loan amount?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        conditional: {
          dependsOn: 'hasHomeLoan',
          values: ['Yes']
        },
        section: 'Housing & Real Estate',
        questionNumber: 31,
        groupId: 'housing'
      },
      {
        id: 'homeMonthlyPayment',
        title: 'What is your monthly payment towards this loan?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        conditional: {
          dependsOn: 'hasHomeLoan',
          values: ['Yes']
        },
        section: 'Housing & Real Estate',
        questionNumber: 32,
        groupId: 'housing'
      },
      {
        id: 'homeAnnualMaintenance',
        title: 'What is total annual cost of building maintenance, taxes and ownership charges?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        conditional: {
          dependsOn: 'housingType',
          values: ['Own it']
        },
        section: 'Housing & Real Estate',
        questionNumber: 33,
        groupId: 'housing'
      },
      {
        id: 'hasAdditionalProperties',
        title: 'Do you own any other properties?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Housing & Real Estate',
        questionNumber: 34,
        groupId: 'housing'
      }
    ]
  },

  // GROUP 4: ADDITIONAL PROPERTIES
  {
    id: 'additional-properties',
    name: 'Additional Properties',
    description: 'Information about additional properties owned',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasAdditionalProperties',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numberOfAdditionalProperties',
        title: 'How many additional properties do you own?',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Additional Properties',
        questionNumber: 35,
        groupId: 'additional-properties'
      },
      {
        id: 'property1PurchasePrice',
        title: 'Property 1: What was the purchase price?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 500000, message: 'Minimum value is 500,000' }
        ],
        section: 'Additional Properties',
        questionNumber: 36,
        groupId: 'additional-properties'
      },
      {
        id: 'property1CurrentValue',
        title: 'Property 1: What is the current estimated value?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 500000, message: 'Minimum value is 500,000' }
        ],
        section: 'Additional Properties',
        questionNumber: 37,
        groupId: 'additional-properties'
      },
      {
        id: 'property1HasLoan',
        title: 'Property 1: Do you have a loan on this property?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Additional Properties',
        questionNumber: 38,
        groupId: 'additional-properties'
      },
      {
        id: 'property1OutstandingLoan',
        title: 'Property 1: What is the outstanding loan amount?',
        type: 'number',
        validation: [{ type: 'min', value: 0, message: 'Minimum value is 0' }],
        conditional: {
          dependsOn: 'property1HasLoan',
          values: ['Yes']
        },
        section: 'Additional Properties',
        questionNumber: 39,
        groupId: 'additional-properties'
      },
      {
        id: 'property1MonthlyPayment',
        title: 'Property 1: What is your monthly payment towards this loan?',
        type: 'number',
        validation: [{ type: 'min', value: 0, message: 'Minimum value is 0' }],
        conditional: {
          dependsOn: 'property1HasLoan',
          values: ['Yes']
        },
        section: 'Additional Properties',
        questionNumber: 40,
        groupId: 'additional-properties'
      },
      {
        id: 'property1RentalIncome',
        title: 'Property 1: Do you earn rental income from this property?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Additional Properties',
        questionNumber: 41,
        groupId: 'additional-properties'
      },
      {
        id: 'property1MonthlyRental',
        title: 'Property 1: What is the monthly rental income?',
        type: 'number',
        validation: [{ type: 'min', value: 0, message: 'Minimum value is 0' }],
        conditional: {
          dependsOn: 'property1RentalIncome',
          values: ['Yes']
        },
        section: 'Additional Properties',
        questionNumber: 42,
        groupId: 'additional-properties'
      },
      {
        id: 'property1Insurance',
        title: 'Property 1: Is this property insured?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Additional Properties',
        questionNumber: 43,
        groupId: 'additional-properties'
      },
      {
        id: 'property1InsurancePremium',
        title: 'Property 1: What is the annual premium for insurance?',
        type: 'number',
        validation: [{ type: 'min', value: 5000, message: 'Minimum value is 5,000' }],
        conditional: {
          dependsOn: 'property1Insurance',
          values: ['Yes']
        },
        section: 'Additional Properties',
        questionNumber: 44,
        groupId: 'additional-properties'
      }
    ]
  },

  // GROUP 5: VEHICLES
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Information about owned vehicles',
    questionsPerPage: 10,
    conditional: {
      dependsOn: 'hasVehicles',
      values: ['Yes']
    },
    questions: [
      {
        id: 'numberOfVehicles',
        title: 'How many vehicles do you own?',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Vehicles',
        questionNumber: 45,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1PurchasePrice',
        title: 'Vehicle 1: What was the purchase price?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 50000, message: 'Minimum value is 50,000' }
        ],
        section: 'Vehicles',
        questionNumber: 46,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1CurrentValue',
        title: 'Vehicle 1: What is the estimated current value?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 10000, message: 'Minimum value is 10,000' }
        ],
        section: 'Vehicles',
        questionNumber: 47,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1HasLoan',
        title: 'Vehicle 1: Do you have a loan on this vehicle?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        validation: [{ type: 'required', message: 'This field is required' }],
        section: 'Vehicles',
        questionNumber: 48,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1OutstandingLoan',
        title: 'Vehicle 1: What is the current outstanding loan amount?',
        type: 'number',
        validation: [{ type: 'min', value: 0, message: 'Minimum value is 0' }],
        conditional: {
          dependsOn: 'vehicle1HasLoan',
          values: ['Yes']
        },
        section: 'Vehicles',
        questionNumber: 49,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1MonthlyPayment',
        title: 'Vehicle 1: What is your monthly payment towards this loan?',
        type: 'number',
        validation: [{ type: 'min', value: 0, message: 'Minimum value is 0' }],
        conditional: {
          dependsOn: 'vehicle1HasLoan',
          values: ['Yes']
        },
        section: 'Vehicles',
        questionNumber: 50,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1FuelCost',
        title: 'Vehicle 1: What are estimated monthly fuel costs?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Vehicles',
        questionNumber: 51,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1InsuranceCost',
        title: 'Vehicle 1: What is the estimated annual insurance cost?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 5000, message: 'Minimum value is 5,000' }
        ],
        section: 'Vehicles',
        questionNumber: 52,
        groupId: 'vehicles'
      },
      {
        id: 'vehicle1MaintenanceCost',
        title: 'Vehicle 1: What are your other annual costs - maintenance, repairs?',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Vehicles',
        questionNumber: 53,
        groupId: 'vehicles'
      },
      { id: 'skip54', title: 'Skip', type: 'skip', section: 'Vehicles', questionNumber: 54, groupId: 'vehicles' }
    ]
  }
];

// Create a flattened array of all questions for backward compatibility
export const QUESTIONS = QUESTION_GROUPS.flatMap(group => group.questions);