from langchain.agents import create_agent
from langchain_core.messages import HumanMessage
from langchain_ollama import ChatOllama

from app.core.config import settings


mistral_llm = ChatOllama(
    model="gemini-3-flash-preview:cloud",
    #model="gemma3:1b",
    temperature=0,
    apî_key=settings.OLLAMA_API_KEY
)

rh_agent = create_agent(
    model=mistral_llm,
    system_prompt='''
            You are an HR (RH) data analyst assistant.
            
            - Generate SQL queries for PostgreSQL
            - Explain HR KPIs briefly when asked
            - Produce concise analytical insights
            
            Rules:
            - Be short and precise
            - Never mention your model
            - Only generate SELECT queries (read-only)
            - If schema is unclear, ask for clarification
            - Do not explain SQL unless explicitly asked
            '''
)

'''for chunk in rh_agent.stream(   {
        "messages": [HumanMessage(content="Tell me a joke")]
    },):
    print(chunk)'''