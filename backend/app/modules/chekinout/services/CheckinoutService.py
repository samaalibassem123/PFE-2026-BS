from fastapi import HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import Attendance, Employee


class CheckinOutService:
    @staticmethod
    async def get_checkinouts(db:AsyncSession, limit:int=50, offset:int=0, fullname:str | None = None, email: str | None = None, att_date:str|None=None):
        try:
            query = select(Attendance, Employee).join(Employee, Attendance.id == Employee.id )

            # filters
            if fullname :
                query = query.where(Employee.full_name.ilike(f"%{fullname}%"))
            if email:
                query = query.where(Employee.email.ilike(f"{email}"))
            if att_date :
                query = query.where(Attendance.att_date == att_date)
            # total numbers of attendace
            total = await db.execute(select(func.count()).select_from(query.subquery()))
            # result with pagination
            result = await db.execute(query.options(joinedload(Attendance.employee)).limit(limit).offset(offset))
            checkinouts = result.scalars().all()

            return {
                "total":total,
                "data":checkinouts
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))