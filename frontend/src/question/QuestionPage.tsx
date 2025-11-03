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
    <div className="min-h-screen bg-neutral-white p-6">
      <div className="max-w-5xl mx-auto">
        {!showResults && currentQuestion ? (
          <div className="brutal-card p-8 mb-6">
            <h1 className="text-5xl md:text-6xl font-black mb-8 text-primary-main">
              QUIZ {previousQuestions.length} / {numQuestions}
            </h1>
            <p className="text-2xl md:text-3xl mb-8 font-bold text-neutral-black leading-relaxed">
              {currentQuestion.question}
            </p>
            
            <div className="mb-6">
              <label htmlFor="answer" className="block text-neutral-black text-lg font-black mb-3">
                YOUR ANSWER
              </label>
              <input
                type="text"
                id="answer"
                className="brutal-input w-full text-lg"
                placeholder="Type your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
            </div>
            
            <button 
              className="brutal-button-primary text-lg"
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
            >
              SUBMIT ANSWER
            </button>
          </div>
        ) : (
          <ResultPage answers={answers} questions={previousQuestions} />
        )}
      </div>
    </div>
  );
};

export default QuestionPage; 

