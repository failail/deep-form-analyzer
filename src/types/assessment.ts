  export interface ValidationRule {
  type: string;
  value?: any;
  message: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface ConditionalLogic {
  dependsOn: string;
  values: string[];
}

export interface Question {
  id: string;
  title: string;
  type: 'text' | 'number' | 'radio' | 'select' | 'date' | 'skip';
  required?: boolean;
  options?: Option[];
  validation?: ValidationRule[];
  conditional?: ConditionalLogic;
  section: string;
  questionNumber: number;
  groupId: string;
}

export interface QuestionGroup {
  id: string;
  name: string;
  description: string;
  questionsPerPage: number;
  questions: Question[];
  conditional?: ConditionalLogic;
}