export type Category = 
  | 'GK (India & World)' 
  | 'History & Geography'
  | 'Science & Tech' 
  | 'Current Affairs' 
  | 'Sports' 
  | 'Entertainment' 
  | 'Math & Reasoning' 
  | 'Mixed Bag';

export interface Question {
  id: string;
  category: Category;
  question: string;
  correctAnswer: string;
  explanation?: string;
}
