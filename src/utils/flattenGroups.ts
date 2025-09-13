import { QUESTION_GROUPS } from '../data/questionGroups';
import { getQuestionsById } from '../data/questions';

export const flattenGroups = (groups = QUESTION_GROUPS) => {
  const questionIds = groups.flatMap(group => group.questions);
  return getQuestionsById(questionIds);
};
