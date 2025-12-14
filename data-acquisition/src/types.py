from dataclasses import dataclass
from typing import Callable, Any, TypedDict, NotRequired
from consts import DEFAULT_BUILD_QUESTION

@dataclass
class LLMConfig:
    model_size: int
    pipeline_kwargs: dict[str, Any]
    build_pipeline_input: Callable[[str], Any] = DEFAULT_BUILD_QUESTION
    
    @property
    def name(self) -> str:
        return self.pipeline_kwargs.get("model", "Unknown")


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