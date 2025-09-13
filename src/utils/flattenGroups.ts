import { QuestionGroup, Question } from "../types/assessment";

export function flattenGroups(groups: QuestionGroup[]): Question[] {
  const seen = new Set<string>();
  const result: Question[] = [];

  for (const group of groups) {
    for (const qId of group.questions) {
      if (!seen.has(qId)) {
        result.push({ id: qId });
        seen.add(qId);
      }
    }
  }

  return result;
}