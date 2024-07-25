import { useCallback, useState } from "react";
import complete from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
import QUESTIONS from "../question.js";
import Summary from "./Sumary.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  // getting the index based on answered questions
  const activeQuestionIndex = userAnswer.length;
  const quizeComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setUserAnswer((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });
    }, []
  );
  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  if (quizeComplete) {
    return (
      <Summary userAnswer={userAnswer} />
    );
  }

  return (
    <>
      <div id="quiz">
        <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
          onSelectAnswer={handleSelectedAnswer}
          onSkipAnswer={handleSkipAnswer}

        />
      </div>
    </>
  );
}
