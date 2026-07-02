def calculate_trust_score(ai_probability: float, has_author: bool = False, has_date: bool = False, source_known: bool = False) -> tuple[float, list[str]]:
    score = 100.0
    reasons = []

    if ai_probability > 0.8:
        score -= 40
        reasons.append("High AI-generated content probability detected")
    elif ai_probability > 0.5:
        score -= 20
        reasons.append("Moderate AI-generated content probability detected")
    elif ai_probability > 0.3:
        score -= 10
        reasons.append("Low AI-generated content signals detected")

    if not has_author:
        score -= 15
        reasons.append("No author attribution found")

    if not has_date:
        score -= 10
        reasons.append("No publication date found")

    if not source_known:
        score -= 10
        reasons.append("Source reputation unknown")

    score = max(0.0, min(100.0, score))

    return round(score, 1), reasons


def score_to_risk(trust_score: float) -> str:
    if trust_score >= 70:
        return "low"
    elif trust_score >= 40:
        return "medium"
    else:
        return "high"