import questionsData from '../../data/sample_trivia.json';
import { Question } from './types';

function selectQuestion(previousQuestions: Question[]): Question {
    const randomIndex = Math.floor(Math.random() * questionsData.questions.length);
    const question = questionsData.questions[randomIndex];
    if (previousQuestions.includes(question)) {
        return selectQuestion(previousQuestions);
    }
    return question;
}

export default selectQuestion;