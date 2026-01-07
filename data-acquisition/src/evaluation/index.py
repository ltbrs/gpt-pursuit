from enum import Enum
import difflib
import os
import re
from typing import Callable
from sentence_transformers import SentenceTransformer, util
from src.evaluation.exact import exact_match, bidirectional_inclusion, keyword_match, inclusion_match
from src.evaluation.sequence import sequence_match
from src.evaluation.semantic import semantic_similarity
from src.evaluation.fuzzy import fuzzy_match

class EvaluationFunction(Enum):
    INCLUSION_MATCH = "inclusion_match"
    SEQUENCE_MATCH = "sequence_match"
    SEMANTIC_SIMILARITY = "semantic_similarity"
    EXACT_MATCH = "exact_match"
    BIDIRECTIONAL_INCLUSION = "bidirectional_inclusion"
    FUZZY_MATCH = "fuzzy_match"
    KEYWORD_MATCH = "keyword_match"


EVALUATION_FUNCTIONS: dict[EvaluationFunction, Callable[[str, str], bool]] = {
    EvaluationFunction.INCLUSION_MATCH: inclusion_match,
    EvaluationFunction.SEQUENCE_MATCH: sequence_match,
    EvaluationFunction.SEMANTIC_SIMILARITY: semantic_similarity,
    EvaluationFunction.EXACT_MATCH: exact_match,
    EvaluationFunction.BIDIRECTIONAL_INCLUSION: bidirectional_inclusion,
    EvaluationFunction.FUZZY_MATCH: fuzzy_match,
    EvaluationFunction.KEYWORD_MATCH: keyword_match,
}

evaluation_function = EVALUATION_FUNCTIONS[
    EvaluationFunction(os.environ.get("EVALUATION_FUNCTION", EvaluationFunction.INCLUSION_MATCH.value))
]