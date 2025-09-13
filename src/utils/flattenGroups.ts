import { QUESTION_GROUPS } from '../data/questionGroups';

export const flattenGroups = (groups = QUESTION_GROUPS) => {
  return groups.flatMap(group => group.questions);
};
