import { Category, Question } from './types';

export function createQuestions(category: Category, prefix: string, pairs: [string, string][]): Question[] {
  return pairs.map((p, i) => ({
    id: `${prefix}-${i + 1}`,
    category,
    question: p[0],
    correctAnswer: p[1]
  }));
}
