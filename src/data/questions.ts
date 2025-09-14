import { Question } from "../types/assessment";

export const QUESTION_DEFINITIONS: Record<string, Question> = {
  // Personal Basics
  fullName: { id: "fullName", title: "What is your full name?", type: "text", required: true, section: "Personal Basics", questionNumber: 1, groupId: "personal-basics" },
  dateOfBirth: { id: "dateOfBirth", title: "What is your date of birth?", type: "date", required: true, section: "Personal Basics", questionNumber: 2, groupId: "personal-basics" },
  gender: { id: "gender", title: "What is your gender?", type: "radio", required: true, options: [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }], section: "Personal Basics", questionNumber: 3, groupId: "personal-basics" },
  maritalStatus: { id: "maritalStatus", title: "What is your marital status?", type: "radio", required: true, options: [{ value: "Single", label: "Single" }, { value: "Married", label: "Married" }], section: "Personal Basics", questionNumber: 4, groupId: "personal-basics" },
  country: { id: "country", title: "Which country are you from?", type: "select", required: true, options: [{ value: "India", label: "India" }, { value: "USA", label: "United States" }], section: "Personal Basics", questionNumber: 5, groupId: "personal-basics" },
  state: { id: "state", title: "Which state/province are you from?", type: "text", section: "Personal Basics", questionNumber: 6, groupId: "personal-basics" },
  city: { id: "city", title: "Which city are you from?", type: "text", section: "Personal Basics", questionNumber: 7, groupId: "personal-basics" },
  citizenship: { id: "citizenship", title: "What is your citizenship status?", type: "select", options: [{ value: "Citizen", label: "Citizen" }], section: "Personal Basics", questionNumber: 8, groupId: "personal-basics" },
  residencyStatus: { id: "residencyStatus", title: "What is your residency status?", type: "select", options: [{ value: "Resident", label: "Resident" }], section: "Personal Basics", questionNumber: 9, groupId: "personal-basics" },
  occupationType: { id: "occupationType", title: "What is your occupation type?", type: "select", options: [{ value: "Employed", label: "Employed" }], section: "Personal Basics", questionNumber: 10, groupId: "personal-basics" },
  industry: { id: "industry", title: "What industry do you work in?", type: "select", options: [{ value: "Technology", label: "Technology" }], section: "Personal Basics", questionNumber: 11, groupId: "personal-basics" },
  employmentType: { id: "employmentType", title: "What is your employment type?", type: "select", options: [{ value: "Full-time", label: "Full-time" }], section: "Personal Basics", questionNumber: 12, groupId: "personal-basics" },
  yearsInJob: { id: "yearsInJob", title: "How many years have you been in your current job?", type: "number", section: "Personal Basics", questionNumber: 13, groupId: "personal-basics" },
  educationLevel: { id: "educationLevel", title: "What is your highest education level?", type: "select", options: [{ value: "Bachelor's", label: "Bachelor's Degree" }], section: "Personal Basics", questionNumber: 14, groupId: "personal-basics" },

  // Screening Questions
  hasChildren: { id: "hasChildren", title: "Do you have children?", type: "radio", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Screening", questionNumber: 15, groupId: "screening" },
  hasVehicles: { id: "hasVehicles", title: "Do you own any vehicles?", type: "radio", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Screening", questionNumber: 16, groupId: "screening" },
  hasAdditionalProperties: { id: "hasAdditionalProperties", title: "Do you own additional properties?", type: "radio", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Screening", questionNumber: 17, groupId: "screening" },
  hasPersonalLoans: { id: "hasPersonalLoans", title: "Do you have any personal loans?", type: "radio", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Screening", questionNumber: 18, groupId: "screening" },
  hasFinancialDependents: { id: "hasFinancialDependents", title: "Do you have any financial dependents?", type: "radio", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Screening", questionNumber: 19, groupId: "screening" },

  // Housing
  homeOwnershipStatus: { id: "homeOwnershipStatus", title: "What is your home ownership status?", type: "radio", required: true, options: [{ value: "Own", label: "Own" }, { value: "Rent", label: "Rent" }], section: "Housing", questionNumber: 20, groupId: "housing" },
  monthlyRent: { id: "monthlyRent", title: "What is your monthly rent?", type: "number", section: "Housing", questionNumber: 21, groupId: "housing" },
  homeLoanEMI: { id: "homeLoanEMI", title: "What is your monthly home loan EMI?", type: "number", section: "Housing", questionNumber: 22, groupId: "housing" },
  homeLoanOutstanding: { id: "homeLoanOutstanding", title: "What is your outstanding home loan amount?", type: "number", section: "Housing", questionNumber: 23, groupId: "housing" },
  homeInsurance: { id: "homeInsurance", title: "What is your annual home insurance premium?", type: "number", section: "Housing", questionNumber: 24, groupId: "housing" },
  propertyTax: { id: "propertyTax", title: "What is your annual property tax?", type: "number", section: "Housing", questionNumber: 25, groupId: "housing" },
  utilityBills: { id: "utilityBills", title: "What are your monthly utility bills?", type: "number", section: "Housing", questionNumber: 26, groupId: "housing" },
  homeMaintenanceCost: { id: "homeMaintenanceCost", title: "What are your monthly home maintenance costs?", type: "number", section: "Housing", questionNumber: 27, groupId: "housing" },
  residenceType: { id: "residenceType", title: "What type of residence do you live in?", type: "select", options: [{ value: "Apartment", label: "Apartment" }], section: "Housing", questionNumber: 28, groupId: "housing" },
  hasHomeLoan: { id: "hasHomeLoan", title: "Do you have a home loan?", type: "radio", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Housing", questionNumber: 29, groupId: "housing" },

  // Income & Assets
  monthlySalary: { id: "monthlySalary", title: "What is your monthly salary?", type: "number", required: true, section: "Income & Assets", questionNumber: 30, groupId: "income-assets" },
  spouseMonthlyIncome: { id: "spouseMonthlyIncome", title: "What is your spouse's monthly income?", type: "number", section: "Income & Assets", questionNumber: 31, groupId: "income-assets" },
  sideIncome: { id: "sideIncome", title: "What is your monthly side income?", type: "number", section: "Income & Assets", questionNumber: 32, groupId: "income-assets" },
  rentalIncomeTotal: { id: "rentalIncomeTotal", title: "What is your total monthly rental income?", type: "number", section: "Income & Assets", questionNumber: 33, groupId: "income-assets" },
  investmentIncome: { id: "investmentIncome", title: "What is your monthly investment income?", type: "number", section: "Income & Assets", questionNumber: 34, groupId: "income-assets" },
  totalCashSavings: { id: "totalCashSavings", title: "What is your total cash savings?", type: "number", section: "Income & Assets", questionNumber: 35, groupId: "income-assets" },
  totalInvestments: { id: "totalInvestments", title: "What is your total investment value?", type: "number", section: "Income & Assets", questionNumber: 36, groupId: "income-assets" },
  totalGold: { id: "totalGold", title: "What is your total gold value?", type: "number", section: "Income & Assets", questionNumber: 37, groupId: "income-assets" },
  cryptoHoldings: { id: "cryptoHoldings", title: "What is your total cryptocurrency value?", type: "number", section: "Income & Assets", questionNumber: 38, groupId: "income-assets" },

  // Additional Properties
  numPropertiesOwned: { id: "numPropertiesOwned", title: "How many additional properties do you own?", type: "number", required: true, section: "Additional Properties", questionNumber: 39, groupId: "additional-properties" },
  propertyLocations: { id: "propertyLocations", title: "Where are your properties located?", type: "text", section: "Additional Properties", questionNumber: 40, groupId: "additional-properties" },
  propertyValues: { id: "propertyValues", title: "What is the total value of your additional properties?", type: "number", section: "Additional Properties", questionNumber: 41, groupId: "additional-properties" },
  propertyLoans: { id: "propertyLoans", title: "What is the total outstanding loan amount on these properties?", type: "number", section: "Additional Properties", questionNumber: 42, groupId: "additional-properties" },
  rentalIncome: { id: "rentalIncome", title: "What is your monthly rental income from these properties?", type: "number", section: "Additional Properties", questionNumber: 43, groupId: "additional-properties" },
  maintenanceCosts: { id: "maintenanceCosts", title: "What are your monthly maintenance costs for these properties?", type: "number", section: "Additional Properties", questionNumber: 44, groupId: "additional-properties" },
  propertyInsurance: { id: "propertyInsurance", title: "What is your annual insurance premium for these properties?", type: "number", section: "Additional Properties", questionNumber: 45, groupId: "additional-properties" },

  // Vehicles
  numVehicles: { id: "numVehicles", title: "How many vehicles do you own?", type: "number", required: true, section: "Vehicles", questionNumber: 46, groupId: "vehicles" },
  vehicleType: { id: "vehicleType", title: "What type of vehicles do you own?", type: "select", options: [{ value: "Car", label: "Car" }], section: "Vehicles", questionNumber: 47, groupId: "vehicles" },
  vehicleLoan: { id: "vehicleLoan", title: "What is the total outstanding loan amount on your vehicles?", type: "number", section: "Vehicles", questionNumber: 48, groupId: "vehicles" },
  vehicleEMI: { id: "vehicleEMI", title: "What is your total monthly vehicle loan EMI?", type: "number", section: "Vehicles", questionNumber: 49, groupId: "vehicles" },
  vehicleInsurance: { id: "vehicleInsurance", title: "What is your annual vehicle insurance premium?", type: "number", section: "Vehicles", questionNumber: 50, groupId: "vehicles" },
  fuelCosts: { id: "fuelCosts", title: "What are your monthly fuel costs?", type: "number", section: "Vehicles", questionNumber: 51, groupId: "vehicles" },
  maintenanceCostsVehicle: { id: "maintenanceCostsVehicle", title: "What are your monthly vehicle maintenance costs?", type: "number", section: "Vehicles", questionNumber: 52, groupId: "vehicles" },

  // Children Questions (referenced in questionGroups)
  numberOfChildren: { id: "numberOfChildren", title: "How many children do you have?", type: "number", required: true, section: "Children", questionNumber: 53, groupId: "children" },
  child1AgeGroup: { id: "child1AgeGroup", title: "What age group is your first child in?", type: "select", options: [{ value: "0-2", label: "0-2 years" }, { value: "3-5", label: "3-5 years" }, { value: "6-12", label: "6-12 years" }, { value: "13-18", label: "13-18 years" }], section: "Children", questionNumber: 54, groupId: "children" },
  child1Diapers: { id: "child1Diapers", title: "Monthly cost for diapers (Child 1)?", type: "number", section: "Children", questionNumber: 55, groupId: "children" },
  child1Clothing: { id: "child1Clothing", title: "Monthly cost for clothing (Child 1)?", type: "number", section: "Children", questionNumber: 56, groupId: "children" },
  child1Toys: { id: "child1Toys", title: "Monthly cost for toys (Child 1)?", type: "number", section: "Children", questionNumber: 57, groupId: "children" },
  child1Activities: { id: "child1Activities", title: "Monthly cost for activities (Child 1)?", type: "number", section: "Children", questionNumber: 58, groupId: "children" },
  child1Education: { id: "child1Education", title: "Monthly cost for education (Child 1)?", type: "number", section: "Children", questionNumber: 59, groupId: "children" },
  child1Medical: { id: "child1Medical", title: "Monthly medical costs (Child 1)?", type: "number", section: "Children", questionNumber: 60, groupId: "children" },
  child1HealthInsurance: { id: "child1HealthInsurance", title: "Monthly health insurance premium (Child 1)?", type: "number", section: "Children", questionNumber: 61, groupId: "children" },

  // Financial Dependents Questions
  numberOfDependents: { id: "numberOfDependents", title: "How many financial dependents do you have?", type: "number", required: true, section: "Financial Dependents", questionNumber: 62, groupId: "financial-dependents" },
  dependent1Health: { id: "dependent1Health", title: "Monthly health costs for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 63, groupId: "financial-dependents" },
  dependent1Living: { id: "dependent1Living", title: "Monthly living costs for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 64, groupId: "financial-dependents" },
  dependent1Travel: { id: "dependent1Travel", title: "Monthly travel costs for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 65, groupId: "financial-dependents" },
  dependent1Entertainment: { id: "dependent1Entertainment", title: "Monthly entertainment costs for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 66, groupId: "financial-dependents" },
  dependent1Miscellaneous: { id: "dependent1Miscellaneous", title: "Monthly miscellaneous costs for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 67, groupId: "financial-dependents" },
  dependent1HasInsurance: { id: "dependent1HasInsurance", title: "Does dependent 1 have insurance?", type: "radio", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Financial Dependents", questionNumber: 68, groupId: "financial-dependents" },
  dependent1InsuranceValue: { id: "dependent1InsuranceValue", title: "Insurance coverage value for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 69, groupId: "financial-dependents" },
  dependent1InsurancePremium: { id: "dependent1InsurancePremium", title: "Monthly insurance premium for dependent 1?", type: "number", section: "Financial Dependents", questionNumber: 70, groupId: "financial-dependents" },

  // Personal Loans Questions
  numberOfPersonalLoans: { id: "numberOfPersonalLoans", title: "How many personal loans do you have?", type: "number", required: true, section: "Personal Loans", questionNumber: 71, groupId: "personal-loans" },
  loan1Reason: { id: "loan1Reason", title: "What is the reason for loan 1?", type: "text", section: "Personal Loans", questionNumber: 72, groupId: "personal-loans" },
  loan1OriginalAmount: { id: "loan1OriginalAmount", title: "Original amount of loan 1?", type: "number", section: "Personal Loans", questionNumber: 73, groupId: "personal-loans" },
  loan1OutstandingBalance: { id: "loan1OutstandingBalance", title: "Outstanding balance of loan 1?", type: "number", section: "Personal Loans", questionNumber: 74, groupId: "personal-loans" },
  loan1InterestRate: { id: "loan1InterestRate", title: "Interest rate of loan 1 (%)?", type: "number", section: "Personal Loans", questionNumber: 75, groupId: "personal-loans" },
  loan1PayoffMonths: { id: "loan1PayoffMonths", title: "Months left to pay off loan 1?", type: "number", section: "Personal Loans", questionNumber: 76, groupId: "personal-loans" },
  loan1MonthlyPayment: { id: "loan1MonthlyPayment", title: "Monthly payment for loan 1?", type: "number", section: "Personal Loans", questionNumber: 77, groupId: "personal-loans" },

  // Insurance Questions
  hasHealthInsurance: { id: "hasHealthInsurance", title: "Do you have health insurance?", type: "radio", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Insurance", questionNumber: 78, groupId: "insurance" },
  healthInsuranceCover: { id: "healthInsuranceCover", title: "Health insurance coverage amount?", type: "number", section: "Insurance", questionNumber: 79, groupId: "insurance" },
  healthInsurancePremium: { id: "healthInsurancePremium", title: "Monthly health insurance premium?", type: "number", section: "Insurance", questionNumber: 80, groupId: "insurance" },
  hasAccidentInsurance: { id: "hasAccidentInsurance", title: "Do you have accident insurance?", type: "radio", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Insurance", questionNumber: 81, groupId: "insurance" },
  accidentInsuranceCover: { id: "accidentInsuranceCover", title: "Accident insurance coverage amount?", type: "number", section: "Insurance", questionNumber: 82, groupId: "insurance" },
  accidentInsurancePremium: { id: "accidentInsurancePremium", title: "Monthly accident insurance premium?", type: "number", section: "Insurance", questionNumber: 83, groupId: "insurance" },
  hasLifeInsurance: { id: "hasLifeInsurance", title: "Do you have life insurance?", type: "radio", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], section: "Insurance", questionNumber: 84, groupId: "insurance" },
  lifeInsuranceCover: { id: "lifeInsuranceCover", title: "Life insurance coverage amount?", type: "number", section: "Insurance", questionNumber: 85, groupId: "insurance" },
  lifeInsurancePremium: { id: "lifeInsurancePremium", title: "Monthly life insurance premium?", type: "number", section: "Insurance", questionNumber: 86, groupId: "insurance" },

  // Skip questions (placeholder questions for navigation/flow control)
  skip70: { id: "skip70", title: "", type: "skip", section: "Children", questionNumber: 70, groupId: "children" },
  skip80: { id: "skip80", title: "", type: "skip", section: "Financial Dependents", questionNumber: 80, groupId: "financial-dependents" },
  skip88: { id: "skip88", title: "", type: "skip", section: "Personal Loans", questionNumber: 88, groupId: "personal-loans" },
  skip89: { id: "skip89", title: "", type: "skip", section: "Personal Loans", questionNumber: 89, groupId: "personal-loans" },
  skip90: { id: "skip90", title: "", type: "skip", section: "Personal Loans", questionNumber: 90, groupId: "personal-loans" },
  skip100: { id: "skip100", title: "", type: "skip", section: "Insurance", questionNumber: 100, groupId: "insurance" }
};

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_DEFINITIONS[id];
}

export function getQuestionsById(ids: string[]): Question[] {
  return ids.map(id => QUESTION_DEFINITIONS[id]).filter(Boolean);
}

// Export questions array for compatibility with existing code
export const questions: Question[] = Object.values(QUESTION_DEFINITIONS);