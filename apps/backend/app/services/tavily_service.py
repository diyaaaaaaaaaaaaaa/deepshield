import httpx
from app.core.config import TAVILY_API_KEY
from app.schemas.detection import AlternativeSource
from typing import List

async def get_trusted_alternatives(topic: str) -> List[AlternativeSource]:
    if not TAVILY_API_KEY:
        return _fallback_sources(topic)

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": TAVILY_API_KEY,
                    "query": topic,
                    "search_depth": "basic",
                    "max_results": 5,
                    "include_domains": [
                        "reuters.com", "bbc.com", "apnews.com",
                        "theguardian.com", "npr.org", "bloomberg.com"
                    ]
                }
            )
            data = response.json()
            sources = []
            for result in data.get("results", []):
                url = result.get("url", "")
                domain = url.split("/")[2] if "//" in url else url
                sources.append(AlternativeSource(
                    title=result.get("title", ""),
                    url=url,
                    domain=domain,
                    snippet=result.get("content", "")[:200]
                ))
            return sources if sources else _fallback_sources(topic)

    except Exception:
        return _fallback_sources(topic)


def _fallback_sources(topic: str) -> List[AlternativeSource]:
    return [
        AlternativeSource(
            title=f"Reuters coverage on: {topic[:50]}",
            url="https://reuters.com",
            domain="reuters.com",
            snippet="Trusted international news coverage from Reuters."
        ),
        AlternativeSource(
            title=f"BBC News on: {topic[:50]}",
            url="https://bbc.com/news",
            domain="bbc.com",
            snippet="Independent reporting from BBC News."
        ),
        AlternativeSource(
            title=f"AP News on: {topic[:50]}",
            url="https://apnews.com",
            domain="apnews.com",
            snippet="Fact-based journalism from the Associated Press."
        )
    ]