import { QuestionGroup } from '@/types/assessment';

export const QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: 'test',
    name: 'Test',
    description: 'Test',
    questionsPerPage: 10,
    questions: [
      {
        id: 'testQ1',
        title: 'What is your name?',
        type: 'text',
        required: true,
        section: 'TESTING - What is your name?',
        questionNumber: 1,
        groupId: 'test'
      }
    ]
  }
];

export const QUESTIONS = QUESTION_GROUPS.flatMap(group => group.questions);