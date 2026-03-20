from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig

from langgraph.checkpoint.memory import MemorySaver
from langgraph.constants import START, END
from langgraph.graph import StateGraph
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai_agents.core.rh_agent.utils.nodes import chat_node, schema_inspector, query_generator, \
    intent_classification, execute_query, generate_response
from app.modules.ai_agents.core.rh_agent.utils.states import  AgentState


async def intent_route(state:AgentState):
    if state["intent"] == "chat":
        return "chat_node"
    return "schema_inspector"



def node_wrapper(fn):
    async def wrapper(state, config:RunnableConfig):
        session = config["configurable"]["session"]
        if "session" in fn.__code__.co_varnames:
            return await fn(state,session)
        return await fn(state)
    return wrapper



builder = StateGraph(AgentState)

# nodes
builder.add_node("intent_class", node_wrapper(intent_classification))
builder.add_node("schema_inspector", node_wrapper(schema_inspector))
builder.add_node("query_generator", node_wrapper(query_generator))
builder.add_node("execute_query", node_wrapper(execute_query))
builder.add_node("generate_response", node_wrapper(generate_response))
builder.add_node("chat_node",node_wrapper(chat_node))

# graph
builder.set_entry_point("intent_class")
builder.add_conditional_edges("intent_class", intent_route)


builder.add_edge("schema_inspector", "query_generator")
builder.add_edge("query_generator", "execute_query")
builder.add_edge("execute_query", "generate_response")


builder.add_edge("generate_response", END)
builder.add_edge("chat_node",END)

# Memory
checkpointer = MemorySaver()

graph = builder.compile(checkpointer=checkpointer)


import json

async def generate_stream(message: str, thread_id: str,session:AsyncSession):
    config = RunnableConfig(
        configurable={
            "thread_id":thread_id,
            "session":session
        }
    )
    inputs = {
        "messages": [HumanMessage(content=message)],
        "user_input":message
    }

    try:
        async for event in graph.astream_events(inputs, config, version="v2"):
            event_type = event["event"]
            name = event.get("name", "")
            print(event_type, name)

          


            # return only AI response
            if event["event"] == "on_chat_model_stream" :
                token = event["data"]["chunk"].content

                if token:
                    yield json.dumps({
                        "type": "token",
                        "content": token
                    }) + "\n"

    except Exception as e:
        yield json.dumps({"type": "error", "content": str(e)}) + "\n"