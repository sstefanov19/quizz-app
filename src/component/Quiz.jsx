import { useCallback, useState } from "react";
import complete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../question.js";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  // getting the index based on answered questions
  const activeQuestionIndex = userAnswer.length;

  const quizeComplete = activeQuestionIndex === QUESTIONS.length;

 const handleSelectedAnswer = useCallback(function handleSelectedAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  } , []);

const handleSkipAnswer = useCallback(() => 
    handleSelectedAnswer(null) , [handleSelectedAnswer]
)

  if (quizeComplete) {
    return (
      <div id="summary">
        <img src={complete} alt="quiz complete" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            timeout={10000}
            onTimeout={handleSkipAnswer}
          />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectedAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
