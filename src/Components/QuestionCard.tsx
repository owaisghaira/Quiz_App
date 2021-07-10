import React from "react";
import { AnsObject } from "../Services/Utility";
type props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAns: AnsObject | undefined;
  questionNr: number;
  totalQues: number;
};

const QuestionCard: React.FC<props> = ({
  question,
  answers,
  callback,
  userAns,
  questionNr,
  totalQues,
}) => {
  return (
    <>
      <p>
        Question : {questionNr} / {totalQues}
      </p>
      <div>{question}</div>
      <div>
        {/* <form onSubmit={callback}>
          {answers.map((option: string, ind: number) => {
            return (
              <div key={ind}>
                <label>
                  <input type="radio" value={option} name="option" />
                  {option}
                </label>
              </div>
            
            );
          })}
          <input type="submit" />
        </form> */}
        {answers.map((answer) => (
          <div>
            <button disabled={userAns ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionCard;
