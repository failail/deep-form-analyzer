import { QUESTION_GROUPS } from "../data/questionGroups";
import { QuestionGroup } from "../types";

export function getGroupWithQuestion(questionId: string): { group: QuestionGroup; index: number } | undefined {
  for (const group of QUESTION_GROUPS) {
    const index = group.questions.findIndex((q) => q.id === questionId);
    if (index !== -1) {
      return { group, index };
    }
  }
  return undefined;
}

export function getPreviousQuestionId(questionId: string): string | null {
  const result = getGroupWithQuestion(questionId);
  if (!result) return null;

  const { group, index } = result;

  // If there's a previous question in the same group, return it
  if (index > 0) {
    return group.questions[index - 1].id;
  }

  // Otherwise, find the last question of the previous group
  const groupIndex = QUESTION_GROUPS.findIndex((g) => g.id === group.id);
  if (groupIndex > 0) {
    const previousGroup = QUESTION_GROUPS[groupIndex - 1];
    return previousGroup.questions[previousGroup.questions.length - 1].id;
  }

  return null;
}

export function getNextQuestionId(questionId: string): string | null {
  const result = getGroupWithQuestion(questionId);
  if (!result) return null;

  const { group, index } = result;

  // If there's a next question in the same group, return it
  if (index < group.questions.length - 1) {
    return group.questions[index + 1].id;
  }

  // Otherwise, find the first question of the next group
  const groupIndex = QUESTION_GROUPS.findIndex((g) => g.id === group.id);
  if (groupIndex < QUESTION_GROUPS.length - 1) {
    const nextGroup = QUESTION_GROUPS[groupIndex + 1];
    return nextGroup.questions[0].id;
  }

  return null;
}