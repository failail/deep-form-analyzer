import { Question } from '@/types/assessment';

export const QUESTIONS: Question[] = [
  // Section 1: Personal Information (14 Questions)
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
    questionNumber: 1
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Personal Information',
    questionNumber: 2
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Personal Information',
    questionNumber: 3
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    conditional: {
      dependsOn: 'relationshipStatus',
      values: ['In relationship not living together', 'In relationship living together', 'Married']
    },
    section: 'Personal Information',
    questionNumber: 4
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Personal Information',
    questionNumber: 5
  },
  {
    id: 'retirementDate',
    title: 'When did you retire?',
    type: 'date',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    conditional: {
      dependsOn: 'workSituation',
      values: ['Retired']
    },
    section: 'Personal Information',
    questionNumber: 6
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    conditional: {
      dependsOn: 'workSituation',
      values: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Freelancer']
    },
    section: 'Personal Information',
    questionNumber: 7
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    conditional: {
      dependsOn: 'workSituation',
      values: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Freelancer']
    },
    section: 'Personal Information',
    questionNumber: 8
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Personal Information',
    questionNumber: 9
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
    questionNumber: 10
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Personal Information',
    questionNumber: 11
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
    questionNumber: 12
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Personal Information',
    questionNumber: 13
  },
  {
    id: 'firstName',
    title: "What's your first name? (We'll use this to personalise your experience)",
    type: 'text',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'minLength', value: 2, message: 'Minimum length is 2 characters' },
      { type: 'pattern', value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces allowed' }
    ],
    section: 'Personal Information',
    questionNumber: 14
  },

  // Section 2: Housing & Real Estate 
  {
    id: 'housingType',
    title: 'In your primary residence, do you rent it or own it?',
    type: 'radio',
    required: true,
    options: [
      { value: 'Rent it', label: 'Rent it' },
      { value: 'Own it', label: 'Own it' }
    ],
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    section: 'Housing & Real Estate',
    questionNumber: 15
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
    questionNumber: 16
  },
  {
    id: 'rentalDeposit',
    title: 'What is your annual rental deposit (if your contract is for more than 1 year, divide it by the number of years)?',
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
    questionNumber: 17
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
    validation: [
      { type: 'required', message: 'This field is required' }
    ],
    conditional: {
      dependsOn: 'housingType',
      values: ['Own it']
    },
    section: 'Housing & Real Estate',
    questionNumber: 18
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
    questionNumber: 19
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
    questionNumber: 20
  },

  // Continue with more housing questions and other sections...
  // For prototype, I'll add key income/expense questions to make calculations work

  // Section 7: Monthly Living Expenses
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
    questionNumber: 21
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
    questionNumber: 22
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
    questionNumber: 23
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
    questionNumber: 24
  },
  {
    id: 'monthlyDiningOut',
    title: 'Eating out, ordering food, partying, drinking out, coffee outside of home. Monthly cost',
    type: 'number',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'min', value: 0, message: 'Minimum value is 0' }
    ],
    section: 'Monthly Living Expenses',
    questionNumber: 25
  },

  // Section 9: Assets & Income
  {
    id: 'savingsAccountsFD',
    title: 'What is the value of all your savings accounts and fixed deposits?',
    type: 'number',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'min', value: 0, message: 'Minimum value is 0' }
    ],
    section: 'Assets & Income',
    questionNumber: 26
  },
  {
    id: 'investmentValue',
    title: 'What is the value of all your stock, mutual fund, ETF, gold investment/till date, crypto, tax saving investments (exclude real estate and savings/investments in government link retirement schemes)?',
    type: 'number',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'min', value: 0, message: 'Minimum value is 0' }
    ],
    section: 'Assets & Income',
    questionNumber: 27
  },
  {
    id: 'jobSalary',
    title: 'Job Salary - in hand - Annual',
    type: 'number',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'min', value: 0, message: 'Minimum value is 0' }
    ],
    section: 'Assets & Income',
    questionNumber: 28
  },
  {
    id: 'secondJobIncome',
    title: 'Second job - in hand',
    type: 'number',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'min', value: 0, message: 'Minimum value is 0' }
    ],
    section: 'Assets & Income',
    questionNumber: 29
  },
  {
    id: 'freelanceIncome',
    title: 'Freelance - in hand',
    type: 'number',
    required: true,
    validation: [
      { type: 'required', message: 'This field is required' },
      { type: 'min', value: 0, message: 'Minimum value is 0' }
    ],
    section: 'Assets & Income',
    questionNumber: 30
  }

  // Note: This is a subset for the prototype. The full 200+ questions would be added in production.
];