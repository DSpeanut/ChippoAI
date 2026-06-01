from langchain_openai import ChatOpenAI
from app.core.config import settings


def create_chat_model(streaming: bool = True) -> ChatOpenAI:
    return ChatOpenAI(
        model=settings.model_name,
        api_key=settings.openrouter_api_key,
        base_url=settings.api_base_url,
        streaming=streaming,
        default_headers={
            "HTTP-Referer": "https://uncle-nick.app",
            "X-Title": "FinAI InterviewPilot",
        },
    )
