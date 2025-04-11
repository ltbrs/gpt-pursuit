import React from 'react';

const QuestionPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        Question 1 out of 10
      </h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <p className="text-gray-700 mb-4 text-xl">
          What is the capital of France?
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
          />
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors">
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionPage; 