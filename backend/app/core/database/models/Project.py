from datetime import datetime
from enum import Enum as PyEnum
from typing import List, Optional
from uuid import UUID, uuid4

from sqlalchemy import (
    ForeignKey,
    String,
    Text,
    Integer,
    DateTime,
    func,
    Enum as SAEnum,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from app.core.database.models.Base import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    identifier: Mapped[Optional[str]] = mapped_column(String(50), unique=True, nullable=True)
    created_on: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_on: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), onupdate=func.now()
    )

    # Relationships
    members: Mapped[List["Member"]] = relationship(
        back_populates="project", cascade="all, delete-orphan"
    )
    user_projects: Mapped[List["UserProject"]] = relationship(
        back_populates="project", cascade="all, delete-orphan"
    )