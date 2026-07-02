from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.health import router as health_router
from app.api.routes.detection import router as detection_router

app = FastAPI(
    title="DeepShield API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(detection_router)

@app.get("/")
def root():
    return {
        "message": "DeepShield API Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }