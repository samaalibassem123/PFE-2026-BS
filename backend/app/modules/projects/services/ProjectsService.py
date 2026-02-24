from fastapi import HTTPException
from sqlalchemy import select, extract, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Project, UserProject
from app.modules.projects.schemas.ProjectSchemas import GetProjectsResponse


class ProjectsService:
    @staticmethod
    async def get_projects(user:dict,db:AsyncSession, limit: int = 50,offset: int = 0, name:str|None=None, year:int|None=None, month:int|None=None):
        try:
            query = select(Project, UserProject)
            if user['role']=="PROJECT_MANAGER": # get only the project that assigned to the PM
                query = query.join(UserProject, Project.id == UserProject.project_id).where(UserProject.user_id == user['id'])
            if name:
                query = query.where(Project.name.ilike(f"%{name}%"))
            if year:
                query = query.where(extract("year", Project.created_on) == year)
            if month:
                query = query.where(extract("month", Project.created_on) == month)

            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            result = await db.execute(query.limit(limit).offset(offset))
            projects =  result.scalars().all()

            return {
                "total":total,
                "data":projects
            }
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
