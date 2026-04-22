from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.core import DB_dependecy
from app.core.auth.security import get_current_user
from app.modules.ai_agents.core.rh_agent.graph import generate_stream
from app.modules.ai_agents.schemas.RhAgentShemas import ChatRequest

rh_agent_router = APIRouter(prefix="/v1/rh-agent", tags=["Rh Agent"], dependencies=[Depends(get_current_user)])


@rh_agent_router.post("/chat")
async def chat(data:ChatRequest, session:DB_dependecy):
    return StreamingResponse(
        generate_stream(data.message, data.thread_id,session),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        }
    )