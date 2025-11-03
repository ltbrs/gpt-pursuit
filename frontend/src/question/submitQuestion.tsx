import { Question, UserAnswer } from './types';
import { compareTwoStrings } from 'string-similarity';



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

/**
 * Checks if the user's answer is correct using similarity matching.
 * Uses string-similarity (similar to Python's difflib.SequenceMatcher) to calculate
 * similarity ratio between normalized answers.
 * 
 * @param userAnswer - The user's submitted answer
 * @param expectedAnswer - The expected correct answer
 * @param similarityThreshold - Minimum similarity ratio (0-1) to consider correct. Default: 0.8
 * @returns true if similarity >= threshold, false otherwise
 */
function isCorrect(
  userAnswer: string, 
  expectedAnswer: string, 
  similarityThreshold: number = 0.8
): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedExpected = normalizeAnswer(expectedAnswer);
  
  // Exact match always returns true
  if (normalizedUser === normalizedExpected) {
    return true;
  }
  
  // Calculate similarity ratio (0-1, similar to difflib.SequenceMatcher.ratio())
  const similarity = compareTwoStrings(normalizedUser, normalizedExpected);
  
  return similarity >= similarityThreshold;
}

function submitQuestion(userAnswer: string, question: Question) {
  const correct = isCorrect(userAnswer, question.expected_answer);
  
  const newAnswer: UserAnswer = {
    id: question.id,
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