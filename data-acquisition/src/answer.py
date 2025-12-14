from .llm import load_pipeline, get_name
from .types import LLMConfig, Question, LLMAnswer
import difflib

PROMPT = """You are participating in a trivia contest. Answer the following question: {question}"""


def answer_questions(questions: list[str], llm_config: LLMConfig) -> list[str]:
    pipe = load_pipeline(llm_config)
    return [pipe(
        llm_config.build_pipeline_input(PROMPT.format(question=question))
    ) for question in questions]

def llms_answer_questions(questions: list[str], llms: list[LLMConfig]) -> list[list[str]]:
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
