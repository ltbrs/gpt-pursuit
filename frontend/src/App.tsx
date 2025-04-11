import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import QuestionPage from './question/QuestionPage';

function HomePage() {
  const navigate = useNavigate();

  return (
    // Container with max width, centered, and padding
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with large text, bold, and margin bottom */}
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        GPT Pursuit
      </h1>
      
      {/* Card with white background, shadow, rounded corners, and padding */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <p className="text-gray-700 mb-4">
          Welcome to your new React application!
        </p>
        
        {/* Button with hover effects */}
        <button 
          onClick={() => navigate('/question')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Start Game
        </button>
      </div>

      {/* Grid layout example */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Player Stats</h2>
          <p className="text-gray-600">Your progress will appear here</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Game Rules</h2>
          <p className="text-gray-600">Learn how to play</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App; 