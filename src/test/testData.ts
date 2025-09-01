import { FormData } from '@/types/assessment'

export const minimalUserData: FormData = {
  // Personal basics
  dateOfBirth: '1990-01-01',
  gender: 'Male',
  relationshipStatus: 'Single',
  workSituation: 'Full-time employed',
  industry: 'Technology',
  jobFunction: 'Engineering/Technical',
  smoker: 'No',
  retirementAge: 60,
  country: 'India',
  city: 'Mumbai',
  currency: 'INR (Indian Rupees)',
  firstName: 'John',
  
  // Housing - Renter
  housingType: 'Rent it',
  monthlyRent: 25000,
  rentalDeposit: 50000,
  additionalProperties: 'No',
  
  // No vehicles
  ownVehicles: 'No',
  
  // No children
  hasChildren: 'No',
  
  // No dependents
  otherDependents: 'No',
  
  // No personal loans
  personalLoans: 'No',
  
  // Basic insurance
  healthInsurance: 'Yes',
  healthInsuranceCover: 500000,
  healthInsurancePremium: 12000,
  accidentInsurance: 'No',
  lifeInsurance: 'Yes',
  lifeInsuranceCover: 1000000,
  lifeInsurancePremium: 15000,
  otherInsurance: 'No',
  
  // Monthly expenses
  monthlyGroceries: 8000,
  monthlyClothes: 2000,
  monthlyMakeup: 500,
  monthlyBeauty: 1000,
  monthlyHousehelp: 5000,
  monthlyCookingGas: 800,
  monthlyElectricity: 3000,
  monthlyMobile: 500,
  monthlyInternet: 1000,
  monthlyTV: 500,
  monthlyAppSubscriptions: 1000,
  monthlyCommute: 3000,
  monthlyPets: 0,
  monthlyEntertainment: 2000,
  monthlyHobbies: 1500,
  monthlyEatingOut: 5000,
  monthlyAlcohol: 1000,
  monthlyCigarettes: 0,
  monthlyMedication: 1000,
  monthlyHealthExams: 2000,
  
  // Annual expenses
  annualEducation: 0,
  annualHomeDecor: 50000,
  annualGadgets: 30000,
  annualMobile: 25000,
  annualHomeTravelCost: 20000,
  annualHolidays: 100000,
  annualGifts: 25000,
  
  // Investments
  annualRetirementSchemes: 150000,
  monthlyMutualFunds: 10000,
  monthlyTaxSaving: 5000,
  monthlySavingsDeposits: 15000,
  
  // Assets
  savingsAndDeposits: 500000,
  physicalCash: 10000,
  stocksAndInvestments: 200000,
  retirementSavings: 100000,
  jewelleryValue: 100000,
  collectiblesValue: 0,
  totalHomesValue: 0,
  totalVehiclesValue: 0,
  
  // Income
  jobSalary: 1200000,
  secondJobIncome: 0,
  freelanceIncome: 0,
  businessIncome: 0,
  realEstateIncome: 0,
  hobbyIncome: 0,
  dividends: 5000,
  familyStipend: 0,
  otherIncome: 0
}

export const maximumUserData: FormData = {
  // Personal basics
  dateOfBirth: '1985-01-01',
  gender: 'Male',
  relationshipStatus: 'Married',
  partnerAge: '31-35',
  workSituation: 'Self-employed',
  industry: 'Technology',
  jobFunction: 'Management/Leadership',
  smoker: 'Yes',
  retirementAge: 55,
  country: 'India',
  city: 'Bangalore',
  currency: 'INR (Indian Rupees)',
  firstName: 'Rajesh',
  
  // Housing - Owner with loan
  housingType: 'Own it',
  propertyPurchasePrice: 5000000,
  propertyCurrentValue: 7000000,
  propertyLoan: 'Yes',
  propertyLoanAmount: 2000000,
  propertyLoanPayment: 35000,
  propertyMaintenanceCost: 50000,
  additionalProperties: 'Yes',
  numberOfAdditionalProperties: '3',
  
  // Additional Property 1
  property1PurchasePrice: 3000000,
  property1CurrentValue: 4000000,
  property1Loan: 'Yes',
  property1LoanAmount: 1500000,
  property1LoanPayment: 25000,
  property1RentalIncome: 'Yes',
  property1MonthlyRental: 20000,
  property1Insurance: 'Yes',
  property1InsurancePremium: 15000,
  
  // Additional Property 2
  property2PurchasePrice: 2500000,
  property2CurrentValue: 3200000,
  property2Loan: 'No',
  property2RentalIncome: 'Yes',
  property2MonthlyRental: 18000,
  property2Insurance: 'Yes',
  property2InsurancePremium: 12000,
  
  // Additional Property 3
  property3PurchasePrice: 4000000,
  property3CurrentValue: 5000000,
  property3Loan: 'Yes',
  property3LoanAmount: 2000000,
  property3LoanPayment: 30000,
  property3RentalIncome: 'No',
  property3Insurance: 'Yes',
  property3InsurancePremium: 18000,
  
  // Vehicles - 4 vehicles
  ownVehicles: 'Yes',
  numberOfVehicles: '4',
  
  // Vehicle 1
  vehicle1PurchasePrice: 1500000,
  vehicle1CurrentValue: 800000,
  vehicle1Loan: 'Yes',
  vehicle1LoanAmount: 500000,
  vehicle1LoanPayment: 25000,
  vehicle1FuelCost: 8000,
  vehicle1InsuranceCost: 50000,
  vehicle1MaintenanceCost: 25000,
  
  // Vehicle 2
  vehicle2PurchasePrice: 800000,
  vehicle2CurrentValue: 400000,
  vehicle2Loan: 'No',
  vehicle2FuelCost: 5000,
  vehicle2InsuranceCost: 30000,
  vehicle2MaintenanceCost: 15000,
  
  // Vehicle 3
  vehicle3PurchasePrice: 600000,
  vehicle3CurrentValue: 350000,
  vehicle3Loan: 'Yes',
  vehicle3LoanAmount: 200000,
  vehicle3LoanPayment: 12000,
  vehicle3FuelCost: 4000,
  vehicle3InsuranceCost: 25000,
  vehicle3MaintenanceCost: 12000,
  
  // Vehicle 4
  vehicle4PurchasePrice: 400000,
  vehicle4CurrentValue: 200000,
  vehicle4Loan: 'No',
  vehicle4FuelCost: 3000,
  vehicle4InsuranceCost: 20000,
  vehicle4MaintenanceCost: 10000,
  
  // Children - 3 children
  hasChildren: 'Yes',
  numberOfChildren: 3,
  
  // Child 1
  child1Age: '13-18 years',
  child1Clothing: 3000,
  child1Toys: 2000,
  child1Hobbies: 5000,
  child1SchoolFees: 15000,
  child1Medical: 2000,
  child1HealthInsurance: 'Yes',
  
  // Child 2
  child2Age: '6-12 years',
  child2Clothing: 2500,
  child2Toys: 3000,
  child2Hobbies: 3000,
  child2SchoolFees: 12000,
  child2Medical: 1500,
  child2HealthInsurance: 'Yes',
  
  // Child 3
  child3Age: '3-5 years',
  child3Clothing: 2000,
  child3Toys: 2500,
  child3Hobbies: 2000,
  child3SchoolFees: 8000,
  child3Medical: 1000,
  child3HealthInsurance: 'Yes',
  
  // Dependents - 2 dependents
  otherDependents: 'Yes',
  numberOfDependents: 2,
  
  // Dependent 1
  dependent1Medical: 5000,
  dependent1Living: 15000,
  dependent1Travel: 2000,
  dependent1Entertainment: 3000,
  dependent1Miscellaneous: 2000,
  dependent1HealthInsurance: 'Yes',
  dependent1InsuranceCover: 300000,
  dependent1InsurancePremium: 8000,
  
  // Dependent 2
  dependent2Medical: 4000,
  dependent2Living: 12000,
  dependent2Travel: 1500,
  dependent2Entertainment: 2000,
  dependent2Miscellaneous: 1500,
  dependent2HealthInsurance: 'Yes',
  dependent2InsuranceCover: 250000,
  dependent2InsurancePremium: 7000,
  
  // Personal loans - 5 loans
  personalLoans: 'Yes',
  numberOfPersonalLoans: 5,
  
  // Loan 1
  loan1Reason: 'Business',
  loan1OriginalAmount: 500000,
  loan1OutstandingBalance: 300000,
  loan1InterestRate: 15,
  loan1MonthsToPayoff: 24,
  loan1MonthlyPayment: 15000,
  
  // Loan 2
  loan2Reason: 'Wedding',
  loan2OriginalAmount: 300000,
  loan2OutstandingBalance: 150000,
  loan2InterestRate: 18,
  loan2MonthsToPayoff: 12,
  loan2MonthlyPayment: 14000,
  
  // Loan 3
  loan3Reason: 'Education',
  loan3OriginalAmount: 200000,
  loan3OutstandingBalance: 100000,
  loan3InterestRate: 12,
  loan3MonthsToPayoff: 10,
  loan3MonthlyPayment: 11000,
  
  // Loan 4
  loan4Reason: 'Medical expenses',
  loan4OriginalAmount: 150000,
  loan4OutstandingBalance: 80000,
  loan4InterestRate: 16,
  loan4MonthsToPayoff: 8,
  loan4MonthlyPayment: 11000,
  
  // Loan 5
  loan5Reason: 'Emergency',
  loan5OriginalAmount: 100000,
  loan5OutstandingBalance: 50000,
  loan5InterestRate: 20,
  loan5MonthsToPayoff: 6,
  loan5MonthlyPayment: 9000,
  
  // Insurance (self and partner)
  healthInsurance: 'Yes',
  healthInsuranceCover: 1000000,
  healthInsurancePremium: 25000,
  accidentInsurance: 'Yes',
  accidentInsuranceCover: 1000000,
  accidentInsurancePremium: 8000,
  lifeInsurance: 'Yes',
  lifeInsuranceCover: 5000000,
  lifeInsurancePremium: 50000,
  otherInsurance: 'Yes',
  
  // Partner insurance
  partnerHealthInsurance: 'Yes',
  partnerHealthInsuranceCover: 800000,
  partnerHealthInsurancePremium: 20000,
  partnerAccidentInsurance: 'Yes',
  partnerAccidentInsuranceCover: 800000,
  partnerAccidentInsurancePremium: 6000,
  partnerLifeInsurance: 'Yes',
  partnerLifeInsuranceCover: 3000000,
  partnerLifeInsurancePremium: 35000,
  
  // Monthly expenses
  monthlyGroceries: 15000,
  monthlyClothes: 5000,
  monthlyMakeup: 2000,
  monthlyBeauty: 3000,
  monthlyHousehelp: 10000,
  monthlyCookingGas: 1500,
  monthlyElectricity: 5000,
  monthlyMobile: 2000,
  monthlyInternet: 2000,
  monthlyTV: 1500,
  monthlyAppSubscriptions: 3000,
  monthlyCommute: 8000,
  monthlyPets: 3000,
  monthlyEntertainment: 10000,
  monthlyHobbies: 5000,
  monthlyEatingOut: 15000,
  monthlyAlcohol: 5000,
  monthlyCigarettes: 3000,
  monthlyMedication: 3000,
  monthlyHealthExams: 5000,
  
  // Annual expenses
  annualEducation: 200000,
  annualHomeDecor: 150000,
  annualGadgets: 100000,
  annualMobile: 80000,
  annualHomeTravelCost: 100000,
  annualHolidays: 500000,
  annualGifts: 100000,
  
  // Investments
  annualRetirementSchemes: 500000,
  monthlyMutualFunds: 50000,
  monthlyTaxSaving: 20000,
  monthlySavingsDeposits: 30000,
  
  // Assets
  savingsAndDeposits: 2000000,
  physicalCash: 50000,
  stocksAndInvestments: 1500000,
  retirementSavings: 800000,
  jewelleryValue: 500000,
  collectiblesValue: 200000,
  totalHomesValue: 19200000,
  totalVehiclesValue: 1750000,
  
  // Income
  jobSalary: 3000000,
  secondJobIncome: 500000,
  freelanceIncome: 300000,
  businessIncome: 800000,
  realEstateIncome: 672000, // (20000 + 18000) * 12 + other property income
  hobbyIncome: 100000,
  dividends: 50000,
  familyStipend: 0,
  otherIncome: 100000
}

export const typicalUserData: FormData = {
  // Personal basics
  dateOfBirth: '1988-01-01',
  gender: 'Female',
  relationshipStatus: 'Married',
  partnerAge: '31-35',
  workSituation: 'Full-time employed',
  industry: 'Finance & Banking',
  jobFunction: 'Finance & Accounting',
  smoker: 'No',
  retirementAge: 60,
  country: 'India',
  city: 'Delhi',
  currency: 'INR (Indian Rupees)',
  firstName: 'Priya',
  
  // Housing - Owner
  housingType: 'Own it',
  propertyPurchasePrice: 4000000,
  propertyCurrentValue: 5500000,
  propertyLoan: 'Yes',
  propertyLoanAmount: 1800000,
  propertyLoanPayment: 32000,
  propertyMaintenanceCost: 40000,
  additionalProperties: 'No',
  
  // Vehicles - 1 vehicle
  ownVehicles: 'Yes',
  numberOfVehicles: '1',
  vehicle1PurchasePrice: 800000,
  vehicle1CurrentValue: 500000,
  vehicle1Loan: 'Yes',
  vehicle1LoanAmount: 300000,
  vehicle1LoanPayment: 18000,
  vehicle1FuelCost: 6000,
  vehicle1InsuranceCost: 35000,
  vehicle1MaintenanceCost: 20000,
  
  // Children - 2 children
  hasChildren: 'Yes',
  numberOfChildren: 2,
  
  // Child 1
  child1Age: '6-12 years',
  child1Clothing: 2500,
  child1Toys: 2000,
  child1Hobbies: 3000,
  child1SchoolFees: 10000,
  child1Medical: 1500,
  child1HealthInsurance: 'Yes',
  
  // Child 2
  child2Age: '3-5 years',
  child2Clothing: 2000,
  child2Toys: 2500,
  child2Hobbies: 2000,
  child2SchoolFees: 8000,
  child2Medical: 1000,
  child2HealthInsurance: 'Yes',
  
  // No dependents
  otherDependents: 'No',
  
  // Personal loans - 1 loan
  personalLoans: 'Yes',
  numberOfPersonalLoans: 1,
  loan1Reason: 'Personal',
  loan1OriginalAmount: 200000,
  loan1OutstandingBalance: 120000,
  loan1InterestRate: 14,
  loan1MonthsToPayoff: 18,
  loan1MonthlyPayment: 8000,
  
  // Insurance
  healthInsurance: 'Yes',
  healthInsuranceCover: 800000,
  healthInsurancePremium: 18000,
  accidentInsurance: 'No',
  lifeInsurance: 'Yes',
  lifeInsuranceCover: 2000000,
  lifeInsurancePremium: 25000,
  otherInsurance: 'No',
  
  // Partner insurance
  partnerHealthInsurance: 'Yes',
  partnerHealthInsuranceCover: 600000,
  partnerHealthInsurancePremium: 15000,
  partnerAccidentInsurance: 'No',
  partnerLifeInsurance: 'Yes',
  partnerLifeInsuranceCover: 1500000,
  partnerLifeInsurancePremium: 20000,
  
  // Monthly expenses
  monthlyGroceries: 12000,
  monthlyClothes: 3000,
  monthlyMakeup: 1500,
  monthlyBeauty: 2000,
  monthlyHousehelp: 8000,
  monthlyCookingGas: 1200,
  monthlyElectricity: 4000,
  monthlyMobile: 1200,
  monthlyInternet: 1500,
  monthlyTV: 800,
  monthlyAppSubscriptions: 2000,
  monthlyCommute: 5000,
  monthlyPets: 0,
  monthlyEntertainment: 5000,
  monthlyHobbies: 3000,
  monthlyEatingOut: 8000,
  monthlyAlcohol: 2000,
  monthlyCigarettes: 0,
  monthlyMedication: 2000,
  monthlyHealthExams: 3000,
  
  // Annual expenses
  annualEducation: 50000,
  annualHomeDecor: 80000,
  annualGadgets: 60000,
  annualMobile: 40000,
  annualHomeTravelCost: 60000,
  annualHolidays: 200000,
  annualGifts: 50000,
  
  // Investments
  annualRetirementSchemes: 250000,
  monthlyMutualFunds: 25000,
  monthlyTaxSaving: 10000,
  monthlySavingsDeposits: 20000,
  
  // Assets
  savingsAndDeposits: 800000,
  physicalCash: 20000,
  stocksAndInvestments: 600000,
  retirementSavings: 300000,
  jewelleryValue: 200000,
  collectiblesValue: 50000,
  totalHomesValue: 5500000,
  totalVehiclesValue: 500000,
  
  // Income
  jobSalary: 1800000,
  secondJobIncome: 0,
  freelanceIncome: 100000,
  businessIncome: 0,
  realEstateIncome: 0,
  hobbyIncome: 0,
  dividends: 20000,
  familyStipend: 0,
  otherIncome: 0
}