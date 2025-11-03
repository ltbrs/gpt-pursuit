import React from 'react';
import { UserAnswer, Question } from './types';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ResultPageProps {
  answers: UserAnswer[];
  questions: Question[];
}

interface PieDataItem {
  name: string;
  value: number;
}

interface CategoryData {
  correct: number;
  total: number;
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
    }, {} as Record<string, CategoryData>);

    const categoryChartData = Object.entries(categoryData).map(([category, data]) => ({
        category,
        correct: data.correct,
        incorrect: data.total - data.correct
    }));

    const pieData: PieDataItem[] = [
        { name: 'Correct', value: correctAnswers },
        { name: 'Incorrect', value: totalQuestions - correctAnswers }
    ];

    const COLORS = ['#00FF91', '#FF006E'];

    return (
        <div className="min-h-screen bg-neutral-white p-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-6xl md:text-7xl font-black mb-12 text-center text-primary-main">
                    QUIZ RESULTS
                </h2>
                
                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="brutal-card p-8 bg-neutral-gray-50">
                        <h3 className="text-3xl font-black mb-6 text-primary-main">OVERALL PERFORMANCE</h3>
                        <div className="flex items-center justify-center mb-6">
                            <div className="text-7xl font-black text-primary-main">{accuracy.toFixed(1)}%</div>
                        </div>
                        <div className="w-full bg-neutral-gray-300 border-2 border-neutral-black h-8">
                            <div 
                                className="bg-primary-main h-full transition-all duration-500 border-r-2 border-neutral-black"
                                style={{ width: `${accuracy}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="brutal-card p-8 bg-neutral-gray-50">
                        <h3 className="text-3xl font-black mb-6 text-primary-main">SCORE DISTRIBUTION</h3>
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
                                        label={({ name, percent }: { name: string; percent: number }) => 
                                            `${name}: ${(percent * 100).toFixed(0)}%`
                                        }
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
                <div className="brutal-card p-8 mb-8 bg-neutral-gray-50">
                    <h3 className="text-3xl font-black mb-6 text-primary-main">PERFORMANCE BY CATEGORY</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                                <XAxis dataKey="category" stroke="#000" />
                                <YAxis stroke="#000" />
                                <Tooltip />
                                <Bar dataKey="correct" name="Correct" fill="#00FF91" />
                                <Bar dataKey="incorrect" name="Incorrect" fill="#FF006E" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Answers */}
                <div className="brutal-card p-8 mb-8">
                    <h3 className="text-3xl font-black mb-6 text-primary-main">DETAILED ANSWERS</h3>
                    {answers.map((answer, index) => (
                        <div key={index} className="brutal-card p-6 mb-6 bg-neutral-gray-50">
                            <div className="flex justify-between items-start mb-4">
                                <p className="font-black text-xl text-neutral-black flex-1 pr-4">{answer.question.question}</p>
                                <span className={`px-4 py-2 border-2 border-neutral-black font-black text-sm ${
                                    answer.isCorrect ? 'bg-status-success text-neutral-black' : 'bg-status-error text-neutral-white'
                                }`}>
                                    {answer.isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="brutal-card p-4 bg-neutral-white">
                                    <p className="font-black text-neutral-black mb-2">YOUR ANSWER:</p>
                                    <p className="font-medium text-neutral-700">{answer.userAnswer}</p>
                                </div>
                                <div className="brutal-card p-4 bg-neutral-white">
                                    <p className="font-black text-neutral-black mb-2">EXPECTED ANSWER:</p>
                                    <p className="font-medium text-neutral-700">{answer.question.expected_answer}</p>
                                </div>
                            </div>
                            {Object.entries(answer.question.llm_answers).map(([model, llmAnswer]) => (
                                <div key={model} className="brutal-card p-4 bg-primary-lightest mb-2">
                                    <p className="font-black text-neutral-black mb-2">{model.toUpperCase()} ANSWER:</p>
                                    <p className="font-medium text-neutral-700 mb-2">{llmAnswer.answer}</p>
                                    <span className={`font-black text-sm px-3 py-1 border-2 border-neutral-black inline-block ${
                                        llmAnswer.is_correct ? 'bg-status-success text-neutral-black' : 'bg-status-error text-neutral-white'
                                    }`}>
                                        {llmAnswer.is_correct ? '✓ CORRECT' : '✗ INCORRECT'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        className="brutal-button-primary text-lg"
                        onClick={handleRestart}
                    >
                        START NEW QUIZ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;