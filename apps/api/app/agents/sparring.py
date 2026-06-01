from pathlib import Path
from typing import AsyncGenerator

import yaml
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

from app.agents.base import create_chat_model
from app.schemas.chat import ChatRequest


def _load_prompts() -> dict:
    path = Path(__file__).parent.parent / "constants" / "prompts.yaml"
    with open(path) as f:
        return yaml.safe_load(f)


def build_system_prompt(topic: str, mode: str) -> str:
    p = _load_prompts()["sparring"]
    return p["system"].format(
        topic=topic or "the topic they raise",
        mode_instruction=p["modes"][mode],
    )


def build_messages(request: ChatRequest) -> list:
    system = build_system_prompt(request.topic, request.mode)
    lc_messages: list = [SystemMessage(content=system)]
    for msg in request.messages:
        if msg.role == "user":
            lc_messages.append(HumanMessage(content=msg.content))
        else:
            lc_messages.append(AIMessage(content=msg.content))
    return lc_messages


async def stream_sparring(request: ChatRequest) -> AsyncGenerator[str, None]:
    model = create_chat_model(streaming=True)
    messages = build_messages(request)
    async for chunk in model.astream(messages):
        if chunk.content:
            yield chunk.content
