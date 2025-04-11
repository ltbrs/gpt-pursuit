import { Question, UserAnswer } from './types';



let userAnswers: UserAnswer[] = [];

function normalizeAnswer(answer: string) {
  return String(answer)
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s]|_/g, '') // Remove punctuation and underscores
    .replace(/\s+/g, ' ') // Collapse multiple whitespaces
    .trim(); // Trim surrounding whitespace
}

function isCorrect(userAnswer: string, expectedAnswer: string) {
  return normalizeAnswer(userAnswer) === normalizeAnswer(expectedAnswer);
}

function submitQuestion(userAnswer: string, question: Question) {
  const correct = isCorrect(userAnswer, question.expected_answer);
  
  const newAnswer: UserAnswer = {
    question,
    userAnswer,
    isCorrect: correct
  };
  
  userAnswers.push(newAnswer);
  return {
    isCorrect: correct,
    answers: [...userAnswers]
  };
}

function getAnswers() {
  return [...userAnswers];
}

function resetAnswers() {
  userAnswers = [];
}

export { submitQuestion, getAnswers, resetAnswers, type UserAnswer };

// TODO: potentially use a transformer.js model to check if the user answer is correct.