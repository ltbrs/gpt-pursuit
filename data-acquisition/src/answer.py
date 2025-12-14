from .llm import load_pipeline
from .types import LLMConfig

PROMPT = """You are participating in a trivia contest. Answer the following question: {question}"""


def answer_questions(questions: list[str], llm_config: LLMConfig) -> list[str]:
    pipe = load_pipeline(llm_config)
    return [pipe(
        llm_config.build_pipeline_input(PROMPT.format(question=question))
    ) for question in questions]

def llms_answer_questions(questions: list[str], llms: list[LLMConfig]) -> list[list[str]]:
    return [answer_questions(questions, llm) for llm in llms]
