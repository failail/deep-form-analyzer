export interface QuestionGroup {
  id: string;
  name: string;
  description: string;
  questionsPerPage: number;
  questions: Question[];           // ← Change from string[] to Question[]
  conditional?: ConditionalLogic;  // ← Change from condition? to conditional?
}