from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_engine(settings.ALEMBIC_DATABASE_URL, echo=False)

session = sessionmaker(bind=engine)