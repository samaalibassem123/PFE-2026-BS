import datetime

from fastapi import HTTPException
from sqlalchemy import select, func, extract
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import Attendance, Employee


class CheckinOutService:
    @staticmethod
    async def get_checkinouts(db:AsyncSession, limit:int=50, offset:int=0, fullname:str | None = None, email: str | None = None,  start_date:int|None=None, end_date:int|None=None):
        try:
            query = select(Attendance, Employee).join(Employee, Attendance.emp_id == Employee.id )

            # filters
            if fullname :
                query = query.where(Employee.full_name.ilike(f"%{fullname}%"))
            if email:
                query = query.where(Employee.email.ilike(f"%{email}%"))
            if start_date and end_date:
                query = query.where(
                    extract("year",Attendance.att_date) >= start_date,
                    extract("year", Attendance.att_date) <= end_date
                    )

            # total numbers of attendace
            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            # result with pagination
            result = await db.execute(query.options(joinedload(Attendance.employee)).limit(limit).offset(offset))
            checkinouts = result.scalars().all()

            return {
                "total":total,
                "data":checkinouts
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))