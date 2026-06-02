import json

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.agents.interview import generate_questions, stream_report
from app.schemas.interview import QuestionsRequest, ReportRequest

router = APIRouter(prefix="/interview", tags=["interview"])


@router.post("/questions")
async def questions(request: QuestionsRequest) -> dict:
    qs = await generate_questions(request)
    return {"questions": qs}


@router.post("/report")
async def report(request: ReportRequest) -> StreamingResponse:
    async def event_stream():
        async for token in stream_report(request):
            yield f"data: {json.dumps(token)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
