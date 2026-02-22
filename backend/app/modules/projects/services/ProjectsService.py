from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Project, UserProject


class ProjectsService:
    @staticmethod
    async def get_projects(db:AsyncSession, limit: int = 50,offset: int = 0):
        try:
            projects = await db.execute(select(Project).limit(limit).offset(offset))
            return projects.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def assign_project(db:AsyncSession, project_id, users_id:list[str]):
        try:
            projectUsers = []
            for user_id in users_id:
                projectUser = {
                    "user_id":user_id,
                    "project_id":project_id
                }
                projectUsers.append(UserProject(**projectUser))
            db.add_all(projectUsers)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
