from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import ChatOllama


from app.core.config import settings

gemma3_1b_llm = ChatOllama(
    model="gemma3:1b",
    temperature=0.3,
)
gemini3_flash_cloud_llm = ChatOllama(
    model="gemini-3-flash-preview:cloud",
    apî_key=settings.OLLAMA_API_KEY,
    temperature=0
)

qwen2_5_3b_llm = ChatOllama(
    model="qwen2.5:3b",
    temperature=0
)


# google
google_llm = ChatGoogleGenerativeAI(
    model="gemini-3-flash-preview",
    api_key=settings.GOOGLE_AI_KEY,
    temperature=0
)