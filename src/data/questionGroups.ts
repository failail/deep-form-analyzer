// Updated questionGroups.ts to fix conditional logic, eliminate circular dependencies, and add a Screening group

import { QuestionGroup } from "../types";
import { flattenGroups } from "../utils/flattenGroups";

export const QUESTION_GROUPS: QuestionGroup[] = [
  {
    name: "Personal Basics",
    questions: [
      "fullName",
      "dateOfBirth",
      "gender",
      "maritalStatus",
      "country",
      "state",
      "city",
      "citizenship",
      "residencyStatus",
      "occupationType",
      "industry",
      "employmentType",
      "yearsInJob",
      "educationLevel"
    ]
  },
  {
    name: "Screening",
    questions: [
      "hasChildren",
      "hasVehicles",
      "hasAdditionalProperties",
      "hasPersonalLoans",
      "hasFinancialDependents"
    ]
  },
  {
    name: "Housing",
    questions: [
      "homeOwnershipStatus",
      "monthlyRent",
      "homeLoanEMI",
      "homeLoanOutstanding",
      "homeInsurance",
      "propertyTax",
      "utilityBills",
      "homeMaintenanceCost",
      "residenceType",
      "hasHomeLoan"
    ]
  },
  {
    name: "Additional Properties",
    condition: { question: "hasAdditionalProperties", equals: true },
    questions: [
      "numPropertiesOwned",
      "propertyLocations",
      "propertyValues",
      "propertyLoans",
      "rentalIncome",
      "maintenanceCosts",
      "propertyInsurance"
    ]
  },
  {
    name: "Vehicles",
    condition: { question: "hasVehicles", equals: true },
    questions: [
      "numVehicles",
      "vehicleType",
      "vehicleLoan",
      "vehicleEMI",
      "vehicleInsurance",
      "fuelCosts",
      "maintenanceCostsVehicle"
    ]
  },
  {
    name: "Children",
    condition: { question: "hasChildren", equals: true },
    questions: [
      "numChildren",
      "childAges",
      "educationLevelChildren",
      "schoolFees",
      "tuitionCosts",
      "otherChildExpenses"
    ]
  },
  {
    name: "Financial Dependents",
    condition: { question: "hasFinancialDependents", equals: true },
    questions: [
      "numDependents",
      "dependentRelationship",
      "dependentMonthlySupport",
      "dependentInsurance"
    ]
  },
  {
    name: "Personal Loans",
    condition: { question: "hasPersonalLoans", equals: true },
    questions: [
      "numLoans",
      "loanTypes",
      "loanOutstanding",
      "loanEMIs",
      "loanInterestRates"
    ]
  },
  {
    name: "Insurance",
    questions: [
      "hasHealthInsurance",
      "healthInsuranceCoverage",
      "healthInsurancePremium",
      "hasLifeInsurance",
      "lifeInsuranceCoverage",
      "lifeInsurancePremium",
      "hasAccidentInsurance",
      "accidentInsuranceCoverage",
      "accidentInsurancePremium"
    ]
  },
  {
    name: "Expenses",
    questions: [
      "monthlyGroceries",
      "monthlyTransport",
      "monthlyDining",
      "monthlySubscriptions",
      "monthlyMedical",
      "monthlyEntertainment",
      "monthlyShopping",
      "monthlyMiscellaneous"
    ]
  },
  {
    name: "Income & Assets",
    questions: [
      "monthlySalary",
      "spouseMonthlyIncome",
      "sideIncome",
      "rentalIncomeTotal",
      "investmentIncome",
      "totalCashSavings",
      "totalInvestments",
      "totalGold",
      "cryptoHoldings"
    ]
  },
  {
    name: "Goals",
    questions: [
      "retirementAgeGoal",
      "desiredMonthlySpending",
      "childEducationGoal",
      "homePurchaseGoal",
      "vacationBudget",
      "otherFinancialGoals"
    ]
  }
];

export const QUESTIONS = flattenGroups(QUESTION_GROUPS);