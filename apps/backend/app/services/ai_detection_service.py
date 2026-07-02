import re

def mock_ai_detection(text: str) -> float:
    score = 0.3
    length = len(text.split())

    if length > 300:
        score += 0.1

    formal_phrases = [
        "it is important to note",
        "in conclusion",
        "furthermore",
        "it should be noted",
        "in summary",
        "as previously mentioned",
        "it is worth mentioning",
        "delve",
        "leverage",
        "utilize"
    ]

    text_lower = text.lower()
    matches = sum(1 for phrase in formal_phrases if phrase in text_lower)
    score += matches * 0.08

    sentences = re.split(r'[.!?]', text)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
    if sentences:
        avg_len = sum(len(s.split()) for s in sentences) / len(sentences)
        if 15 < avg_len < 25:
            score += 0.1

    return round(min(score, 0.98), 2)
