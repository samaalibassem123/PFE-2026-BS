from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Employee


class EmployeesLeaveService:
    @staticmethod
    async def get_employees_leave(db:AsyncSession):
        # get employees with their attendance events
        stm = (select(EmployeeAttendanceEvent, AttendanceEvent, Employee)
               .join(AttendanceEvent, EmployeeAttendanceEvent.event_id == AttendanceEvent.id)
               .join(Employee ,EmployeeAttendanceEvent.emp_id == Employee.id))
        try:
            emps_leave = await db.execute(stm)
            return emps_leave.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))