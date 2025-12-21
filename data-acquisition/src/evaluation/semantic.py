from sentence_transformers import SentenceTransformer, util


SEMANTIC_SIMILARITY_THRESHOLD = 0.7

# Lazy load semantic similarity model
_semantic_model: SentenceTransformer | None = None

def _get_semantic_model() -> SentenceTransformer:
    """Lazy load the semantic similarity model."""
    global _semantic_model
    if _semantic_model is None:
        _semantic_model = SentenceTransformer('all-MiniLM-L6-v2')
    return _semantic_model



def semantic_similarity(expected_answer: str, user_answer: str) -> bool:
    """Semantic similarity using sentence transformers."""
    model = _get_semantic_model()
    embeddings = model.encode([expected_answer, user_answer], convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(embeddings[0], embeddings[1]).item()
    return similarity >= SEMANTIC_SIMILARITY_THRESHOLD


def semantic_similarity_with_context(question: str, expected_answer: str, user_answer: str) -> bool:
    """Semantic similarity with question context for better understanding."""
    model = _get_semantic_model()
    expected_text = f"{question} {expected_answer}"
    user_text = f"{question} {user_answer}"
    embeddings = model.encode([expected_text, user_text], convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(embeddings[0], embeddings[1]).item()
    return similarity >= SEMANTIC_SIMILARITY_THRESHOLD