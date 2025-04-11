export type LLMAnswer = {
    answer: string;
    is_correct: boolean;
}

export type Question = {
    id: number;
    category: string;
    question: string;
    expected_answer: string;
    llm_answers: {
        [key: string]: LLMAnswer;
    };
    difficulty: string;
}