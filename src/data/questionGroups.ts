import { QuestionGroup } from '../types/assessment';
import { QUESTION_DEFINITIONS } from './questions';

export const QUESTION_GROUPS: QuestionGroup[] = [
  // GROUP 1: PERSONAL BASICS (Questions 1-10)
  {
    id: 'personal-basics',
    name: 'Personal Basics',
    description: 'Basic personal information',
    questionsPerPage: 10,
    questions: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 2: EMPLOYMENT & EDUCATION (Questions 11-20)
  {
    id: 'employment-education',
    name: 'Employment & Education',
    description: 'Employment and education information',
    questionsPerPage: 10,
    questions: ['q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 3: SCREENING QUESTIONS (Questions 21-24 + Housing start 25-30)
  {
    id: 'screening-questions',
    name: 'Screening Questions',
    description: 'Quick screening to determine applicable sections',
    questionsPerPage: 10,
    questions: ['q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 4: HOUSING CONTINUED (Questions 31-34 + Income start 35-40)
  {
    id: 'housing-income',
    name: 'Housing & Income',
    description: 'Housing expenses and income sources',
    questionsPerPage: 10,
    questions: ['q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37', 'q38', 'q39', 'q40'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 5: ASSETS & INVESTMENTS (Questions 41-50)
  {
    id: 'assets-investments',
    name: 'Assets & Investments',
    description: 'Assets and investment information',
    questionsPerPage: 10,
    questions: ['q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47', 'q48', 'q49', 'q50'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 6: SAVINGS & EMERGENCY FUND (Questions 51-54 + Vehicles 55-60)
  {
    id: 'savings-vehicles',
    name: 'Savings & Vehicles',
    description: 'Savings strategy and vehicle expenses',
    questionsPerPage: 10,
    questions: ['q51', 'q52', 'q53', 'q54', 'q55', 'q56', 'q57', 'q58', 'q59', 'q60'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 7: VEHICLES CONTINUED (Questions 61-64 + Properties 65-70)
  {
    id: 'vehicles-properties',
    name: 'Vehicles & Properties',
    description: 'Vehicle and property ownership',
    questionsPerPage: 10,
    questions: ['q61', 'q62', 'q63', 'q64', 'q65', 'q66', 'q67', 'q68', 'q69', 'q70'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 8: PROPERTIES CONTINUED (Questions 71-74 + Children 75-80)
  {
    id: 'properties-children',
    name: 'Properties & Children',
    description: 'Property management and children expenses',
    questionsPerPage: 10,
    questions: ['q71', 'q72', 'q73', 'q74', 'q75', 'q76', 'q77', 'q78', 'q79', 'q80'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 9: CHILDREN CONTINUED (Questions 81-84 + Loans 85-90)
  {
    id: 'children-loans',
    name: 'Children & Loans',
    description: 'Children planning and loan management',
    questionsPerPage: 10,
    questions: ['q81', 'q82', 'q83', 'q84', 'q85', 'q86', 'q87', 'q88', 'q89', 'q90'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 10: LOANS CONTINUED (Questions 91-94 + Insurance 95-100)
  {
    id: 'loans-insurance',
    name: 'Loans & Insurance',
    description: 'Debt management and insurance coverage',
    questionsPerPage: 10,
    questions: ['q91', 'q92', 'q93', 'q94', 'q95', 'q96', 'q97', 'q98', 'q99', 'q100'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 11: INSURANCE CONTINUED (Questions 101-104 + Food 105-110)
  {
    id: 'insurance-food',
    name: 'Insurance & Food Expenses',
    description: 'Insurance planning and food expenses',
    questionsPerPage: 10,
    questions: ['q101', 'q102', 'q103', 'q104', 'q105', 'q106', 'q107', 'q108', 'q109', 'q110'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 12: FOOD CONTINUED (Questions 111-114 + Transportation 115-120)
  {
    id: 'food-transportation',
    name: 'Food & Transportation',
    description: 'Food and transportation expenses',
    questionsPerPage: 10,
    questions: ['q111', 'q112', 'q113', 'q114', 'q115', 'q116', 'q117', 'q118', 'q119', 'q120'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 13: TRANSPORTATION CONTINUED (Questions 121-124 + Entertainment 125-130)
  {
    id: 'transportation-entertainment',
    name: 'Transportation & Entertainment',
    description: 'Transportation and entertainment expenses',
    questionsPerPage: 10,
    questions: ['q121', 'q122', 'q123', 'q124', 'q125', 'q126', 'q127', 'q128', 'q129', 'q130'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 14: ENTERTAINMENT CONTINUED (Questions 131-134 + Healthcare 135-140)
  {
    id: 'entertainment-healthcare',
    name: 'Entertainment & Healthcare',
    description: 'Lifestyle and healthcare expenses',
    questionsPerPage: 10,
    questions: ['q131', 'q132', 'q133', 'q134', 'q135', 'q136', 'q137', 'q138', 'q139', 'q140'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 15: HEALTHCARE CONTINUED (Questions 141-144 + Financial Goals 145-150)
  {
    id: 'healthcare-goals',
    name: 'Healthcare & Financial Goals',
    description: 'Healthcare planning and financial goals',
    questionsPerPage: 10,
    questions: ['q141', 'q142', 'q143', 'q144', 'q145', 'q146', 'q147', 'q148', 'q149', 'q150'].map(id => QUESTION_DEFINITIONS[id])
  },

  // GROUP 16: FINANCIAL PLANNING & FINAL (Questions 151-160)
  {
    id: 'financial-planning',
    name: 'Financial Planning & Final Questions',
    description: 'Financial planning and assessment conclusion',
    questionsPerPage: 10,
    questions: ['q151', 'q152', 'q153', 'q154', 'q155', 'q156', 'q157', 'q158', 'q159', 'q160'].map(id => QUESTION_DEFINITIONS[id])
  }
];

// Legacy export for compatibility
export const questionGroups = QUESTION_GROUPS;