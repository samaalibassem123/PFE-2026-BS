from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY:str
    ALGORITHMS:str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    DATABASE_URL:str
    ALEMBIC_DATABASE_URL:str
    POSTGRES_USER:str
    POSTGRES_PASSWORD:str
    POSTGRES_HOST:str
    POSTGRES_PORT:int
    POSTGRES_DB:str

    class Config:
        env_file = ".env"

settings = Settings()


