'''

    the ETL pipelines must be kept organized as it found
    don't miss with the order of them , this can make errors and conflicts
    on filling the main DB

'''


from app.core.ETL.Piplines.ETL_AttEvents import ETL_AttEvents
from app.core.ETL.Piplines.ETL_Attendance import ETL_Attendances
from app.core.ETL.Piplines.ETL_Employee import ETL_employees
from app.core.ETL.Piplines.ETL_EmployeeAttEvents import ETL_EmpAttEvents
from app.core.ETL.Piplines.ETL_Members import ETL_Members
from app.core.ETL.Piplines.ETL_Projects import ETL_Projects
from app.core.ETL.Piplines.ETL_department import ETL_departments
from app.core.database.models import Employee, EmployeeAttendanceEvent, Attendance, Project, Member, AttendanceEvent, \
    Department

import time
from fastapi import HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


async def MainPipeline(db: AsyncSession):
    total_start = time.perf_counter()

    try:
        # ---- TRUNCATE ----
        start = time.perf_counter()
        '''async with db.begin():
            await db.execute(text("""
                TRUNCATE TABLE 
                    employee_attendance_event,
                    attendance_events,
                    members,
                    projects,
                    attendance,
                    employees,
                    departments
                RESTART IDENTITY CASCADE;
            """))'''
        yield {
            "step": "truncate",
            "time": time.perf_counter() - start
        }

        # ---- ETL: departments ----
        start = time.perf_counter()
        await ETL_departments(db)
        yield {
            "step": "departments",
            "time": time.perf_counter() - start
        }

        # ---- ETL: employees ----
        start = time.perf_counter()
        await ETL_employees(db)
        yield {
            "step": "employees",
            "time": time.perf_counter() - start
        }

        # ---- ETL: attendance ----
        start = time.perf_counter()
        await ETL_Attendances(db)
        yield {
            "step": "attendance",
            "time": time.perf_counter() - start
        }

        # ---- ETL: projects ----
        start = time.perf_counter()
        await ETL_Projects(db)
        yield {
            "step": "projects",
            "time": time.perf_counter() - start
        }

        # ---- ETL: members ----
        start = time.perf_counter()
        await ETL_Members(db)
        yield {
            "step": "members",
            "time": time.perf_counter() - start
        }

        # ---- ETL: attendance events ----
        start = time.perf_counter()
        await ETL_AttEvents(db)
        yield {
            "step": "attendance_events",
            "time": time.perf_counter() - start
        }

        # ---- ETL: employee attendance events ----
        start = time.perf_counter()
        await ETL_EmpAttEvents(db)
        yield {
            "step": "employee_attendance_events",
            "time": time.perf_counter() - start
        }

        # ---- TOTAL ----
        yield {
            "step": "total",
            "time": time.perf_counter() - total_start
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))