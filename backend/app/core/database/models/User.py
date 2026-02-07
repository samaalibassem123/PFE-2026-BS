from datetime import datetime


from sqlalchemy import UUID, text, DateTime, func, String
from sqlalchemy.orm import Mapped, mapped_column


from .Base import Base
import uuid

class User(Base):
    __tablename__ = 'user'
    id :Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True),primary_key=True, default=uuid.uuid4, server_default=text("uuid_generate_v4()"))
    email:Mapped[str] = mapped_column(String)
    password:Mapped[str] = mapped_column(String)
    role:Mapped[str] = mapped_column(String)
    created_at:Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())

