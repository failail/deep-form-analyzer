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
        title: 'Test Question 1',
        type: 'text',
        required: true,
        section: 'Test',
        questionNumber: 1,
        groupId: 'test'
      }
    ]
  }
];

export const QUESTIONS = QUESTION_GROUPS.flatMap(group => group.questions);