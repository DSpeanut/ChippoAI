import re
from pathlib import Path
from typing import AsyncGenerator

import yaml
from langchain_core.messages import HumanMessage, SystemMessage

from app.agents.base import create_chat_model
from app.schemas.interview import QuestionsRequest, ReportRequest


def _prompts() -> dict:
    path = Path(__file__).parent.parent / "constants" / "prompts.yaml"
    with open(path) as f:
        return yaml.safe_load(f)["interview"]


async def generate_questions(request: QuestionsRequest) -> list[str]:
    prompt = _prompts()["generate_questions"].format(
        category=request.category,
        difficulty=request.difficulty,
        total_questions=request.total_questions,
    )
    model = create_chat_model(streaming=False)
    result = await model.ainvoke([HumanMessage(content=prompt)])
    text = result.content if hasattr(result, "content") else str(result)

    # Parse numbered list: "1. Question text"
    questions = []
    for line in text.strip().splitlines():
        line = line.strip()
        match = re.match(r"^\d+[\.\)]\s*(.+)", line)
        if match:
            questions.append(match.group(1).strip())

    # Fallback: split by newline and strip blank lines
    if not questions:
        questions = [l.strip() for l in text.splitlines() if l.strip()]

    return questions[:request.total_questions]


async def stream_report(request: ReportRequest) -> AsyncGenerator[str, None]:
    p = _prompts()["generate_report"].format(
        category=request.category,
        difficulty=request.difficulty,
    )
    qa_text = "\n\n".join(
        f"Q{i+1}: {pair.question}\nAnswer: {pair.answer}"
        for i, pair in enumerate(request.qa_pairs)
    )
    user_msg = f"{qa_text}\n\nGenerate the report."

    model = create_chat_model(streaming=True)
    async for chunk in model.astream([
        SystemMessage(content=p),
        HumanMessage(content=user_msg),
    ]):
        if chunk.content:
            yield chunk.content
