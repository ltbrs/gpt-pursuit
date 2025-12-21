import re

KEYWORD_MATCH_THRESHOLD = 0.6

def normalize_text(text: str) -> str:
    """Normalize text for comparison: lowercase, remove extra spaces, remove punctuation."""
    # Remove punctuation except spaces
    text = re.sub(r'[^\w\s]', '', text)
    # Collapse multiple whitespaces
    text = re.sub(r'\s+', ' ', text)
    return text.lower().strip()

def inclusion_match(expected_answer: str, user_answer: str) -> bool:
    """Check if expected answer is contained in user answer."""
    return expected_answer.lower().strip() in user_answer.lower().strip()


def bidirectional_inclusion(expected_answer: str, user_answer: str) -> bool:
    """Check if either answer is contained in the other (bidirectional inclusion)."""
    return inclusion_match(expected_answer, user_answer) or inclusion_match(user_answer, expected_answer)


def exact_match(expected_answer: str, user_answer: str) -> bool:
    """Normalized exact match after removing punctuation and extra spaces."""
    return normalize_text(expected_answer) == normalize_text(user_answer)


def keyword_match(expected_answer: str, user_answer: str) -> bool:
    """Check if key terms from expected answer are present in user answer."""
    expected_words = set(normalize_text(expected_answer).split())
    user_words = set(normalize_text(user_answer).split())
    
    # Remove common stop words (basic set)
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
    expected_words -= stop_words
    user_words -= stop_words
    
    if not expected_words:
        # If no meaningful words, fall back to exact match
        return exact_match(expected_answer, user_answer)
    
    overlap = len(expected_words & user_words)
    coverage = overlap / len(expected_words)
    return coverage >= KEYWORD_MATCH_THRESHOLD
