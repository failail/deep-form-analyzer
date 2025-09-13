export interface Question {
  id: string;
}

export interface ConditionalLogic {
  question: string;
  equals: string | number | boolean;
}

export interface QuestionGroup {
  name: string;
  questions: string[];
  condition?: ConditionalLogic;
}