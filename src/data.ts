import { Question, Category } from './types';
import { gkQuestions } from './data/gk';
import { historyGeographyQuestions } from './data/history';
import { scienceQuestions } from './data/science';
import { currentAffairsQuestions } from './data/currentAffairs';
import { sportsQuestions } from './data/sports';
import { entertainmentQuestions } from './data/entertainment';
import { mathQuestions } from './data/math';
import { mixedQuestions } from './data/mixed';

export const CATEGORIES: Category[] = [
  'GK (India & World)',
  'History & Geography',
  'Science & Tech',
  'Current Affairs',
  'Sports',
  'Entertainment',
  'Math & Reasoning',
  'Mixed Bag'
];

export const QUESTION_BANK: Question[] = [
  ...gkQuestions,
  ...historyGeographyQuestions,
  ...scienceQuestions,
  ...currentAffairsQuestions,
  ...sportsQuestions,
  ...entertainmentQuestions,
  ...mathQuestions,
  ...mixedQuestions
];
