from typing import Any
from .llm import load_pipeline, get_name
from .types import LLMConfig, Question, LLMAnswer
import difflib
from src.consts import DEFAULT_BUILD_QUESTION
import time 
from datetime import timedelta

PROMPT = """You are participating in a trivia contest. Your answer will directly be compared to the expected answer, so only return the answer to the question.
Do not include explanations, reasoning, or any other text.

If multiple valid answers exist, provide the most common or standard form:
- Use full names when common (e.g., "William Shakespeare" not "Shakespeare")
- Don't use standard abbreviations (e.g., "WWII" is not acceptable, use "World War II" instead)
- For dates, use the year only (e.g., "1945" not "the year 1945")

Example 1:
Question: "What is the capital of France?"
Expected answer from you: "Paris"

Example 2:
Question: "In what year did World War II end?"
Expected answer from you: "1945"

It's your turn, answer the following question: {question}"""


def answer_questions(questions: list[str], llm_config: LLMConfig) -> list[LLMAnswer]:
    pipe = load_pipeline(llm_config)
    build_pipeline_input = llm_config.get("build_pipeline_input", DEFAULT_BUILD_QUESTION)
    answers = []
    for question in questions:
        start_time = time.time()
        answer = pipe(
            build_pipeline_input(PROMPT.format(question=question))
        )
        end_time = time.time()
        answers.append(LLMAnswer(
            answer=extract_answer(answer),
            time_taken=timedelta(seconds=end_time - start_time),
        ))
    return answers

def extract_answer(answer: Any) -> str:
    if isinstance(answer, list):
        return str(answer[-1]['generated_text'])
    else:
        return answer
    
def llms_answer_questions(questions: list[str], llms: list[LLMConfig]) -> list[list[LLMAnswer]]:
    return [answer_questions(questions, llm) for llm in llms]

def format_answer(
    id: int,
    category:str,
    question:str,
    expected_answer: str, 
    llm_answers:list[str], 
    llm_configs:list[LLMConfig],
    ) -> Question:
    return Question(
        id=id,
        category=category,
        question=question,
        expected_answer=expected_answer,
        llm_answers={
            get_name(llm_config): LLMAnswer(
            answer=llm_answer,
            is_correct=difflib.SequenceMatcher(None, expected_answer, llm_answer).ratio() > 0.8
        ) for llm_answer, llm_config in zip(llm_answers, llm_configs)
        }
    )
