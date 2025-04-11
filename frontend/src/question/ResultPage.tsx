import React from 'react';
import { UserAnswer, Question } from './types';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ResultPageProps {
  answers: UserAnswer[];
  questions: Question[];
}

const ResultPage: React.FC<ResultPageProps> = ({ answers, questions }) => {
    const navigate = useNavigate();
    const handleRestart = () => {
        navigate('/question');
    };

    // Calculate statistics
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const accuracy = (correctAnswers / totalQuestions) * 100;

    // Prepare data for charts
    const categoryData = questions.reduce((acc, q) => {
        const category = q.category;
        if (!acc[category]) {
            acc[category] = { correct: 0, total: 0 };
        }
        acc[category].total++;
        const answer = answers.find(a => a.question.id === q.id);
        if (answer?.isCorrect) {
            acc[category].correct++;
        }
        return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    const categoryChartData = Object.entries(categoryData).map(([category, data]) => ({
        category,
        correct: data.correct,
        incorrect: data.total - data.correct
    }));

    const pieData = [
        { name: 'Correct', value: correctAnswers },
        { name: 'Incorrect', value: totalQuestions - correctAnswers }
    ];

    const COLORS = ['#10B981', '#EF4444'];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Quiz Results</h2>
            
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Overall Performance</h3>
                    <div className="flex items-center justify-center mb-4">
                        <div className="text-4xl font-bold text-blue-600">{accuracy.toFixed(1)}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${accuracy}%` }}
                        ></div>
                    </div>
                </div>
                
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Score Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Performance by Category</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="correct" name="Correct" fill="#10B981" />
                            <Bar dataKey="incorrect" name="Incorrect" fill="#EF4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Answers */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Detailed Answers</h3>
                {answers.map((answer, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <p className="font-semibold text-lg">{answer.question.question}</p>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {answer.isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded">
                                <p className="font-medium text-gray-700">Your Answer:</p>
                                <p className="mt-1">{answer.userAnswer}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded">
                                <p className="font-medium text-gray-700">Expected Answer:</p>
                                <p className="mt-1">{answer.question.expected_answer}</p>
                            </div>
                        </div>
                        {Object.entries(answer.question.llm_answers).map(([model, llmAnswer]) => (
                            <div key={model} className="mt-2 p-3 bg-blue-50 rounded">
                                <p className="font-medium text-blue-700">{model} Answer:</p>
                                <p className="mt-1">{llmAnswer.answer}</p>
                                <span className={`text-sm ${
                                    llmAnswer.is_correct ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {llmAnswer.is_correct ? 'Correct' : 'Incorrect'}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    onClick={handleRestart}
                >
                    Start New Quiz
                </button>
            </div>
        </div>
    );
}

export default ResultPage;