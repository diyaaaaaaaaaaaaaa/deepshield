from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from app.db.database import get_db
from app.models.detection import Detection, UserSettings, CommunityVote
from app.schemas.detection import (
    TextDetectionRequest, URLDetectionRequest, AlternativesRequest,
    DetectionResponse, URLDetectionResponse, AlternativesResponse,
)
from app.services.ai_detection_service import mock_ai_detection
from app.services.trust_score_service import calculate_trust_score, score_to_risk
from app.services.tavily_service import get_trusted_alternatives
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

router = APIRouter(tags=["Detection"])


@router.post("/detect/text", response_model=DetectionResponse)
def detect_text(request: TextDetectionRequest, db: Session = Depends(get_db)):
    ai_probability = mock_ai_detection(request.text)
    trust_score, reasons = calculate_trust_score(ai_probability=ai_probability)
    risk = score_to_risk(trust_score)
    status = "danger" if risk == "high" else "warning" if risk == "medium" else "safe"
    domain = ""
    if request.url:
        try:
            domain = request.url.split("/")[2]
        except Exception:
            domain = ""
    detection = Detection(
        url=request.url, domain=domain, content_type="article",
        ai_probability=ai_probability, trust_score=trust_score,
        scam_risk=0.0, phishing_risk=0.0, source_reputation=50.0,
        status=status, risk=risk, reasons=reasons, timestamp=datetime.utcnow(),
    )
    db.add(detection)
    db.commit()
    db.refresh(detection)
    return DetectionResponse(ai_probability=ai_probability, trust_score=trust_score, risk=risk, reasons=reasons)


@router.post("/detect/url", response_model=URLDetectionResponse)
def detect_url(request: URLDetectionRequest, db: Session = Depends(get_db)):
    url = request.url.lower()
    risky_patterns = ["free", "win", "click", "prize", "verify", "secure", "update", "confirm"]
    matches = sum(1 for p in risky_patterns if p in url)
    trust_score = max(20.0, 90.0 - (matches * 15))
    is_safe = trust_score >= 60
    threat_type = None if is_safe else "Suspicious URL pattern"
    risk = score_to_risk(trust_score)
    status = "danger" if risk == "high" else "warning" if risk == "medium" else "safe"
    phishing_risk = min(90.0, matches * 20.0)
    scam_risk = min(90.0, matches * 15.0)
    try:
        domain = request.url.split("/")[2]
    except Exception:
        domain = ""
    detection = Detection(
        url=request.url, domain=domain, content_type="url",
        ai_probability=0.0, trust_score=trust_score,
        scam_risk=scam_risk, phishing_risk=phishing_risk, source_reputation=50.0,
        status=status, risk=risk, reasons=[threat_type] if threat_type else [],
        timestamp=datetime.utcnow(),
    )
    db.add(detection)
    db.commit()
    return URLDetectionResponse(url=request.url, is_safe=is_safe, threat_type=threat_type, risk=risk, trust_score=round(trust_score, 1))


@router.post("/detect/alternatives", response_model=AlternativesResponse)
async def get_alternatives(request: AlternativesRequest):
    sources = await get_trusted_alternatives(request.topic)
    return AlternativesResponse(sources=sources)


@router.get("/dashboard/overview")
def dashboard_overview(db: Session = Depends(get_db)):
    total = db.query(func.count(Detection.id)).scalar() or 0
    ai_detected = db.query(func.count(Detection.id)).filter(Detection.ai_probability > 0.5).scalar() or 0
    suspicious = db.query(func.count(Detection.id)).filter(Detection.content_type == "url", Detection.risk != "low").scalar() or 0
    scams = db.query(func.count(Detection.id)).filter(Detection.scam_risk > 50).scalar() or 0
    alternatives = db.query(func.count(Detection.id)).filter(Detection.alternatives_opened == True).scalar() or 0
    return {
        "articlesScanned": total,
        "aiDetected": ai_detected,
        "suspiciousLinks": suspicious,
        "scams": scams,
        "alternativesOpened": alternatives,
    }


@router.get("/dashboard/analytics")
def dashboard_analytics(db: Session = Depends(get_db)):
    # aiOverTime: average AI probability per day
    ai_over_time_rows = (
        db.query(
            func.date(Detection.timestamp).label("date"),
            func.avg(Detection.ai_probability).label("value"),
        )
        .group_by(func.date(Detection.timestamp))
        .order_by(func.date(Detection.timestamp))
        .all()
    )
    ai_over_time = [
        {"date": str(row.date), "value": round((row.value or 0) * 100)}
        for row in ai_over_time_rows
    ]

    # categories: count by content_type
    category_rows = (
        db.query(Detection.content_type, func.count(Detection.id))
        .group_by(Detection.content_type)
        .all()
    )
    categories = [{"name": name or "unknown", "value": count} for name, count in category_rows]

    # trustDistribution: bucket trust_score into ranges
    low = db.query(func.count(Detection.id)).filter(Detection.trust_score < 40).scalar() or 0
    medium = db.query(func.count(Detection.id)).filter(Detection.trust_score >= 40, Detection.trust_score < 70).scalar() or 0
    high = db.query(func.count(Detection.id)).filter(Detection.trust_score >= 70).scalar() or 0
    trust_distribution = [
        {"name": "low", "value": low},
        {"name": "medium", "value": medium},
        {"name": "high", "value": high},
    ]

    # topDomains: most frequently flagged domains
    domain_rows = (
        db.query(Detection.domain, func.count(Detection.id).label("count"))
        .filter(Detection.domain.isnot(None), Detection.domain != "")
        .group_by(Detection.domain)
        .order_by(func.count(Detection.id).desc())
        .limit(10)
        .all()
    )
    top_domains = [{"domain": domain, "count": count} for domain, count in domain_rows]

    return {
        "aiOverTime": ai_over_time,
        "categories": categories,
        "trustDistribution": trust_distribution,
        "topDomains": top_domains,
    }


@router.get("/detections")
def list_detections(db: Session = Depends(get_db)):
    detections = db.query(Detection).order_by(Detection.timestamp.desc()).limit(50).all()
    return [
        {
            "id": str(d.id),
            "domain": d.domain or "",
            "url": d.url or "",
            "timestamp": d.timestamp.isoformat() if d.timestamp else "",
            "contentType": d.content_type,
            "aiProbability": round((d.ai_probability or 0) * 100),
            "trustScore": round(d.trust_score or 0),
            "scamRisk": round(d.scam_risk or 0),
            "phishingRisk": round(d.phishing_risk or 0),
            "sourceReputation": round(d.source_reputation or 50),
            "status": d.status,
            "reasons": [{"title": r, "detail": r} for r in (d.reasons or [])],
        }
        for d in detections
    ]


@router.get("/detections/{detection_id}")
def get_detection(detection_id: int, db: Session = Depends(get_db)):
    d = db.query(Detection).filter(Detection.id == detection_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Detection not found")
    return {
        "id": str(d.id),
        "domain": d.domain or "",
        "url": d.url or "",
        "timestamp": d.timestamp.isoformat() if d.timestamp else "",
        "contentType": d.content_type,
        "aiProbability": round((d.ai_probability or 0) * 100),
        "trustScore": round(d.trust_score or 0),
        "scamRisk": round(d.scam_risk or 0),
        "phishingRisk": round(d.phishing_risk or 0),
        "sourceReputation": round(d.source_reputation or 50),
        "status": d.status,
        "reasons": [{"title": r, "detail": r} for r in (d.reasons or [])],
    }


@router.get("/alternatives")
async def list_alternatives(topic: Optional[str] = "latest news"):
    sources = await get_trusted_alternatives(topic)
    return [
        {"id": str(i), "title": s.title, "domain": s.domain, "url": s.url, "trustScore": 85}
        for i, s in enumerate(sources)
    ]


@router.get("/settings")
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(UserSettings).first()
    if not settings:
        settings = UserSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return {
        "threshold": settings.threshold,
        "detectionTypes": {
            "aiText": settings.ai_text,
            "aiImage": settings.ai_image,
            "scam": settings.scam,
            "phishing": settings.phishing,
            "sourceReputation": settings.source_reputation,
            "community": settings.community,
        },
        "displayMode": settings.display_mode,
        "notifications": {
            "browser": settings.notif_browser,
            "email": settings.notif_email,
            "weekly": settings.notif_weekly,
        },
    }


class SettingsUpdateRequest(BaseModel):
    threshold: Optional[float] = None
    detectionTypes: Optional[dict] = None
    displayMode: Optional[str] = None
    notifications: Optional[dict] = None


@router.patch("/settings")
def update_settings(body: SettingsUpdateRequest, db: Session = Depends(get_db)):
    settings = db.query(UserSettings).first()
    if not settings:
        settings = UserSettings()
        db.add(settings)

    if body.threshold is not None:
        settings.threshold = body.threshold
    if body.detectionTypes is not None:
        dt = body.detectionTypes
        if "aiText" in dt: settings.ai_text = dt["aiText"]
        if "aiImage" in dt: settings.ai_image = dt["aiImage"]
        if "scam" in dt: settings.scam = dt["scam"]
        if "phishing" in dt: settings.phishing = dt["phishing"]
        if "sourceReputation" in dt: settings.source_reputation = dt["sourceReputation"]
        if "community" in dt: settings.community = dt["community"]
    if body.displayMode is not None:
        settings.display_mode = body.displayMode
    if body.notifications is not None:
        n = body.notifications
        if "browser" in n: settings.notif_browser = n["browser"]
        if "email" in n: settings.notif_email = n["email"]
        if "weekly" in n: settings.notif_weekly = n["weekly"]

    db.commit()
    db.refresh(settings)
    return {
        "threshold": settings.threshold,
        "detectionTypes": {
            "aiText": settings.ai_text, "aiImage": settings.ai_image,
            "scam": settings.scam, "phishing": settings.phishing,
            "sourceReputation": settings.source_reputation, "community": settings.community,
        },
        "displayMode": settings.display_mode,
        "notifications": {
            "browser": settings.notif_browser, "email": settings.notif_email, "weekly": settings.notif_weekly,
        },
    }


class FeedbackRequest(BaseModel):
    vote: str
    note: Optional[str] = None


@router.post("/detections/{detection_id}/feedback")
def submit_feedback(detection_id: int, body: FeedbackRequest, db: Session = Depends(get_db)):
    vote = CommunityVote(detection_id=detection_id, vote=body.vote, note=body.note)
    db.add(vote)
    db.commit()
    return {"ok": True}