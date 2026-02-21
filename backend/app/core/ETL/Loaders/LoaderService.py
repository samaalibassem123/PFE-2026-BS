from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core import DB_dependecy
from app.core.database.models import Department, Employee


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