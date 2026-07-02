from pydantic import BaseModel
from typing import Optional, List

class TextDetectionRequest(BaseModel):
    text: str
    url: Optional[str] = None

class URLDetectionRequest(BaseModel):
    url: str

class AlternativesRequest(BaseModel):
    topic: str
    url: Optional[str] = None

class AlternativeSource(BaseModel):
    title: str
    url: str
    domain: str
    snippet: str

class DetectionResponse(BaseModel):
    ai_probability: float
    trust_score: float
    risk: str
    reasons: List[str]

class URLDetectionResponse(BaseModel):
    url: str
    is_safe: bool
    threat_type: Optional[str]
    risk: str
    trust_score: float

class AlternativesResponse(BaseModel):
    sources: List[AlternativeSource]

class AnalyticsResponse(BaseModel):
    articles_scanned: int
    ai_content_detected: int
    suspicious_links_found: int
    potential_scams_detected: int
    trusted_alternatives_opened: int

class RecentDetection(BaseModel):
    id: int
    url: str
    content_type: str
    risk: str
    ai_probability: float
    trust_score: float
    timestamp: str

class RecentDetectionsResponse(BaseModel):
    detections: List[RecentDetection]