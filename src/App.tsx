import React, { useState } from "react";
import { fetchQuestions } from "./Services/API";
import QuestionCard from "./Components/QuestionCard";
import { Difficulty, QuestionState, AnsObject } from "./Services/Utility";
import { totalmem } from "os";

const App: React.FC = () => {
  const [loding, setLoding] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnsObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TotalQuestions: number = 10;

  // console.log(questions[0].answer);

  const start = async () => {
    setLoding(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TotalQuestions, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoding(false);
  };

  const checkAnswer = (e:any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      console.log(answer);
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      //save answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((p: any) => [...p, answerObject]);
      // console.log(score);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TotalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <div className="App">
      <h1>Quiz_App</h1>
      {gameOver || userAnswer.length === TotalQuestions ? (
        <button onClick={start} className="start">
          Start Quiz{" "}
        </button>
      ) : null}

      {loding && <p>Londing...</p>}

      {!gameOver ? <p className="score">Score:{score}</p> : null}
      {!loding && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQues={TotalQuestions}
          question={questions[number].question}
          answers={questions[number].answer}
          callback={checkAnswer}
          userAns={userAnswer ? userAnswer[number] : undefined}
        />
      )}
      {!gameOver &&
      !loding &&
      userAnswer.length === number + 1 &&
      number !== TotalQuestions - 1 ? (
        <button onClick={nextQuestion} className="next">
          {" "}
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
