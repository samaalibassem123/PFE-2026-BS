from typing import TypedDict, List, Annotated, Optional

from langchain_core.messages import BaseMessage
from langgraph.graph import add_messages


class AgentState(TypedDict):
    db_context:str
    messages: Annotated[list[BaseMessage], add_messages]
    user_input:str

    query_result:str

    intent:Optional[str]
    sql_query:Optional[str]
    error:Optional[str]