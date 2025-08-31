import { QuestionGroup } from '@/types/assessment';

export const QUESTION_GROUPS: QuestionGroup[] = [
  // GROUP 1: PERSONAL BASICS
  {
    id: 'personal-basics',
    name: 'Personal Basics',
    description: 'Basic personal information',
    questionsPerPage: 10,
    questions: [
      // Page 1 (Questions 1-10)
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
      // Page 2 (Questions 11-14)
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
      },
      // Fill remaining slots with skip questions
      { id: 'skip15', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 15, groupId: 'personal-basics' },
      { id: 'skip16', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 16, groupId: 'personal-basics' },
      { id: 'skip17', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 17, groupId: 'personal-basics' },
      { id: 'skip18', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 18, groupId: 'personal-basics' },
      { id: 'skip19', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 19, groupId: 'personal-basics' },
      { id: 'skip20', title: 'Skip', type: 'skip', section: 'Personal Information', questionNumber: 20, groupId: 'personal-basics' }
    ]
  },

  // GROUP 2: HOUSING
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
        questionNumber: 21,
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
        questionNumber: 22,
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
        questionNumber: 23,
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
        questionNumber: 24,
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
        questionNumber: 25,
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
        questionNumber: 26,
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
        questionNumber: 27,
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
        questionNumber: 28,
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
        questionNumber: 29,
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
        questionNumber: 30,
        groupId: 'housing'
      }
    ]
  },

  // GROUP 9: MONTHLY EXPENSES 1
  {
    id: 'monthly-expenses-1',
    name: 'Monthly Expenses 1',
    description: 'Monthly living expenses',
    questionsPerPage: 10,
    questions: [
      {
        id: 'monthlyGroceriesToiletries',
        title: 'Groceries and toiletries monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 85,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyClothesShoes',
        title: 'Clothes and shoes monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 86,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyMakeupJewellery',
        title: 'Makeup and jewellery monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 87,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyBeautyTreatments',
        title: 'Haircuts, salon and beauty treatments monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 88,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyHouseHelp',
        title: 'Maid/cook/househelp/nanny monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 89,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyCookingGas',
        title: 'Cooking gas monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 90,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyElectricity',
        title: 'Electricity monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 91,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyMobile',
        title: 'Mobile monthly plan cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 92,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyInternet',
        title: 'Broadband/internet monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 93,
        groupId: 'monthly-expenses-1'
      },
      {
        id: 'monthlyTVOTT',
        title: 'TV/OTT/cable bills monthly cost',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Monthly Living Expenses',
        questionNumber: 94,
        groupId: 'monthly-expenses-1'
      }
    ]
  },

  // GROUP 14: INCOME
  {
    id: 'income',
    name: 'Income',
    description: 'Annual income sources',
    questionsPerPage: 10,
    questions: [
      {
        id: 'jobSalary',
        title: 'Job salary annual in hand',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 135,
        groupId: 'income'
      },
      {
        id: 'secondJobIncome',
        title: 'Second job in hand',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 136,
        groupId: 'income'
      },
      {
        id: 'freelanceIncome',
        title: 'Freelance in hand',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 137,
        groupId: 'income'
      },
      {
        id: 'sideBusinessIncome',
        title: 'Side business/partnership',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 138,
        groupId: 'income'
      },
      {
        id: 'realEstateIncome',
        title: 'Income from real estate',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 139,
        groupId: 'income'
      },
      {
        id: 'hobbyIncome',
        title: 'Income from hobby',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 140,
        groupId: 'income'
      },
      {
        id: 'dividendIncome',
        title: 'Dividends',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 141,
        groupId: 'income'
      },
      {
        id: 'familyStipend',
        title: 'Stipend from family',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 142,
        groupId: 'income'
      },
      {
        id: 'otherAnnualIncome',
        title: 'Other annual income',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 143,
        groupId: 'income'
      },
      {
        id: 'skip144',
        title: 'Skip',
        type: 'skip',
        section: 'Assets & Income',
        questionNumber: 144,
        groupId: 'income'
      }
    ]
  },

  // GROUP 13: ASSETS
  {
    id: 'assets',
    name: 'Assets',
    description: 'Current assets and investments',
    questionsPerPage: 10,
    questions: [
      {
        id: 'savingsAccountsFD',
        title: 'Value of all savings accounts and fixed deposits',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 125,
        groupId: 'assets'
      },
      {
        id: 'physicalCash',
        title: 'Physical cash at hand',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 126,
        groupId: 'assets'
      },
      {
        id: 'investmentValue',
        title: 'Value of stocks, mutual funds, investments',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 127,
        groupId: 'assets'
      },
      {
        id: 'retirementSavings',
        title: 'Retirement savings from employer contributions',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 128,
        groupId: 'assets'
      },
      {
        id: 'jewelleryValue',
        title: 'Total value of all jewellery',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 129,
        groupId: 'assets'
      },
      {
        id: 'collectiblesValue',
        title: 'Total value of collectibles, art, valuables',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 130,
        groupId: 'assets'
      },
      {
        id: 'currentHomesValue',
        title: 'Current value of all homes',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 131,
        groupId: 'assets'
      },
      {
        id: 'currentVehiclesValue',
        title: 'Current value of all vehicles',
        type: 'number',
        required: true,
        validation: [
          { type: 'required', message: 'This field is required' },
          { type: 'min', value: 0, message: 'Minimum value is 0' }
        ],
        section: 'Assets & Income',
        questionNumber: 132,
        groupId: 'assets'
      },
      { id: 'skip133', title: 'Skip', type: 'skip', section: 'Assets & Income', questionNumber: 133, groupId: 'assets' },
      { id: 'skip134', title: 'Skip', type: 'skip', section: 'Assets & Income', questionNumber: 134, groupId: 'assets' }
    ]
  }
];

// Create a flattened array of all questions for backward compatibility
export const QUESTIONS = QUESTION_GROUPS.flatMap(group => group.questions);