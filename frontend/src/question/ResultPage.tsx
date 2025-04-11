import React from 'react';
import { UserAnswer, Question } from './types';
import { useNavigate } from 'react-router-dom';

interface ResultPageProps {
  answers: UserAnswer[];
  questions: Question[];
}
const ResultPage: React.FC<ResultPageProps> = ({ answers, questions }) => {
    const navigate = useNavigate();
    const handleRestart = () => {
        navigate('/question');
    };
    return <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Answers:</h3>
            {answers.map((answer, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                    <p className="font-semibold">Question: {answer.question.question}</p>
                    <p>Your Answer: {answer.userAnswer}</p>
                    <p>Correct Answer: {answer.question.expected_answer}</p>
                    <p className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
                        {answer.isCorrect ? "Correct" : "Incorrect"}
                    </p>
                </div>
            ))}
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            onClick={handleRestart}
        >
            Start New Quiz
        </button>
    </div>;
}

export default ResultPage;