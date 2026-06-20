from fastapi import FastAPI

app = FastAPI(
    title="DeepShield API",
    version="1.0.0"
)

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