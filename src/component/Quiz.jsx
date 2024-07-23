import { useCallback, useRef, useState } from "react";
import complete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../question.js";

export default function Quiz() {
    const shuffledAnswers = useRef();
    const [answerState, setAnswerState] = useState("");
    const [userAnswer, setUserAnswer] = useState([]);
  
  // getting the index based on answered questions
  const activeQuestionIndex =
    answerState === "" ? userAnswer.length : userAnswer.length - 1;
  const quizeComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevUserAnswer) => {
        return [...prevUserAnswer , selectedAnswer]
    })

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  if (quizeComplete) {
    return (
      <div id="summary">
        <img src={complete} alt="quiz complete" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }
  if(!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  
  return (
    <>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={10000}
            onTimeout={handleSkipAnswer}
          />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => {
              const isSelected = userAnswer[userAnswer.length - 1] === answer;
              let cssClasses = "";

              if (answerState === "answered" && isSelected) {
                cssClasses = "selected";
              }
              if (
                (answerState === "correct" || answerState === "wrong") &&
                isSelected
              ) {
                cssClasses = answerState;
              }

              return (
                <li key={answer} className="answer">
                  <button
                    onClick={() => handleSelectedAnswer(answer)}
                    className={cssClasses}
                  >
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
