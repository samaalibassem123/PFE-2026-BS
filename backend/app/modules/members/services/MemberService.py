from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import  Member, Employee, Project


class MemberService:
    @staticmethod
    async def get_members(db:AsyncSession, limit: int = 50,offset: int = 0):
        stm = (select(Member, Employee, Project)
               .join(Project,Member.project_id == Project.id)
               .join(Employee, Member.emp_id == Employee.id).limit(limit).offset(offset))
        try:
            members = await db.execute(stm)
            return members.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))