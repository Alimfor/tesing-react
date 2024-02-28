import Answer from "./Answer";
import { useContext, useEffect } from "react";
import { QuizContext } from "../context/Quiz";

const Question = ({ personAnswers }) => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    return (
        <div>
            <div className="question">{currentQuestion.questionText}</div>
            <div className="answers">
                {
                    quizState.answers.map((answer, index) => (
                        < Answer
                            personAnswers={personAnswers}
                            currentQuestionIndex={quizState.currentQuestionIndex}
                            answerText={answer}
                            currentAnswer={quizState.currentAnswer}
                            correctAnswer={currentQuestion.correctAnswer}
                            key={index}
                            index={index}
                            onSelectAnswer={(answerText) =>
                                dispatch({ type: "SELECT_ANSWER", payload: answerText })
                            }
                        />
                    ))}
            </div>
        </div>
    );
};

export default Question;