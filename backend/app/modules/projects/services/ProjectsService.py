from fastapi import HTTPException
from sqlalchemy import select, extract, func, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.sql.functions import user

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Project, UserProject, User
from app.modules.projects.schemas.ProjectSchemas import GetProjectsResponse
from app.modules.user.services import UserService


class ProjectsService:
    @staticmethod
    async def get_projects(user,db:AsyncSession, limit: int = 50,offset: int = 0, name:str|None=None, year:int|None=None, month:int|None=None):
        try:
            query = select(Project)
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
        print(users_id)
        try:
            projectUsers = []
            for user_id in users_id:
                # can only assign to project mangers
                user = await UserService.fetch_user_by_id(db,user_id)
                if user:
                    if user.role == "PROJECT_MANAGER":
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

    @staticmethod
    async def unassign_project(db: AsyncSession, project_id, users_id: list[str]):

        try:
            for user_id in users_id:
                await db.execute(delete(UserProject).where(UserProject.project_id==project_id ,UserProject.user_id==user_id))
                await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))


    @staticmethod
    async def assigned_users(db:AsyncSession, project_id, limit:int|None=50, offset:int|None=0, email:str|None=None):
        try:
            query = ((select(User, UserProject)
                     .join(UserProject, UserProject.user_id==User.id ))
                     .where(UserProject.project_id == project_id))
            if email:
                query = query.where(User.email.ilike(f"%{email}%"))

            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()

            result = await db.execute(query.offset(offset).limit(limit))
            users = result.scalars().all()

            return {
                "total":total,
                "data":users
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def non_assigned_users(db: AsyncSession, project_id, limit: int | None = 50, offset: int | None = 0,
                                 email: str | None = None):
        '''

        :param db: AsyncSession
        :param project_id: int
        :param limit: int | None = 50
        :param offset: int | None = 50
        :param email: str | None = None
        :return: none assigned users
        '''
        try:
            # left join to get all users that assigned and not assigned than filter the none assigned
            query = ((select(User)
                      .outerjoin(UserProject, (UserProject.project_id == project_id) & (UserProject.user_id == User.id)))
                     .where(UserProject.user_id == None, User.role == "PROJECT_MANAGER"))
            if email:
                query = query.where(User.email.ilike(f"%{email}%"))

            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()

            result = await db.execute(query.offset(offset).limit(limit))
            users = result.scalars().all()

            return {
                "total": total,
                "data": users
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))