from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database.models import Department, Employee, Attendance, Project, Member, AttendanceEvent, \
    EmployeeAttendanceEvent


class LoaderService:
    @staticmethod
    async def load_department(departments:list[Department],db:AsyncSession):
        try:
            db.add_all(departments)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_employees(employees:list[Employee],db:AsyncSession):
        try:
            db.add_all(employees)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_attendance(attendaces: list[Attendance], db: AsyncSession):
        try:
            db.add_all(attendaces)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_projects(projects: list[Project], db: AsyncSession):
        try:
            db.add_all(projects)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_members(members: list[Member], db: AsyncSession):
        try:
            db.add_all(members)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_att_events(events: list[AttendanceEvent], db: AsyncSession):
        try:
            db.add_all(events)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_emp_att_events(emp_events: list[EmployeeAttendanceEvent], db: AsyncSession):
        try:
            db.add_all(emp_events)
            await db.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
