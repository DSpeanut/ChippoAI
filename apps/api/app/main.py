from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import sparring, interview

app = FastAPI(title="FinAI InterviewPilot API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sparring.router)
app.include_router(interview.router)


@app.get("/health")
def health():
    return {"status": "ok"}
