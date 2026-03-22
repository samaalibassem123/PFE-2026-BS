'''

    the ETL pipelines must be kept organized as it found
    don't miss with the order of them , this can make errors and conflicts
    on filling the main DB

'''
from fastapi import HTTPException
from sqlalchemy import text, delete
from sqlalchemy.ext.asyncio import AsyncSession

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
from sqlalchemy import delete

async def MainPipeline(db):
    total_start = time.perf_counter()

    try:
        # Departments
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(Department))
            await ETL_departments(db)
            print(f"Departments: {time.perf_counter() - start:.4f}s")

        # Employees
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(Employee))
            await ETL_employees(db)
            print(f"Employees: {time.perf_counter() - start:.4f}s")

        # Attendance
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(Attendance))
            await ETL_Attendances(db)
            print(f"Attendance: {time.perf_counter() - start:.4f}s")

        # Projects
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(Project))
            await ETL_Projects(db)
            print(f"Projects: {time.perf_counter() - start:.4f}s")

        # Members
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(Member))
            await ETL_Members(db)
            print(f"Members: {time.perf_counter() - start:.4f}s")

        # Attendance Events
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(AttendanceEvent))
            await ETL_AttEvents(db)
            print(f"Attendance Events: {time.perf_counter() - start:.4f}s")

        # Employee Attendance Events
        async with db.begin():
            start = time.perf_counter()
            await db.execute(delete(EmployeeAttendanceEvent))
            await ETL_EmpAttEvents(db)
            print(f"Employee Attendance Events: {time.perf_counter() - start:.4f}s")

        print(f"Total: {time.perf_counter() - total_start:.4f}s")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))