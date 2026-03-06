import datetime

from fastapi import HTTPException
from sqlalchemy import select, func, extract, cast, Date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Employee


class EmployeesLeaveService:
    @staticmethod
    async def get_employees_leave(db:AsyncSession,
                                  limit: int = 50,
                                  offset: int = 0,
                                  fullname:str|None = None,
                                  email:str|None = None,
                                  event:str|None = None,
                                  start_date: datetime.date | None = None,
                                  end_date:datetime.date | None = None,
                                  month:int | None = None,
                                  day: int | None = None,
                                  ):

        try:
            query = (select(EmployeeAttendanceEvent, Employee, AttendanceEvent)
                     .join(Employee, EmployeeAttendanceEvent.emp_id==Employee.id)
                     .join(AttendanceEvent, EmployeeAttendanceEvent.event_id == AttendanceEvent.id)
                     )
            #filters
            if fullname:
                query = query.where(Employee.full_name.ilike(f"%{fullname}%"))
            if email:
                query = query.where(Employee.email.ilike(f"%{email}%"))
            if event:
                query = query.where(AttendanceEvent.name == event)

            # date filters
            if start_date and end_date:
                query = query.where(
                    cast(EmployeeAttendanceEvent.apply_time, Date).between(start_date, end_date)
                )
            elif start_date:
                query = query.where(cast(EmployeeAttendanceEvent.apply_time, Date) >= start_date)
            elif end_date:
                query = query.where(cast(EmployeeAttendanceEvent.apply_time, Date) <= end_date)

            if month:
                query = query.where(extract("month", EmployeeAttendanceEvent.apply_time) == month)
            if day:
                query = query.where(extract("day", EmployeeAttendanceEvent.apply_time) == day)



            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            # get employees with their attendance events
            result = await db.execute(query
                .options(
        joinedload(EmployeeAttendanceEvent.employee),
                joinedload(EmployeeAttendanceEvent.event))
               .limit(limit)
               .offset(offset))
            emps_leave = result.scalars().all()

            return {
                "total":total,
                "data":emps_leave
            }

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))