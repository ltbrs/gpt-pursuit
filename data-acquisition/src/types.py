from dataclasses import dataclass
from typing import Callable, Any, TypedDict, NotRequired
from datetime import timedelta

class LLMConfig(TypedDict):
    model_size: int
    pipeline_kwargs: dict[str, str|int]
    build_pipeline_input: NotRequired[Callable[[str], Any]]
    
class LLMAnswer(TypedDict):
    answer: str
    time_taken: timedelta
    is_correct: NotRequired[bool]

class Question(TypedDict):
    id: int
    category: str
    question: str
    expected_answer: str
    llm_answers: dict[str, LLMAnswer]
    difficulty: NotRequired[str]