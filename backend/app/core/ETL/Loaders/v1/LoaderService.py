from fastapi import HTTPException
from sqlalchemy import insert, text
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database.models import Department, Employee, Attendance, Project, Member, AttendanceEvent, \
    EmployeeAttendanceEvent


class LoaderService:
    BATCH_SIZE = 3000

    @staticmethod
    async def bulk_insert(table_name: str, rows: list[dict], db: AsyncSession):
        try:
            if not rows:
                return True

            columns = rows[0].keys()
            col_str = ", ".join(columns)
            val_str = ", ".join([f":{col}" for col in columns])

            query = text(f"""
                   INSERT INTO {table_name} ({col_str})
                   VALUES ({val_str})
               """)

            for i in range(0, len(rows), LoaderService.BATCH_SIZE):
                batch = rows[i:i + LoaderService.BATCH_SIZE]
                await db.execute(query, batch)

            await db.commit()
            return True

        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=400, detail=str(e))


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
            await LoaderService.bulk_insert("members", [
        {
            "emp_id": m.emp_id,
            "project_id": m.project_id
        }
        for m in members
    ], db)

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
