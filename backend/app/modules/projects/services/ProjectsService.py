from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Project


class ProjectsService:
    @staticmethod
    async def get_projects(db:AsyncSession):
        try:
            projects = await db.execute(select(Project))
            return projects.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
