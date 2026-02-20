from __future__ import annotations

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

class UserProject(Base):
    """Many-to-many between users and projects + role in project"""
    __tablename__ = "user_project"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"))

    user: Mapped["User"] = relationship(back_populates="projects")
    project: Mapped["Project"] = relationship(back_populates="user_projects")