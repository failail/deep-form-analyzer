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
  hasChildren: { id: "hasChildren", title: "Do you have children?", type: "radio", required: true, options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }], section: "Screening", questionNumber: 15, groupId: "screening" },
  hasVehicles: { id: "hasVehicles", title: "Do you own any vehicles?", type: "radio", required: true, options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }], section: "Screening", questionNumber: 16, groupId: "screening" },
  hasAdditionalProperties: { id: "hasAdditionalProperties", title: "Do you own additional properties?", type: "radio", required: true, options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }], section: "Screening", questionNumber: 17, groupId: "screening" },
  hasPersonalLoans: { id: "hasPersonalLoans", title: "Do you have any personal loans?", type: "radio", required: true, options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }], section: "Screening", questionNumber: 18, groupId: "screening" },
  hasFinancialDependents: { id: "hasFinancialDependents", title: "Do you have any financial dependents?", type: "radio", required: true, options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }], section: "Screening", questionNumber: 19, groupId: "screening" },

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
  hasHomeLoan: { id: "hasHomeLoan", title: "Do you have a home loan?", type: "radio", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }], section: "Housing", questionNumber: 29, groupId: "housing" },

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

  // Continue with remaining questions using similar pattern...
  // I'll add a few more key ones for the main functionality to work

  // Vehicles
  numVehicles: { id: "numVehicles", title: "How many vehicles do you own?", type: "number", required: true, section: "Vehicles", questionNumber: 46, groupId: "vehicles" },
  vehicleType: { id: "vehicleType", title: "What type of vehicles do you own?", type: "select", options: [{ value: "Car", label: "Car" }], section: "Vehicles", questionNumber: 47, groupId: "vehicles" },
  vehicleLoan: { id: "vehicleLoan", title: "What is the total outstanding loan amount on your vehicles?", type: "number", section: "Vehicles", questionNumber: 48, groupId: "vehicles" },
  vehicleEMI: { id: "vehicleEMI", title: "What is your total monthly vehicle loan EMI?", type: "number", section: "Vehicles", questionNumber: 49, groupId: "vehicles" },
  vehicleInsurance: { id: "vehicleInsurance", title: "What is your annual vehicle insurance premium?", type: "number", section: "Vehicles", questionNumber: 50, groupId: "vehicles" },
  fuelCosts: { id: "fuelCosts", title: "What are your monthly fuel costs?", type: "number", section: "Vehicles", questionNumber: 51, groupId: "vehicles" },
  maintenanceCostsVehicle: { id: "maintenanceCostsVehicle", title: "What are your monthly vehicle maintenance costs?", type: "number", section: "Vehicles", questionNumber: 52, groupId: "vehicles" }
};

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_DEFINITIONS[id];
}

export function getQuestionsById(ids: string[]): Question[] {
  return ids.map(id => QUESTION_DEFINITIONS[id]).filter(Boolean);
}