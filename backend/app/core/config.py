from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Main app confic
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

    # Biotime DB / type : Postgress Db
    PG_USER:str
    PG_PASSWORD:str
    PG_HOST:str
    PG_PORT:str
    PG_DB:str

    BIOTIME_DB_URL:str

    # EasyProject DB / type : Mysql DB
    MYSQL_USER:str
    MYSQL_PASSWORD:str
    MYSQL_HOST:str
    MYSQL_PORT:str
    MYSQL_DB:str

    EASY_PROJECT_URL:str


    class Config:
        env_file = ".env"

settings = Settings()


