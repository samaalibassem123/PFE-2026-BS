from fastapi import HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import Member, Employee, Project, UserProject


class MemberService:
    @staticmethod
    async def get_members(userid,db:AsyncSession, limit: int = 50,offset: int = 0, member_name:str|None=None,member_email:str|None=None,project_name:str|None=None):

        try:

            query = (select(Member, UserProject, Employee, Project)
                     .join(UserProject, Member.project_id == UserProject.project_id)
                     .join(Employee, Member.emp_id == Employee.id)
                     .join(Project, Member.project_id == Project.id)
                     .where(UserProject.user_id == str(userid) ))

            if member_name:
                query = query.where(Employee.full_name.ilike(f"%{member_name}%"))
            if member_email:
                query = query.where(Employee.email.ilike(f"%{member_email}%"))
            if project_name:
                query = query.where(Project.name.ilike(f"%{project_name}%"))


            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            result = await db.execute(query
                                        .options(
                joinedload(Member.employee),
                        joinedload(Member.project))
                                       .limit(limit)
                                       .offset(offset)
            )
            members = result.scalars().all()

            return {
                "total":total,
                "data":members
            }

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))