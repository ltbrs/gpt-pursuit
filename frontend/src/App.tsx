import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import QuestionPage from './question/QuestionPage';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-6xl md:text-7xl font-black mb-8 text-primary-main leading-tight">
          GPT PURSUIT
        </h1>
        
        {/* Main Card */}
        <div className="brutal-card p-8 mb-8">
          <p className="text-xl md:text-2xl mb-6 font-bold text-neutral-black">
            Welcome to your new React application!
          </p>
          
          <button 
            onClick={() => navigate('/question')}
            className="brutal-button-primary text-lg"
          >
            START GAME
          </button>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="brutal-card p-6 bg-neutral-gray-50">
            <h2 className="text-2xl font-black mb-4 text-primary-main">PLAYER STATS</h2>
            <p className="text-neutral-700 font-medium">Your progress will appear here</p>
          </div>
          <div className="brutal-card p-6 bg-neutral-gray-50">
            <h2 className="text-2xl font-black mb-4 text-primary-main">GAME RULES</h2>
            <p className="text-neutral-700 font-medium">Learn how to play</p>
          </div>
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