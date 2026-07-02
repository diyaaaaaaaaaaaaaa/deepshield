from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=True)
    domain = Column(String, nullable=True)
    content_type = Column(String, nullable=False, default="article")
    ai_probability = Column(Float, nullable=False)
    trust_score = Column(Float, nullable=False)
    scam_risk = Column(Float, default=0.0)
    phishing_risk = Column(Float, default=0.0)
    source_reputation = Column(Float, default=50.0)
    status = Column(String, nullable=False, default="warning")
    risk = Column(String, nullable=False, default="medium")
    reasons = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    alternatives_opened = Column(Boolean, default=False)

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    count = Column(Integer, default=1)
    detection_id = Column(Integer, nullable=True)


class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    threshold = Column(Float, default=0.5)
    ai_text = Column(Boolean, default=True)
    ai_image = Column(Boolean, default=True)
    scam = Column(Boolean, default=True)
    phishing = Column(Boolean, default=True)
    source_reputation = Column(Boolean, default=True)
    community = Column(Boolean, default=True)
    display_mode = Column(String, default="standard")
    notif_browser = Column(Boolean, default=True)
    notif_email = Column(Boolean, default=False)
    notif_weekly = Column(Boolean, default=True)


class CommunityVote(Base):
    __tablename__ = "community_votes"

    id = Column(Integer, primary_key=True, index=True)
    detection_id = Column(Integer, nullable=False)
    vote = Column(String, nullable=False)
    note = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)