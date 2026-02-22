from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Employee


class EmployeesLeaveService:
    @staticmethod
    async def get_employees_leave(db:AsyncSession, limit: int = 50,offset: int = 0):
        # get employees with their attendance events
        stm = (select(EmployeeAttendanceEvent)
               .options(
            joinedload(EmployeeAttendanceEvent.employee),
                    joinedload(EmployeeAttendanceEvent.event))
               .limit(limit)
               .offset(offset))
        try:
            emps_leave = await db.execute(stm)
            return emps_leave.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))