from pydantic import BaseModel
from app.schemas.chat import Message


class InterviewRequest(BaseModel):
    messages: list[Message] = []
    category: str = "Machine Learning"
    difficulty: str = "Medium"
    total_questions: int = 5


class QuestionsRequest(BaseModel):
    category: str
    difficulty: str
    total_questions: int


class QAPair(BaseModel):
    question: str
    answer: str


class ReportRequest(BaseModel):
    category: str
    difficulty: str
    qa_pairs: list[QAPair]
