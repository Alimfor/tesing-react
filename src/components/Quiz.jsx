import { useContext, useState, useEffect } from "react";
import { Button, Tooltip } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import Question from "./Quesion";
import { QuizContext } from "../context/Quiz";
import { SavePersonAnswers } from '../api/SavePersonAnswers';
import { CurrentTime } from './CurrentTime';
import axios from 'axios';
import { GetReport } from '../api/GetReport';
import { useParams } from 'react-router-dom';

const apiEndpoint = 'http://localhost:5283/api/TestSession/retrieve_id_after_addition';

const Quiz = () => {
    const { email } = useParams();
    const [quizState, dispatch] = useContext(QuizContext);
    const startTime = CurrentTime();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (quizState.showResults) {
            storeData();
        }
    }, [quizState.showResults]);

    const storeData = async () => {
        try {
            let response = await axios.post(apiEndpoint, {
                testStartDate: startTime,
                testEndDate: CurrentTime()
            });
            for (let index = 0; index < data.length; index++) {
                const personAnswers = {
                    personAnswerText: data[index].currentAnswer,
                    testSessionId: response.data,
                    personEmail: email,
                    questionId: data[index].currentQuestionIndex + 1
                }
                console.log(personAnswers);
                await SavePersonAnswers(personAnswers);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            console.log("111");
            throw error;
        }
    }

    const personData = (pdata) => {
        data.push(pdata);
    }

    return (
        <div className="quiz">
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations!</div>
                    <div className="results-info">
                        <div>You have completed the quiz.</div>
                        <div>
                            You've got {quizState.correctAnswersCount} of &nbsp;
                            {quizState.questions.length} right.
                        </div>
                    </div>
                    <div
                        onClick={() => dispatch({ type: "RESTART" })}
                        className="next-button"
                    >
                        Restart
                    </div>
                    <Tooltip
                        title="download xml report"
                        color='green'
                    >
                        <Button
                            icon={<FileTextOutlined />}
                            onClick={() => GetReport(email)}
                            style={{
                                color: 'green'
                            }}
                        >
                        </Button>
                    </Tooltip>
                </div>
            )}
            {!quizState.showResults && (
                <div>
                    <div className="score">
                        Question {quizState.currentQuestionIndex + 1}/
                        {quizState.questions.length}
                    </div>
                    <Question personAnswers={personData} />
                    {quizState.currentAnswer && (
                        <div
                            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                            className="next-button"
                        >
                            Next question
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;