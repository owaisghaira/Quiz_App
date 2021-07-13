
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  incorrect_answers: string[];
  correct_answer: string;
  question: string;
};

export type AnsObject = {
  question: string;
  answer: string;
  correct: boolean;
  corrrectAnswer: string;
};

export type QuestionState = Question & { answer: string[] };

export const shuffle = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
