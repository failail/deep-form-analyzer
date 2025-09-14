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
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ],
        section: 'Test',
        questionNumber: 1,
        groupId: 'test'
      }
    ]
  }
];

export const QUESTIONS = QUESTION_GROUPS.flatMap(group => group.questions);