from fastapi import HTTPException
from sqlalchemy import text
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database.models import (
    Department, Employee, Attendance, Project,
    Member, AttendanceEvent, EmployeeAttendanceEvent,
)


class LoaderService:
    BATCH_SIZE = 3000

    @staticmethod
    async def _upsert(
            model,
            rows: list[dict],
            db: AsyncSession,
            conflict_columns: list[str],
    ) -> bool:
        """Generic upsert helper: insert rows and update on conflict."""
        if not rows:
            return True

        try:
            for i in range(0, len(rows), LoaderService.BATCH_SIZE):
                batch = rows[i: i + LoaderService.BATCH_SIZE]

                #  Pass each row individually to avoid flat tuple binding
                stmt = pg_insert(model).values([dict(row) for row in batch])

                update_cols = {
                    col: stmt.excluded[col]
                    for col in batch[0]
                    if col not in conflict_columns
                }

                upsert_stmt = (
                    stmt.on_conflict_do_update(
                        index_elements=conflict_columns,
                        set_=update_cols,
                    )
                    if update_cols
                    else stmt.on_conflict_do_nothing(
                        index_elements=conflict_columns,
                    )
                )

                await db.execute(upsert_stmt)

            await db.commit()
            return True

        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=400, detail=str(e))
    @staticmethod
    async def bulk_insert(table_name: str, rows: list[dict], db: AsyncSession) -> bool:
        """Raw SQL bulk insert (kept for backward compatibility)."""
        if not rows:
            return True

        try:
            columns = rows[0].keys()
            col_str = ", ".join(columns)
            val_str = ", ".join([f":{col}" for col in columns])

            query = text(f"INSERT INTO {table_name} ({col_str}) VALUES ({val_str})")

            for i in range(0, len(rows), LoaderService.BATCH_SIZE):
                batch = rows[i : i + LoaderService.BATCH_SIZE]
                await db.execute(query, batch)

            await db.commit()
            return True

        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def load_department(departments: list[Department], db: AsyncSession) -> bool:
        rows = [
            {
                "dep_id": d.id,
                "dep_name": d.name,
            }
            for d in departments
        ]
        return await LoaderService._upsert(Department, rows, db, conflict_columns=["dep_id"])

    @staticmethod
    async def load_employees(employees: list[Employee], db: AsyncSession) -> bool:
        rows = [
            {
                "emp_id": e.id,
                "emp_full_name": e.full_name,
                "emp_email": e.email,
                "hire_date": e.hire_date,
                "dep_id": e.department_id,
            }
            for e in employees
        ]
        return await LoaderService._upsert(Employee, rows, db, conflict_columns=["emp_id"])



    @staticmethod
    async def load_projects(projects: list[Project], db: AsyncSession) -> bool:
        rows = [
            {
                "id": p.id,
                "name": p.name,
                "identifier": p.identifier,
                "created_on": p.created_on,
                "updated_on": p.updated_on,
            }
            for p in projects
        ]
        return await LoaderService._upsert(Project, rows, db, conflict_columns=["id"])

    @staticmethod
    async def load_members(members: list[Member], db: AsyncSession) -> bool:
        rows = [
            {
                "id": m.id,
                "emp_id": m.emp_id,
                "project_id": m.project_id,
            }
            for m in members
        ]
        return await LoaderService._upsert(Member, rows, db, conflict_columns=["id"])

    @staticmethod
    async def load_att_events(events: list[AttendanceEvent], db: AsyncSession) -> bool:
        rows = [
            {
                "id": e.id,
                "name": e.name,
            }
            for e in events
        ]
        return await LoaderService._upsert(AttendanceEvent, rows, db, conflict_columns=["id"])

    @staticmethod
    async def load_attendance(attendances: list[Attendance], db: AsyncSession) -> bool:
        rows = [
            {
                "id": a.id,
                "emp_id": a.emp_id,
                "check_in": a.check_in,
                "check_out": a.check_out,
                "att_date": a.att_date,
                "week_day": a.week_day,
            }
            for a in attendances
        ]
        return await LoaderService._upsert(
            Attendance, rows, db,
            conflict_columns=["emp_id", "att_date", "week_day"]
        )

    @staticmethod
    async def load_emp_att_events(
            emp_events: list[EmployeeAttendanceEvent], db: AsyncSession
    ) -> bool:
        rows = [
            {
                "id": e.id,
                "emp_id": e.emp_id,
                "event_id": e.event_id,
                "apply_time": e.apply_time,
                "start_date": e.start_date,
                "end_date": e.end_date,
            }
            for e in emp_events
        ]
        return await LoaderService._upsert(
            EmployeeAttendanceEvent, rows, db,
            conflict_columns=["emp_id", "apply_time"]
        )