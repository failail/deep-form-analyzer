// Test scenarios for results verification

import { FormData } from '@/types/assessment';

// Scenario A - High Debt User
export const highDebtUserScenario: FormData = {
  // Basic info
  dateOfBirth: '1985-01-01',
  gender: 'Male',
  relationshipStatus: 'Single',
  workSituation: 'Full-time employed',
  country: 'India',
  city: 'Mumbai',
  currency: 'INR (Indian Rupees)',
  firstName: 'Rahul',
  
  // Housing - Renter
  housingType: 'Rent it',
  monthlyRent: 30000,
  rentalDeposit: 60000,
  additionalProperties: 'No',
  
  // No vehicles  
  ownVehicles: 'No',
  
  // No children/dependents
  hasChildren: 'No',
  otherDependents: 'No',
  
  // High debt - Personal loan
  personalLoans: 'Yes',
  numberOfPersonalLoans: 1,
  loan1Reason: 'Personal',
  loan1OriginalAmount: 600000,
  loan1OutstandingBalance: 500000,
  loan1InterestRate: 18,
  loan1MonthsToPayoff: 36,
  loan1MonthlyPayment: 15000,
  
  // Basic insurance
  healthInsurance: 'Yes',
  healthInsuranceCover: 300000,
  healthInsurancePremium: 8000,
  accidentInsurance: 'No',
  lifeInsurance: 'Yes',
  lifeInsuranceCover: 1000000,
  lifeInsurancePremium: 12000,
  otherInsurance: 'No',
  
  // High monthly expenses
  monthlyGroceriesToiletries: 15000,
  monthlyClothesShoes: 3000,
  monthlyMakeupBeauty: 1000,
  monthlyHousehelpCleaningService: 0,
  monthlyCookingGas: 800,
  monthlyElectricity: 4000,
  monthlyMobile: 1200,
  monthlyInternet: 1500,
  monthlyTV: 800,
  monthlyAppSubscriptions: 2000,
  monthlyCommute: 8000,
  monthlyPets: 0,
  monthlyEntertainment: 5000,
  monthlyHobbies: 2000,
  monthlyDiningOut: 12000,
  monthlyAlcohol: 3000,
  monthlyCigarettes: 0,
  monthlyMedication: 1000,
  monthlyHealthExams: 2000,
  
  // Annual expenses
  annualEducation: 0,
  annualHomeDecorRenovation: 40000,
  annualGadgets: 50000,
  annualMobile: 30000,
  annualHomeTravelCost: 25000,
  annualHolidays: 80000,
  annualGifts: 30000,
  
  // Minimal investments
  annualRetirementSchemes: 50000,
  monthlyMutualFunds: 2000,
  monthlyTaxSaving: 0,
  monthlySavingsDeposits: 0,
  
  // Low assets
  savingsAccountsFD: 50000,
  physicalCash: 5000,
  investmentValue: 25000,
  retirementSavings: 30000,
  jewelleryValue: 40000,
  collectiblesValue: 0,
  homeCurrentValue: 0,
  vehicleCurrentValue: 0,
  
  // Income
  jobSalary: 800000,
  secondJobIncome: 0,
  freelanceIncome: 0,
  businessIncome: 0,
  realEstateIncome: 0,
  hobbyIncome: 0,
  dividends: 0,
  familyStipend: 0,
  otherIncome: 0
};

// Scenario B - Good Financial Health User  
export const goodHealthUserScenario: FormData = {
  // Basic info
  dateOfBirth: '1988-01-01',
  gender: 'Female',
  relationshipStatus: 'Married',
  partnerAge: '31-35',
  workSituation: 'Full-time employed',
  country: 'India',
  city: 'Bangalore',
  currency: 'INR (Indian Rupees)',
  firstName: 'Priya',
  
  // Housing - Owner
  housingType: 'Own it',
  propertyPurchasePrice: 4500000,
  propertyCurrentValue: 5000000,
  propertyLoan: 'Yes',
  propertyLoanAmount: 2000000,
  propertyLoanPayment: 28000,
  propertyMaintenanceCost: 40000,
  additionalProperties: 'No',
  
  // One vehicle
  ownVehicles: 'Yes',
  numberOfVehicles: '1',
  vehicle1PurchasePrice: 800000,
  vehicle1CurrentValue: 600000,
  vehicle1Loan: 'No',
  vehicle1FuelCost: 6000,
  vehicle1InsuranceCost: 35000,
  vehicle1MaintenanceCost: 18000,
  
  // Children
  hasChildren: 'Yes',
  numberOfChildren: 1,
  child1Age: '3-5 years',
  child1Clothing: 2000,
  child1Toys: 2000,
  child1Hobbies: 1500,
  child1SchoolFees: 8000,
  child1Medical: 1000,
  child1HealthInsurance: 'Yes',
  
  // No dependents
  otherDependents: 'No',
  
  // No personal loans
  personalLoans: 'No',
  
  // Good insurance
  healthInsurance: 'Yes',
  healthInsuranceCover: 800000,
  healthInsurancePremium: 18000,
  accidentInsurance: 'Yes',
  accidentInsuranceCover: 500000,
  accidentInsurancePremium: 6000,
  lifeInsurance: 'Yes',
  lifeInsuranceCover: 2500000,
  lifeInsurancePremium: 30000,
  otherInsurance: 'No',
  
  // Partner insurance
  partnerHealthInsurance: 'Yes',
  partnerHealthInsuranceCover: 600000,
  partnerHealthInsurancePremium: 15000,
  partnerAccidentInsurance: 'No',
  partnerLifeInsurance: 'Yes',
  partnerLifeInsuranceCover: 2000000,
  partnerLifeInsurancePremium: 25000,
  
  // Reasonable monthly expenses
  monthlyGroceriesToiletries: 12000,
  monthlyClothesShoes: 3000,
  monthlyMakeupBeauty: 2000,
  monthlyHousehelpCleaningService: 8000,
  monthlyCookingGas: 1200,
  monthlyElectricity: 4500,
  monthlyMobile: 1500,
  monthlyInternet: 1500,
  monthlyTV: 1000,
  monthlyAppSubscriptions: 2500,
  monthlyCommute: 5000,
  monthlyPets: 0,
  monthlyEntertainment: 6000,
  monthlyHobbies: 3000,
  monthlyDiningOut: 10000,
  monthlyAlcohol: 2000,
  monthlyCigarettes: 0,
  monthlyMedication: 2000,
  monthlyHealthExams: 3000,
  
  // Annual expenses
  annualEducation: 80000,
  annualHomeDecorRenovation: 100000,
  annualGadgets: 80000,
  annualMobile: 40000,
  annualHomeTravelCost: 60000,
  annualHolidays: 200000,
  annualGifts: 50000,
  
  // Good investments
  annualRetirementSchemes: 200000,
  monthlyMutualFunds: 25000,
  monthlyTaxSaving: 10000,
  monthlySavingsDeposits: 15000,
  
  // Good assets
  savingsAccountsFD: 800000,
  physicalCash: 30000,
  investmentValue: 600000,
  retirementSavings: 350000,
  jewelleryValue: 200000,
  collectiblesValue: 50000,
  homeCurrentValue: 5000000,
  vehicleCurrentValue: 600000,
  
  // Income
  jobSalary: 1500000,
  secondJobIncome: 0,
  freelanceIncome: 0,
  businessIncome: 0,
  realEstateIncome: 0,
  hobbyIncome: 0,
  dividends: 25000,
  familyStipend: 0,
  otherIncome: 0
};

// Scenario C - Retirement Ready User
export const retirementReadyUserScenario: FormData = {
  // Basic info
  dateOfBirth: '1975-01-01',
  gender: 'Male',
  relationshipStatus: 'Married',
  partnerAge: '41-50',
  workSituation: 'Self-employed',
  country: 'India',
  city: 'Delhi',
  currency: 'INR (Indian Rupees)',
  firstName: 'Vikram',
  
  // Housing - Multiple properties
  housingType: 'Own it',
  propertyPurchasePrice: 6000000,
  propertyCurrentValue: 8000000,
  propertyLoan: 'Yes',
  propertyLoanAmount: 1000000,
  propertyLoanPayment: 15000,
  propertyMaintenanceCost: 60000,
  additionalProperties: 'Yes',
  numberOfAdditionalProperties: '2',
  
  // Additional Property 1
  property1PurchasePrice: 4000000,
  property1CurrentValue: 5500000,
  property1Loan: 'No',
  property1RentalIncome: 'Yes',
  property1MonthlyRental: 25000,
  property1Insurance: 'Yes',
  property1InsurancePremium: 20000,
  
  // Additional Property 2
  property2PurchasePrice: 3500000,
  property2CurrentValue: 4500000,
  property2Loan: 'No',
  property2RentalIncome: 'Yes',
  property2MonthlyRental: 20000,
  property2Insurance: 'Yes',
  property2InsurancePremium: 18000,
  
  // Multiple vehicles
  ownVehicles: 'Yes',
  numberOfVehicles: '2',
  vehicle1PurchasePrice: 1200000,
  vehicle1CurrentValue: 900000,
  vehicle1Loan: 'No',
  vehicle1FuelCost: 8000,
  vehicle1InsuranceCost: 45000,
  vehicle1MaintenanceCost: 25000,
  
  vehicle2PurchasePrice: 800000,
  vehicle2CurrentValue: 500000,
  vehicle2Loan: 'No',
  vehicle2FuelCost: 5000,
  vehicle2InsuranceCost: 30000,
  vehicle2MaintenanceCost: 15000,
  
  // Adult children
  hasChildren: 'Yes',
  numberOfChildren: 2,
  child1Age: '19+ years',
  child1Clothing: 3000,
  child1Toys: 0,
  child1Hobbies: 5000,
  child1SchoolFees: 25000, // College fees
  child1Medical: 2000,
  child1HealthInsurance: 'Yes',
  
  child2Age: '19+ years',
  child2Clothing: 3000,
  child2Toys: 0,
  child2Hobbies: 4000,
  child2SchoolFees: 20000,
  child2Medical: 2000,
  child2HealthInsurance: 'Yes',
  
  // Parents as dependents
  otherDependents: 'Yes',
  numberOfDependents: 2,
  dependent1Medical: 8000,
  dependent1Living: 15000,
  dependent1Travel: 3000,
  dependent1Entertainment: 2000,
  dependent1Miscellaneous: 2000,
  dependent1HealthInsurance: 'Yes',
  dependent1InsuranceCover: 500000,
  dependent1InsurancePremium: 15000,
  
  dependent2Medical: 7000,
  dependent2Living: 12000,
  dependent2Travel: 2000,
  dependent2Entertainment: 1500,
  dependent2Miscellaneous: 1500,
  dependent2HealthInsurance: 'Yes',
  dependent2InsuranceCover: 400000,
  dependent2InsurancePremium: 12000,
  
  // No personal loans
  personalLoans: 'No',
  
  // Comprehensive insurance
  healthInsurance: 'Yes',
  healthInsuranceCover: 1500000,
  healthInsurancePremium: 35000,
  accidentInsurance: 'Yes',
  accidentInsuranceCover: 1000000,
  accidentInsurancePremium: 12000,
  lifeInsurance: 'Yes',
  lifeInsuranceCover: 5000000,
  lifeInsurancePremium: 60000,
  otherInsurance: 'Yes',
  
  // Partner insurance
  partnerHealthInsurance: 'Yes',
  partnerHealthInsuranceCover: 1200000,
  partnerHealthInsurancePremium: 30000,
  partnerAccidentInsurance: 'Yes',
  partnerAccidentInsuranceCover: 800000,
  partnerAccidentInsurancePremium: 10000,
  partnerLifeInsurance: 'Yes',
  partnerLifeInsuranceCover: 4000000,
  partnerLifeInsurancePremium: 50000,
  
  // Low monthly expenses (lifestyle inflation controlled)
  monthlyGroceriesToiletries: 15000,
  monthlyClothesShoes: 4000,
  monthlyMakeupBeauty: 2000,
  monthlyHousehelpCleaningService: 12000,
  monthlyCookingGas: 1500,
  monthlyElectricity: 6000,
  monthlyMobile: 2000,
  monthlyInternet: 2000,
  monthlyTV: 1500,
  monthlyAppSubscriptions: 3000,
  monthlyCommute: 6000,
  monthlyPets: 2000,
  monthlyEntertainment: 8000,
  monthlyHobbies: 5000,
  monthlyDiningOut: 15000,
  monthlyAlcohol: 3000,
  monthlyCigarettes: 0,
  monthlyMedication: 3000,
  monthlyHealthExams: 5000,
  
  // Annual expenses
  annualEducation: 150000,
  annualHomeDecorRenovation: 200000,
  annualGadgets: 120000,
  annualMobile: 60000,
  annualHomeTravelCost: 100000,
  annualHolidays: 400000,
  annualGifts: 100000,
  
  // High investments
  annualRetirementSchemes: 500000,
  monthlyMutualFunds: 50000,
  monthlyTaxSaving: 25000,
  monthlySavingsDeposits: 30000,
  
  // High assets
  savingsAccountsFD: 2500000,
  physicalCash: 50000,
  investmentValue: 3500000,
  retirementSavings: 1500000,
  jewelleryValue: 800000,
  collectiblesValue: 300000,
  homeCurrentValue: 8000000,
  vehicleCurrentValue: 1400000,
  
  // High income
  jobSalary: 2000000,
  secondJobIncome: 0,
  freelanceIncome: 300000,
  businessIncome: 400000,
  realEstateIncome: 540000, // (25000 + 20000) * 12
  hobbyIncome: 0,
  dividends: 100000,
  familyStipend: 0,
  otherIncome: 150000
};