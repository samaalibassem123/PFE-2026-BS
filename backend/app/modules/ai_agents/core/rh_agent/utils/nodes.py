import asyncio

from langchain_core.messages import SystemMessage, HumanMessage
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.ai_agents.core.rh_agent.utils.agent import rh_agent
from app.modules.ai_agents.core.rh_agent.utils.contexts import get_table_context, get_last_user_message
from app.modules.ai_agents.core.rh_agent.utils.states import AgentState


async def intent_classification(state: AgentState):
    try:
        user_input = state["user_input"]
        prompt = f"""
        You are an intent classification system for an assistant.

        Your job is to classify the user input into ONLY ONE label:

        - "chat": greetings, explanations, opinions, general questions, or conversations that do NOT require database access.
        - "database": any request that involves retrieving, filtering, listing, updating, or querying structured data (e.g. employees, users, orders, reports).

        IMPORTANT RULES:
        - If the user asks to "show", "list", "get", "find", "display", or "retrieve" data → classify as "database"
        - If the request mentions business entities like employees, customers, orders, sales, KPIs → likely "database"
        - If the request is conceptual or conversational → "chat"

        OUTPUT RULE:
        Return ONLY one word: chat or database. No explanation.

        EXAMPLES:

        Input: Hello, how are you?
        Output: chat

        Input: Explain what a KPI is
        Output: chat

        Input: Show me all employees
        Output: database

        Input: Get users who signed up last week
        Output: database

        Input: Can you help me understand SQL joins?
        Output: chat

        Now classify:

        Input: {user_input}
        Output:
        """


        SystemPrompt = {
            "messages":[SystemMessage(prompt)]
        }
        response = await rh_agent.ainvoke(SystemPrompt)

        intent = response["messages"][-1].content.strip().lower()  # No await needed

        if intent not in ("chat", "database"):
            intent = "chat"

        print("intent:", intent)

        return {"intent": intent}
    except Exception as e:
        print(e)
        return {"error":e, "intent":"chat"}

async def schema_inspector(state:AgentState, session:AsyncSession):
    context = await get_table_context(session,["employees","departments"])
    print(context)
    return {
        "db_context":context
    }

async def query_generator(state:AgentState, session:AsyncSession):
    try:
        last_message = get_last_user_message(state.get("messages", []))
        if not last_message:
            return {
                "error":"Message doest not exist"
            }
        prompt = f"""You are a PostgreSQL expert. Write ONE efficient SELECT query.
                Rules:
                - Use WHERE, LIMIT, GROUP BY, and date filters aggressively — the tables have 5000+ rows
                - Never SELECT * on large tables — name only the columns you need
                - Use CTEs for complex logic
                - Return ONLY the SQL, nothing else
                
                Schema:
                {state["db_context"]}
                
                Question: {last_message.content}
                """
        SystemPrompt = {
            "messages":[SystemMessage(content=prompt)]
        }
        query = ((await rh_agent.ainvoke(SystemPrompt))
                 ["messages"][-1].
                 content.
                 strip().
                 strip("```sql").strip("```").strip()
                 )
        print("query:" ,query)
        return {
            "sql_query":query
        }
    except Exception as e:
        print(e)
        return {"error":str(e)}


async def execute_query(state:AgentState, session:AsyncSession):
    try:
        query = state["sql_query"]

        result = await session.execute(text(query))

        query_result = '\n'.join(result.scalars().all())
        print("query result : " , query_result)
        return {
            "query_result":query_result
        }
    except Exception as e:
        print(e)
        return {
            "error":e,
            "query_result":"found nothing"
        }

async def generate_response(state:AgentState):
    query_result = state["query_result"]
    prompt = f"""
        You are a senior data analyst. Write a professional Markdown report.
        
        Include:
        1. Executive summary (2-3 sentences)
        2. Key findings (bullet points)
        3. Data table of the most important rows
        4. Recommendations or next steps
        
        Original question: {state["user_input"]}
        
        SQL used:
        ```sql
        {state['sql_query']}
        ```
        
        Data summary:
        {query_result}
        """
    SystemPrompt = {
        "messages":[
            SystemMessage(prompt)
        ]
    }
    llm_response = await rh_agent.ainvoke(SystemPrompt)

    return {
        "messages":state["messages"] + llm_response["messages"][-1]
    }

async def chat_node(state: AgentState):
    result = await rh_agent.ainvoke({
        "messages": state["messages"]
    })

    return {
        "messages":state["messages"]+ [result["messages"][-1]]
    }


