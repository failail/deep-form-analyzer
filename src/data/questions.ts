import { Question } from "../types/assessment";

export const QUESTION_DEFINITIONS: Record<string, Question> = {
  // Question 1: First question should be date of birth
  q1: { id: "q1", text: "What's your date of birth?", type: "date" },
  q2: { id: "q2", text: "What is your full name?", type: "text" },
  q3: { id: "q3", text: "What is your gender?", type: "radio", options: ["Male", "Female", "Other"] },
  q4: { id: "q4", text: "What is your marital status?", type: "radio", options: ["Single", "Married", "Divorced", "Widowed"] },
  q5: { id: "q5", text: "Which country are you from?", type: "select", options: ["India", "USA", "Canada", "UK", "Australia"] },
  q6: { id: "q6", text: "Which state/province are you from?", type: "text" },
  q7: { id: "q7", text: "Which city are you from?", type: "text" },
  q8: { id: "q8", text: "What is your citizenship status?", type: "select", options: ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"] },
  q9: { id: "q9", text: "What is your residency status?", type: "select", options: ["Resident", "Non-Resident"] },
  q10: { id: "q10", text: "What is your occupation type?", type: "select", options: ["Employed", "Self-Employed", "Business Owner", "Retired", "Student", "Unemployed"] },

  // Employment & Education (11-20)
  q11: { id: "q11", text: "What industry do you work in?", type: "select", options: ["Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Other"] },
  q12: { id: "q12", text: "What is your employment type?", type: "select", options: ["Full-time", "Part-time", "Contract", "Freelance"] },
  q13: { id: "q13", text: "How many years have you been in your current job?", type: "number" },
  q14: { id: "q14", text: "What is your highest education level?", type: "select", options: ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Professional Certification"] },
  q15: { id: "q15", text: "What is your current job title?", type: "text" },
  q16: { id: "q16", text: "Do you have any professional certifications?", type: "radio", options: ["Yes", "No"] },
  q17: { id: "q17", text: "Are you planning to change jobs in the next 2 years?", type: "radio", options: ["Yes", "No", "Maybe"] },
  q18: { id: "q18", text: "Do you have multiple sources of income?", type: "radio", options: ["Yes", "No"] },
  q19: { id: "q19", text: "Do you work remotely or from office?", type: "select", options: ["Remote", "Office", "Hybrid"] },
  q20: { id: "q20", text: "How stable do you consider your current job?", type: "select", options: ["Very Stable", "Stable", "Somewhat Stable", "Unstable"] },

  // Screening Questions (21-24)
  q21: { id: "q21", text: "Do you have children?", type: "radio", options: ["Yes", "No"] },
  q22: { id: "q22", text: "Do you own any vehicles?", type: "radio", options: ["Yes", "No"] },
  q23: { id: "q23", text: "Do you own additional properties?", type: "radio", options: ["Yes", "No"] },
  q24: { id: "q24", text: "Do you have any personal loans?", type: "radio", options: ["Yes", "No"] },

  // Housing (25-34)
  q25: { id: "q25", text: "What is your home ownership status?", type: "radio", options: ["Own", "Rent", "Living with family"] },
  q26: { id: "q26", text: "What is your monthly rent/mortgage?", type: "number" },
  q27: { id: "q27", text: "What type of residence do you live in?", type: "select", options: ["Apartment", "House", "Condo", "Townhouse"] },
  q28: { id: "q28", text: "What are your monthly utility bills?", type: "number" },
  q29: { id: "q29", text: "What are your monthly home maintenance costs?", type: "number" },
  q30: { id: "q30", text: "Do you have home insurance?", type: "radio", options: ["Yes", "No"] },
  q31: { id: "q31", text: "What is your annual home insurance premium?", type: "number" },
  q32: { id: "q32", text: "Do you pay property tax?", type: "radio", options: ["Yes", "No"] },
  q33: { id: "q33", text: "What is your annual property tax?", type: "number" },
  q34: { id: "q34", text: "Are you planning to move in the next 5 years?", type: "radio", options: ["Yes", "No", "Maybe"] },

  // Income & Assets (35-44)
  q35: { id: "q35", text: "What is your monthly salary (gross)?", type: "number" },
  q36: { id: "q36", text: "What is your monthly salary (net/take-home)?", type: "number" },
  q37: { id: "q37", text: "Do you have a spouse/partner with income?", type: "radio", options: ["Yes", "No"] },
  q38: { id: "q38", text: "What is your spouse's monthly income?", type: "number" },
  q39: { id: "q39", text: "Do you have any side income?", type: "radio", options: ["Yes", "No"] },
  q40: { id: "q40", text: "What is your monthly side income?", type: "number" },
  q41: { id: "q41", text: "What is your total cash savings?", type: "number" },
  q42: { id: "q42", text: "What is your total investment value?", type: "number" },
  q43: { id: "q43", text: "Do you own any gold or precious metals?", type: "radio", options: ["Yes", "No"] },
  q44: { id: "q44", text: "What is your total gold/precious metals value?", type: "number" },

  // Investments & Savings (45-54)
  q45: { id: "q45", text: "Do you invest in stocks/mutual funds?", type: "radio", options: ["Yes", "No"] },
  q46: { id: "q46", text: "What percentage of your income do you save?", type: "number" },
  q47: { id: "q47", text: "Do you have a retirement fund (401k, PPF, etc.)?", type: "radio", options: ["Yes", "No"] },
  q48: { id: "q48", text: "What is your retirement fund value?", type: "number" },
  q49: { id: "q49", text: "Do you invest in cryptocurrency?", type: "radio", options: ["Yes", "No"] },
  q50: { id: "q50", text: "What is your total cryptocurrency value?", type: "number" },
  q51: { id: "q51", text: "Do you have fixed deposits/bonds?", type: "radio", options: ["Yes", "No"] },
  q52: { id: "q52", text: "What is your fixed deposits/bonds value?", type: "number" },
  q53: { id: "q53", text: "Do you have an emergency fund?", type: "radio", options: ["Yes", "No"] },
  q54: { id: "q54", text: "How many months of expenses can your emergency fund cover?", type: "number" },

  // Vehicles (55-64) - Conditional on q22
  q55: { id: "q55", text: "How many vehicles do you own?", type: "number", conditional: { dependsOn: "q22", values: ["Yes"] } },
  q56: { id: "q56", text: "What type of vehicles do you own?", type: "select", options: ["Car", "Motorcycle", "Both"], conditional: { dependsOn: "q22", values: ["Yes"] } },
  q57: { id: "q57", text: "What is the total value of your vehicles?", type: "number", conditional: { dependsOn: "q22", values: ["Yes"] } },
  q58: { id: "q58", text: "Do you have vehicle loans?", type: "radio", options: ["Yes", "No"], conditional: { dependsOn: "q22", values: ["Yes"] } },
  q59: { id: "q59", text: "What is your total monthly vehicle EMI?", type: "number", conditional: { dependsOn: "q22", values: ["Yes"] } },
  q60: { id: "q60", text: "What are your monthly fuel costs?", type: "number", conditional: { dependsOn: "q22", values: ["Yes"] } },
  q61: { id: "q61", text: "What are your monthly vehicle maintenance costs?", type: "number", conditional: { dependsOn: "q22", values: ["Yes"] } },
  q62: { id: "q62", text: "What is your annual vehicle insurance premium?", type: "number", conditional: { dependsOn: "q22", values: ["Yes"] } },
  q63: { id: "q63", text: "Are you planning to buy a new vehicle?", type: "radio", options: ["Yes", "No", "Maybe"], conditional: { dependsOn: "q22", values: ["Yes"] } },
  q64: { id: "q64", text: "Do you use public transportation regularly?", type: "radio", options: ["Yes", "No"], conditional: { dependsOn: "q22", values: ["Yes"] } },

  // Additional Properties (65-74) - Conditional on q23
  q65: { id: "q65", text: "How many additional properties do you own?", type: "number", conditional: { dependsOn: "q23", values: ["Yes"] } },
  q66: { id: "q66", text: "What is the total value of your additional properties?", type: "number", conditional: { dependsOn: "q23", values: ["Yes"] } },
  q67: { id: "q67", text: "Do you have loans on these properties?", type: "radio", options: ["Yes", "No"], conditional: { dependsOn: "q23", values: ["Yes"] } },
  q68: { id: "q68", text: "What is the total outstanding loan amount?", type: "number", conditional: { dependsOn: "q23", values: ["Yes"] } },
  q69: { id: "q69", text: "Do these properties generate rental income?", type: "radio", options: ["Yes", "No"], conditional: { dependsOn: "q23", values: ["Yes"] } },
  q70: { id: "q70", text: "What is your monthly rental income?", type: "number", conditional: { dependsOn: "q23", values: ["Yes"] } },
  q71: { id: "q71", text: "What are your monthly property maintenance costs?", type: "number", conditional: { dependsOn: "q23", values: ["Yes"] } },
  q72: { id: "q72", text: "What is your annual property insurance premium?", type: "number", conditional: { dependsOn: "q23", values: ["Yes"] } },
  q73: { id: "q73", text: "Are you planning to buy more properties?", type: "radio", options: ["Yes", "No", "Maybe"], conditional: { dependsOn: "q23", values: ["Yes"] } },
  q74: { id: "q74", text: "Are you considering selling any properties?", type: "radio", options: ["Yes", "No", "Maybe"], conditional: { dependsOn: "q23", values: ["Yes"] } },

  // Children Expenses (75-84) - Conditional on q21
  q75: { id: "q75", text: "How many children do you have?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q76: { id: "q76", text: "What are the ages of your children?", type: "text", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q77: { id: "q77", text: "What are your monthly childcare costs?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q78: { id: "q78", text: "What are your monthly education costs for children?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q79: { id: "q79", text: "What are your monthly healthcare costs for children?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q80: { id: "q80", text: "What are your monthly food costs for children?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q81: { id: "q81", text: "What are your monthly clothing costs for children?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q82: { id: "q82", text: "What are your monthly entertainment costs for children?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },
  q83: { id: "q83", text: "Do you have education savings for your children?", type: "radio", options: ["Yes", "No"], conditional: { dependsOn: "q21", values: ["Yes"] } },
  q84: { id: "q84", text: "What is the value of your children's education fund?", type: "number", conditional: { dependsOn: "q21", values: ["Yes"] } },

  // Personal Loans & Debts (85-94) - Conditional on q24
  q85: { id: "q85", text: "How many personal loans do you have?", type: "number", conditional: { dependsOn: "q24", values: ["Yes"] } },
  q86: { id: "q86", text: "What is the total outstanding amount on personal loans?", type: "number", conditional: { dependsOn: "q24", values: ["Yes"] } },
  q87: { id: "q87", text: "What is your total monthly EMI for personal loans?", type: "number", conditional: { dependsOn: "q24", values: ["Yes"] } },
  q88: { id: "q88", text: "What was the primary reason for taking personal loans?", type: "select", options: ["Home renovation", "Medical expenses", "Education", "Wedding", "Business", "Other"], conditional: { dependsOn: "q24", values: ["Yes"] } },
  q89: { id: "q89", text: "Do you have credit card debt?", type: "radio", options: ["Yes", "No"], conditional: { dependsOn: "q24", values: ["Yes"] } },
  q90: { id: "q90", text: "What is your total credit card outstanding?", type: "number", conditional: { dependsOn: "q24", values: ["Yes"] } },
  q91: { id: "q91", text: "How many credit cards do you have?", type: "number", conditional: { dependsOn: "q24", values: ["Yes"] } },
  q92: { id: "q92", text: "What is your total credit limit across all cards?", type: "number", conditional: { dependsOn: "q24", values: ["Yes"] } },
  q93: { id: "q93", text: "Do you pay credit card bills in full each month?", type: "radio", options: ["Always", "Sometimes", "Rarely", "Never"], conditional: { dependsOn: "q24", values: ["Yes"] } },
  q94: { id: "q94", text: "Are you planning to consolidate your debts?", type: "radio", options: ["Yes", "No", "Considering"], conditional: { dependsOn: "q24", values: ["Yes"] } },

  // Insurance (95-104)
  q95: { id: "q95", text: "Do you have health insurance?", type: "radio", options: ["Yes", "No"] },
  q96: { id: "q96", text: "What is your health insurance coverage amount?", type: "number" },
  q97: { id: "q97", text: "What is your monthly health insurance premium?", type: "number" },
  q98: { id: "q98", text: "Do you have life insurance?", type: "radio", options: ["Yes", "No"] },
  q99: { id: "q99", text: "What is your life insurance coverage amount?", type: "number" },
  q100: { id: "q100", text: "What is your monthly life insurance premium?", type: "number" },
  q101: { id: "q101", text: "Do you have disability insurance?", type: "radio", options: ["Yes", "No"] },
  q102: { id: "q102", text: "Do you have accident insurance?", type: "radio", options: ["Yes", "No"] },
  q103: { id: "q103", text: "Are you satisfied with your current insurance coverage?", type: "radio", options: ["Yes", "No", "Partially"] },
  q104: { id: "q104", text: "Are you planning to increase your insurance coverage?", type: "radio", options: ["Yes", "No", "Maybe"] },

  // Monthly Expenses - Food & Dining (105-114)
  q105: { id: "q105", text: "What is your monthly grocery expense?", type: "number" },
  q106: { id: "q106", text: "How often do you dine out per week?", type: "number" },
  q107: { id: "q107", text: "What is your monthly dining out expense?", type: "number" },
  q108: { id: "q108", text: "Do you order food delivery regularly?", type: "radio", options: ["Yes", "No"] },
  q109: { id: "q109", text: "What is your monthly food delivery expense?", type: "number" },
  q110: { id: "q110", text: "Do you have any dietary restrictions that increase costs?", type: "radio", options: ["Yes", "No"] },
  q111: { id: "q111", text: "What is your monthly beverage expense (alcohol, coffee, etc.)?", type: "number" },
  q112: { id: "q112", text: "Do you grow your own food or have a garden?", type: "radio", options: ["Yes", "No"] },
  q113: { id: "q113", text: "What percentage of your income goes to food expenses?", type: "number" },
  q114: { id: "q114", text: "Are you planning to change your eating habits to save money?", type: "radio", options: ["Yes", "No", "Maybe"] },

  // Monthly Expenses - Transportation (115-124)
  q115: { id: "q115", text: "What is your monthly transportation cost?", type: "number" },
  q116: { id: "q116", text: "Do you use public transportation?", type: "radio", options: ["Yes", "No"] },
  q117: { id: "q117", text: "What is your monthly public transport expense?", type: "number" },
  q118: { id: "q118", text: "Do you use ride-sharing services (Uber, Lyft)?", type: "radio", options: ["Yes", "No"] },
  q119: { id: "q119", text: "What is your monthly ride-sharing expense?", type: "number" },
  q120: { id: "q120", text: "How many miles do you travel monthly for work?", type: "number" },
  q121: { id: "q121", text: "Do you get transportation allowance from work?", type: "radio", options: ["Yes", "No"] },
  q122: { id: "q122", text: "What is your monthly parking expense?", type: "number" },
  q123: { id: "q123", text: "Do you travel frequently for business?", type: "radio", options: ["Yes", "No"] },
  q124: { id: "q124", text: "Are transportation costs reimbursed by your employer?", type: "radio", options: ["Yes", "Partially", "No"] },

  // Monthly Expenses - Entertainment & Lifestyle (125-134)
  q125: { id: "q125", text: "What is your monthly entertainment budget?", type: "number" },
  q126: { id: "q126", text: "How much do you spend on streaming services monthly?", type: "number" },
  q127: { id: "q127", text: "What is your monthly gym/fitness expense?", type: "number" },
  q128: { id: "q128", text: "How much do you spend on hobbies monthly?", type: "number" },
  q129: { id: "q129", text: "What is your monthly clothing and personal care budget?", type: "number" },
  q130: { id: "q130", text: "Do you have any expensive hobbies or collections?", type: "radio", options: ["Yes", "No"] },
  q131: { id: "q131", text: "How much do you spend on vacations annually?", type: "number" },
  q132: { id: "q132", text: "What is your monthly mobile phone bill?", type: "number" },
  q133: { id: "q133", text: "Do you have any club memberships?", type: "radio", options: ["Yes", "No"] },
  q134: { id: "q134", text: "What is your monthly subscription expenses (magazines, apps, etc.)?", type: "number" },

  // Monthly Expenses - Healthcare & Wellness (135-144)
  q135: { id: "q135", text: "What is your monthly healthcare expense (excluding insurance)?", type: "number" },
  q136: { id: "q136", text: "Do you have regular medical checkups?", type: "radio", options: ["Yes", "No"] },
  q137: { id: "q137", text: "What is your monthly medicine/supplement cost?", type: "number" },
  q138: { id: "q138", text: "Do you visit a therapist or counselor regularly?", type: "radio", options: ["Yes", "No"] },
  q139: { id: "q139", text: "What is your monthly mental health expense?", type: "number" },
  q140: { id: "q140", text: "Do you have any chronic conditions requiring regular treatment?", type: "radio", options: ["Yes", "No"] },
  q141: { id: "q141", text: "What is your monthly dental care expense?", type: "number" },
  q142: { id: "q142", text: "Do you use alternative medicine or wellness services?", type: "radio", options: ["Yes", "No"] },
  q143: { id: "q143", text: "What is your monthly wellness expense (massage, spa, etc.)?", type: "number" },
  q144: { id: "q144", text: "Are you planning any major medical procedures?", type: "radio", options: ["Yes", "No", "Maybe"] },

  // Financial Goals & Planning (145-154)
  q145: { id: "q145", text: "What is your primary financial goal?", type: "select", options: ["Retirement", "Home purchase", "Children's education", "Business investment", "Debt payoff", "Emergency fund"] },
  q146: { id: "q146", text: "In how many years do you want to achieve your primary goal?", type: "number" },
  q147: { id: "q147", text: "How much money do you need for your primary goal?", type: "number" },
  q148: { id: "q148", text: "Do you have a financial advisor?", type: "radio", options: ["Yes", "No"] },
  q149: { id: "q149", text: "How often do you review your finances?", type: "select", options: ["Weekly", "Monthly", "Quarterly", "Annually", "Rarely"] },
  q150: { id: "q150", text: "What is your risk tolerance for investments?", type: "select", options: ["Conservative", "Moderate", "Aggressive"] },
  q151: { id: "q151", text: "At what age do you want to retire?", type: "number" },
  q152: { id: "q152", text: "What annual income do you want in retirement?", type: "number" },
  q153: { id: "q153", text: "Do you have a will or estate plan?", type: "radio", options: ["Yes", "No", "In progress"] },
  q154: { id: "q154", text: "Are you planning any major financial changes in the next year?", type: "radio", options: ["Yes", "No", "Maybe"] },

  // Final Questions (155-160)
  q155: { id: "q155", text: "How would you rate your current financial stress level?", type: "select", options: ["Very High", "High", "Moderate", "Low", "Very Low"] },
  q156: { id: "q156", text: "What is your biggest financial concern?", type: "select", options: ["Job security", "Debt", "Retirement savings", "Healthcare costs", "Children's future", "Market volatility"] },
  q157: { id: "q157", text: "How confident are you about your financial future?", type: "select", options: ["Very Confident", "Confident", "Neutral", "Concerned", "Very Concerned"] },
  q158: { id: "q158", text: "Would you like personalized financial advice based on this assessment?", type: "radio", options: ["Yes", "No", "Maybe"] },
  q159: { id: "q159", text: "Can we contact you with financial planning services?", type: "radio", options: ["Yes", "No"] },
  q160: { id: "q160", text: "Any additional comments about your financial situation?", type: "text" }
};

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_DEFINITIONS[id];
}

export function getQuestionsById(ids: string[]): Question[] {
  return ids.map(id => QUESTION_DEFINITIONS[id]).filter(Boolean);
}

// Export questions array for compatibility with existing code
export const questions: Question[] = Object.values(QUESTION_DEFINITIONS);