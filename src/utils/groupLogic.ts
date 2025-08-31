import { QuestionGroup, FormData, Question } from '@/types/assessment';
import { QUESTION_GROUPS } from '@/data/questionGroups';

export const getVisibleGroups = (formData: FormData): QuestionGroup[] => {
  return QUESTION_GROUPS.filter(group => {
    if (!group.conditional) return true;
    
    const dependentValue = formData[group.conditional.dependsOn];
    return group.conditional.values.includes(dependentValue);
  });
};

export const getVisibleQuestions = (formData: FormData): Question[] => {
  const visibleGroups = getVisibleGroups(formData);
  
  return visibleGroups.flatMap(group => 
    group.questions.filter(question => {
      if (question.type === 'skip') return false;
      if (!question.conditional) return true;
      
      const dependentValue = formData[question.conditional.dependsOn];
      return question.conditional.values.includes(dependentValue);
    })
  );
};

export const getQuestionsForPage = (formData: FormData, pageIndex: number): Question[] => {
  const visibleGroups = getVisibleGroups(formData);
  const questionsPerPage = 10;
  
  // Get all questions with proper filtering
  const allQuestions = visibleGroups.flatMap(group => 
    group.questions.filter(question => {
      if (question.type === 'skip') return false;
      if (!question.conditional) return true;
      
      const dependentValue = formData[question.conditional.dependsOn];
      return question.conditional.values.includes(dependentValue);
    })
  );
  
  const startIndex = pageIndex * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  
  return allQuestions.slice(startIndex, endIndex);
};

export const getTotalPages = (formData: FormData): number => {
  const visibleQuestions = getVisibleQuestions(formData);
  return Math.ceil(visibleQuestions.length / 10);
};

export const getProgressInfo = (formData: FormData, currentPage: number) => {
  const visibleQuestions = getVisibleQuestions(formData);
  const questionsPerPage = 10;
  
  const totalQuestions = visibleQuestions.length;
  const completedQuestions = Math.min(currentPage * questionsPerPage, totalQuestions);
  const progress = Math.round((completedQuestions / totalQuestions) * 100);
  
  const currentPageQuestions = getQuestionsForPage(formData, currentPage);
  const startQuestionNumber = completedQuestions + 1;
  const endQuestionNumber = completedQuestions + currentPageQuestions.length;
  
  return {
    progress,
    startQuestionNumber,
    endQuestionNumber,
    totalQuestions,
    currentPageQuestions
  };
};