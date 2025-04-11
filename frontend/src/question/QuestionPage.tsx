import React from 'react';
import isCorrect from './checkQuestion';
import { useState, useEffect } from 'react';
import { Question } from './types';
import selectQuestion from './selectQuestion';

const numQuestions = 10;
const QuestionPage: React.FC = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [previousQuestions, setPreviousQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    const newQuestion = selectQuestion(previousQuestions);
    setPreviousQuestions([...previousQuestions, newQuestion]);
  }, []);

  const currentQuestion = previousQuestions[previousQuestions.length - 1];
  console.log("currentQuestion", currentQuestion);
  console.log("previousQuestions", previousQuestions);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        Question {previousQuestions.length} out of {numQuestions}
      </h1>
      
      {currentQuestion ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
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
            onClick={() => {
              isCorrect(userAnswer, currentQuestion.expected_answer);
              setUserAnswer('');
              
              if (previousQuestions.length < numQuestions) {
                const newQuestion = selectQuestion(previousQuestions);
                setPreviousQuestions([...previousQuestions, newQuestion]);
              } else {
                console.log("Quiz completed!");
              }
            }}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading question...</p>
        </div>
      )}
    </div>
  );
};

export default QuestionPage; 