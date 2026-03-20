from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.core import DB_dependecy
from app.modules.ai_agents.core.rh_agent.graph import generate_stream
from app.modules.ai_agents.schemas.RhAgentShemas import ChatRequest

rh_agent_router = APIRouter(prefix="/v1/rh-agent", tags=["Rh Agent"])


@rh_agent_router.post("/chat")
async def chat(data:ChatRequest, session:DB_dependecy):
    return StreamingResponse(
        generate_stream(data.message, data.thread_id,session),
        media_type = "text/plain"
    )