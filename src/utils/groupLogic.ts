import { questionGroups } from "../data/questionGroups";
import { questions } from "../data/questions";
import { QuestionGroup, Question, FormData } from "../types/assessment";

const QUESTIONS_PER_PAGE = 10;

export function getVisibleGroups(formData: FormData): QuestionGroup[] {
  return questionGroups.filter(group => {
    // If no conditional, group is always visible
    if (!group.conditional) return true;
    
    // Check group-level conditional
    const { dependsOn, values } = group.conditional;
    const response = formData[dependsOn];
    return response && values.includes(response);
  });
}

export function getVisibleQuestions(formData: FormData): Question[] {
  const visibleGroups = getVisibleGroups(formData);
  const allQuestions: Question[] = [];
  
  visibleGroups.forEach(group => {
    group.questions.forEach(question => {
      // Check individual question conditionals
      if (!question.conditional) {
        allQuestions.push(question);
        return;
      }
      
      const { dependsOn, values } = question.conditional;
      const response = formData[dependsOn];
      
      if (response && values.includes(response)) {
        allQuestions.push(question);
      }
    });
  });
  
  // Filter out skip questions for display
  return allQuestions.filter(q => q.type !== 'skip');
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
  for (const group of questionGroups) {
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
  const groupIndex = questionGroups.findIndex((g) => g.id === group.id);
  if (groupIndex > 0) {
    const previousGroup = questionGroups[groupIndex - 1];
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
  const groupIndex = questionGroups.findIndex((g) => g.id === group.id);
  if (groupIndex < questionGroups.length - 1) {
    const nextGroup = questionGroups[groupIndex + 1];
    return nextGroup.questions[0].id;
  }

  return null;
}