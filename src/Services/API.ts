import { Difficulty, Question, shuffle } from "./Utility";

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(url)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffle([...question.incorrect_answers, question.correct_answer])
  }))
};
