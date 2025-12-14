from dataclasses import dataclass
from typing import Callable, Any, TypedDict, NotRequired


class LLMConfig(TypedDict):
    model_size: int
    pipeline_kwargs: dict[str, str|int]
    build_pipeline_input: NotRequired[Callable[[str], Any]]
    
class LLMAnswer(TypedDict):
    answer: str
    is_correct: bool

class Question(TypedDict):
    id: int
    category: str
    question: str
    expected_answer: str
    llm_answers: dict[str, LLMAnswer]
    difficulty: NotRequired[str]