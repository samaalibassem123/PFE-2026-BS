from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_engine(settings.ALEMBIC_DATABASE_URL, echo=True)

session = sessionmaker(bind=engine , expire_on_commit=False)