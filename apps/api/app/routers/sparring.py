import json

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.agents.sparring import stream_sparring
from app.schemas.chat import ChatRequest

router = APIRouter(prefix="/sparring", tags=["sparring"])


@router.post("/chat")
async def chat(request: ChatRequest) -> StreamingResponse:
    async def event_stream():
        async for token in stream_sparring(request):
            yield f"data: {json.dumps(token)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
