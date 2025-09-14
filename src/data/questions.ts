import { Question } from "../types/assessment";

export const QUESTION_DEFINITIONS: Record<string, Question> = {
  // Personal Basics
  fullName: { id: "fullName", text: "What is your full name?", type: "text" },
  dateOfBirth: { id: "dateOfBirth", text: "What is your date of birth?", type: "date" },
  gender: { id: "gender", text: "What is your gender?", type: "radio", options: ["Male", "Female"] },
  maritalStatus: { id: "maritalStatus", text: "What is your marital status?", type: "radio", options: ["Single", "Married"] },
  country: { id: "country", text: "Which country are you from?", type: "select", options: ["India", "USA"] },
  state: { id: "state", text: "Which state/province are you from?", type: "text" },
  city: { id: "city", text: "Which city are you from?", type: "text" },
  citizenship: { id: "citizenship", text: "What is your citizenship status?", type: "select", options: ["Citizen"] },
  residencyStatus: { id: "residencyStatus", text: "What is your residency status?", type: "select", options: ["Resident"] },
  occupationType: { id: "occupationType", text: "What is your occupation type?", type: "select", options: ["Employed"] },
  industry: { id: "industry", text: "What industry do you work in?", type: "select", options: ["Technology"] },
  employmentType: { id: "employmentType", text: "What is your employment type?", type: "select", options: ["Full-time"] },
  yearsInJob: { id: "yearsInJob", text: "How many years have you been in your current job?", type: "number" },
  educationLevel: { id: "educationLevel", text: "What is your highest education level?", type: "select", options: ["Bachelor's Degree"] },

  // Screening Questions
  hasChildren: { id: "hasChildren", text: "Do you have children?", type: "radio", options: ["Yes", "No"] },
  hasVehicles: { id: "hasVehicles", text: "Do you own any vehicles?", type: "radio", options: ["Yes", "No"] },
  hasAdditionalProperties: { id: "hasAdditionalProperties", text: "Do you own additional properties?", type: "radio", options: ["Yes", "No"] },
  hasPersonalLoans: { id: "hasPersonalLoans", text: "Do you have any personal loans?", type: "radio", options: ["Yes", "No"] },
  hasFinancialDependents: { id: "hasFinancialDependents", text: "Do you have any financial dependents?", type: "radio", options: ["Yes", "No"] },

  // Housing
  homeOwnershipStatus: { id: "homeOwnershipStatus", text: "What is your home ownership status?", type: "radio", options: ["Own", "Rent"] },
  monthlyRent: { id: "monthlyRent", text: "What is your monthly rent?", type: "number" },
  homeLoanEMI: { id: "homeLoanEMI", text: "What is your monthly home loan EMI?", type: "number" },
  homeLoanOutstanding: { id: "homeLoanOutstanding", text: "What is your outstanding home loan amount?", type: "number" },
  homeInsurance: { id: "homeInsurance", text: "What is your annual home insurance premium?", type: "number" },
  propertyTax: { id: "propertyTax", text: "What is your annual property tax?", type: "number" },
  utilityBills: { id: "utilityBills", text: "What are your monthly utility bills?", type: "number" },
  homeMaintenanceCost: { id: "homeMaintenanceCost", text: "What are your monthly home maintenance costs?", type: "number" },
  residenceType: { id: "residenceType", text: "What type of residence do you live in?", type: "select", options: ["Apartment"] },
  hasHomeLoan: { id: "hasHomeLoan", text: "Do you have a home loan?", type: "radio", options: ["Yes", "No"] },

  // Income & Assets
  monthlySalary: { id: "monthlySalary", text: "What is your monthly salary?", type: "number" },
  spouseMonthlyIncome: { id: "spouseMonthlyIncome", text: "What is your spouse's monthly income?", type: "number" },
  sideIncome: { id: "sideIncome", text: "What is your monthly side income?", type: "number" },
  rentalIncomeTotal: { id: "rentalIncomeTotal", text: "What is your total monthly rental income?", type: "number" },
  investmentIncome: { id: "investmentIncome", text: "What is your monthly investment income?", type: "number" },
  totalCashSavings: { id: "totalCashSavings", text: "What is your total cash savings?", type: "number" },
  totalInvestments: { id: "totalInvestments", text: "What is your total investment value?", type: "number" },
  totalGold: { id: "totalGold", text: "What is your total gold value?", type: "number" },
  cryptoHoldings: { id: "cryptoHoldings", text: "What is your total cryptocurrency value?", type: "number" },

  // Additional Properties
  numPropertiesOwned: { id: "numPropertiesOwned", text: "How many additional properties do you own?", type: "number" },
  propertyLocations: { id: "propertyLocations", text: "Where are your properties located?", type: "text" },
  propertyValues: { id: "propertyValues", text: "What is the total value of your additional properties?", type: "number" },
  propertyLoans: { id: "propertyLoans", text: "What is the total outstanding loan amount on these properties?", type: "number" },
  rentalIncome: { id: "rentalIncome", text: "What is your monthly rental income from these properties?", type: "number" },
  maintenanceCosts: { id: "maintenanceCosts", text: "What are your monthly maintenance costs for these properties?", type: "number" },
  propertyInsurance: { id: "propertyInsurance", text: "What is your annual insurance premium for these properties?", type: "number" },

  // Vehicles
  numVehicles: { id: "numVehicles", text: "How many vehicles do you own?", type: "number" },
  vehicleType: { id: "vehicleType", text: "What type of vehicles do you own?", type: "select", options: ["Car"] },
  vehicleLoan: { id: "vehicleLoan", text: "What is the total outstanding loan amount on your vehicles?", type: "number" },
  vehicleEMI: { id: "vehicleEMI", text: "What is your total monthly vehicle loan EMI?", type: "number" },
  vehicleInsurance: { id: "vehicleInsurance", text: "What is your annual vehicle insurance premium?", type: "number" },
  fuelCosts: { id: "fuelCosts", text: "What are your monthly fuel costs?", type: "number" },
  maintenanceCostsVehicle: { id: "maintenanceCostsVehicle", text: "What are your monthly vehicle maintenance costs?", type: "number" },

  // Children Questions (referenced in questionGroups)
  numberOfChildren: { id: "numberOfChildren", text: "How many children do you have?", type: "number" },
  child1AgeGroup: { id: "child1AgeGroup", text: "What age group is your first child in?", type: "select", options: ["0-2 years", "3-5 years", "6-12 years", "13-18 years"] },
  child1Diapers: { id: "child1Diapers", text: "Monthly cost for diapers (Child 1)?", type: "number" },
  child1Clothing: { id: "child1Clothing", text: "Monthly cost for clothing (Child 1)?", type: "number" },
  child1Toys: { id: "child1Toys", text: "Monthly cost for toys (Child 1)?", type: "number" },
  child1Activities: { id: "child1Activities", text: "Monthly cost for activities (Child 1)?", type: "number" },
  child1Education: { id: "child1Education", text: "Monthly cost for education (Child 1)?", type: "number" },
  child1Medical: { id: "child1Medical", text: "Monthly medical costs (Child 1)?", type: "number" },
  child1HealthInsurance: { id: "child1HealthInsurance", text: "Monthly health insurance premium (Child 1)?", type: "number" },

  // Financial Dependents Questions
  numberOfDependents: { id: "numberOfDependents", text: "How many financial dependents do you have?", type: "number" },
  dependent1Health: { id: "dependent1Health", text: "Monthly health costs for dependent 1?", type: "number" },
  dependent1Living: { id: "dependent1Living", text: "Monthly living costs for dependent 1?", type: "number" },
  dependent1Travel: { id: "dependent1Travel", text: "Monthly travel costs for dependent 1?", type: "number" },
  dependent1Entertainment: { id: "dependent1Entertainment", text: "Monthly entertainment costs for dependent 1?", type: "number" },
  dependent1Miscellaneous: { id: "dependent1Miscellaneous", text: "Monthly miscellaneous costs for dependent 1?", type: "number" },
  dependent1HasInsurance: { id: "dependent1HasInsurance", text: "Does dependent 1 have insurance?", type: "radio", options: ["Yes", "No"] },
  dependent1InsuranceValue: { id: "dependent1InsuranceValue", text: "Insurance coverage value for dependent 1?", type: "number" },
  dependent1InsurancePremium: { id: "dependent1InsurancePremium", text: "Monthly insurance premium for dependent 1?", type: "number" },

  // Personal Loans Questions
  numberOfPersonalLoans: { id: "numberOfPersonalLoans", text: "How many personal loans do you have?", type: "number" },
  loan1Reason: { id: "loan1Reason", text: "What is the reason for loan 1?", type: "text" },
  loan1OriginalAmount: { id: "loan1OriginalAmount", text: "Original amount of loan 1?", type: "number" },
  loan1OutstandingBalance: { id: "loan1OutstandingBalance", text: "Outstanding balance of loan 1?", type: "number" },
  loan1InterestRate: { id: "loan1InterestRate", text: "Interest rate of loan 1 (%)?", type: "number" },
  loan1PayoffMonths: { id: "loan1PayoffMonths", text: "Months left to pay off loan 1?", type: "number" },
  loan1MonthlyPayment: { id: "loan1MonthlyPayment", text: "Monthly payment for loan 1?", type: "number" },

  // Insurance Questions
  hasHealthInsurance: { id: "hasHealthInsurance", text: "Do you have health insurance?", type: "radio", options: ["Yes", "No"] },
  healthInsuranceCover: { id: "healthInsuranceCover", text: "Health insurance coverage amount?", type: "number" },
  healthInsurancePremium: { id: "healthInsurancePremium", text: "Monthly health insurance premium?", type: "number" },
  hasAccidentInsurance: { id: "hasAccidentInsurance", text: "Do you have accident insurance?", type: "radio", options: ["Yes", "No"] },
  accidentInsuranceCover: { id: "accidentInsuranceCover", text: "Accident insurance coverage amount?", type: "number" },
  accidentInsurancePremium: { id: "accidentInsurancePremium", text: "Monthly accident insurance premium?", type: "number" },
  hasLifeInsurance: { id: "hasLifeInsurance", text: "Do you have life insurance?", type: "radio", options: ["Yes", "No"] },
  lifeInsuranceCover: { id: "lifeInsuranceCover", text: "Life insurance coverage amount?", type: "number" },
  lifeInsurancePremium: { id: "lifeInsurancePremium", text: "Monthly life insurance premium?", type: "number" },

  // Skip questions (placeholder questions for navigation/flow control)
  skip70: { id: "skip70", text: "", type: "skip" },
  skip80: { id: "skip80", text: "", type: "skip" },
  skip88: { id: "skip88", text: "", type: "skip" },
  skip89: { id: "skip89", text: "", type: "skip" },
  skip90: { id: "skip90", text: "", type: "skip" },
  skip100: { id: "skip100", text: "", type: "skip" }
};

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_DEFINITIONS[id];
}

export function getQuestionsById(ids: string[]): Question[] {
  return ids.map(id => QUESTION_DEFINITIONS[id]).filter(Boolean);
}

// Export questions array for compatibility with existing code
export const questions: Question[] = Object.values(QUESTION_DEFINITIONS);