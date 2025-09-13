import { QUESTION_GROUPS } from "../data/questionGroups";
import { QuestionGroup, Question } from "../types/assessment";
import { FormData } from "../types/assessment";
import { getQuestionsById } from "../data/questions";

const QUESTIONS_PER_PAGE = 10;

export function getVisibleGroups(formData: FormData): QuestionGroup[] {
  return QUESTION_GROUPS.filter(group => {
    if (!group.condition) return true;
    
    const { question, equals } = group.condition;
    return formData[question] === equals;
  });
}

export function getVisibleQuestions(formData: FormData): Question[] {
  const visibleGroups = getVisibleGroups(formData);
  const questionIds = visibleGroups.flatMap(group => group.questions);
  return getQuestionsById(questionIds);
}

export function getTotalPages(formData: FormData): number {
  const visibleQuestions = getVisibleQuestions(formData);
  return Math.ceil(visibleQuestions.length / QUESTIONS_PER_PAGE);
}

export function getQuestionsForPage(formData: FormData, pageIndex: number): Question[] {
  const visibleQuestions = getVisibleQuestions(formData);
  const startIndex = pageIndex * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  return visibleQuestions.slice(startIndex, endIndex);
}

export function getProgressInfo(formData: FormData, currentPage: number) {
  const visibleQuestions = getVisibleQuestions(formData);
  const totalQuestions = visibleQuestions.length;
  const totalPages = getTotalPages(formData);
  
  const startQuestionNumber = currentPage * QUESTIONS_PER_PAGE + 1;
  const endQuestionNumber = Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, totalQuestions);
  const progress = totalQuestions > 0 ? Math.round((endQuestionNumber / totalQuestions) * 100) : 0;
  
  return {
    progress,
    startQuestionNumber,
    endQuestionNumber,
    totalQuestions,
    totalPages
  };
}

export function getGroupWithQuestion(questionId: string): { group: QuestionGroup; index: number } | undefined {
  for (const group of QUESTION_GROUPS) {
    const index = group.questions.findIndex((q) => q === questionId);
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
    return group.questions[index - 1];
  }

  // Otherwise, find the last question of the previous group
  const groupIndex = QUESTION_GROUPS.findIndex((g) => g.name === group.name);
  if (groupIndex > 0) {
    const previousGroup = QUESTION_GROUPS[groupIndex - 1];
    return previousGroup.questions[previousGroup.questions.length - 1];
  }

  return null;
}

export function getNextQuestionId(questionId: string): string | null {
  const result = getGroupWithQuestion(questionId);
  if (!result) return null;

  const { group, index } = result;

  // If there's a next question in the same group, return it
  if (index < group.questions.length - 1) {
    return group.questions[index + 1];
  }

  // Otherwise, find the first question of the next group
  const groupIndex = QUESTION_GROUPS.findIndex((g) => g.name === group.name);
  if (groupIndex < QUESTION_GROUPS.length - 1) {
    const nextGroup = QUESTION_GROUPS[groupIndex + 1];
    return nextGroup.questions[0];
  }

  return null;
}