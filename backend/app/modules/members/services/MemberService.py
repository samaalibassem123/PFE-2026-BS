from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import Member, Employee, Project, UserProject


class MemberService:
    @staticmethod
    async def get_members(userid,db:AsyncSession, limit: int = 50,offset: int = 0):

        try:
            stm = (select(Member, UserProject)
            .join(UserProject, Member.project_id == UserProject.project_id)
            .options(joinedload(Member.employee),
                     joinedload(Member.project))
            .where(UserProject.user_id == str(userid) )
            .limit(limit)
            .offset(offset))

            members = await db.execute(stm)
            return members.scalars().all()

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))