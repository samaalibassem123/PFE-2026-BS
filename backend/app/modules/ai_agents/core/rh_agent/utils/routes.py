
from app.modules.ai_agents.core.rh_agent.utils.states import AgentState


async def intent_route(state:AgentState):
    if state["intent"] == "chat":
        return "chat_node"
    return "schema_inspector"


async def valid_query_route(state:AgentState):
    if state["sql_is_safe"]:
        return "execute_query"

    return "handle_error"

async def execution_route(state:AgentState):
    if state["error"]:
        return "handle_error"
    return "generate_response"