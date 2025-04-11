import React from 'react';
import { useState } from 'react';
import { Question } from './types';
import selectQuestion from './selectQuestion';
import { submitQuestion, getAnswers, resetAnswers, type UserAnswer } from './submitQuestion';
import ResultPage from './ResultPage';
const numQuestions = 3;

const QuestionPage: React.FC = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [previousQuestions, setPreviousQuestions] = useState<Question[]>([selectQuestion([])]);
  const [answers, setAnswers] = useState<UserAnswer[]>(getAnswers());
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = previousQuestions[previousQuestions.length - 1];

  const handleSubmit = () => {
    if (!userAnswer) return;
    
    submitQuestion(userAnswer, currentQuestion);
    setUserAnswer('');
    setAnswers(getAnswers());
    
    // If this was the last question, show results
    if (previousQuestions.length >= numQuestions) {
      setShowResults(true);
    } else {
      // Select next question
      const newQuestion = selectQuestion(previousQuestions);
      setPreviousQuestions([...previousQuestions, newQuestion]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!showResults && currentQuestion ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-4xl font-bold mb-6 text-blue-600">
            Quiz {previousQuestions.length} out of {numQuestions}
          </h1>
          <p className="text-gray-700 mb-4 text-xl">
            {currentQuestion.question}
          </p>
          
          <div className="mb-4">
            <label htmlFor="answer" className="block text-gray-700 text-sm font-bold mb-2">
              Your Answer
            </label>
            <input
              type="text"
              id="answer"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>
          
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            onClick={handleSubmit}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <ResultPage answers={answers} questions={previousQuestions} />
      )}
    </div>
  );
};

export default QuestionPage; 

