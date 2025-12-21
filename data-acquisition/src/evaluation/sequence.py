import difflib

SEQUENCE_MATCH_THRESHOLD = 0.8

def sequence_score(expected_answer: str, user_answer: str) -> float:
    """Return sequence similarity score (0-1)."""
    return difflib.SequenceMatcher(None, expected_answer, user_answer).ratio()

def sequence_match(expected_answer: str, user_answer: str) -> bool:
    """Sequence similarity match using difflib."""
    return sequence_score(expected_answer, user_answer) > SEQUENCE_MATCH_THRESHOLD