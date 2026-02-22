from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import Employee, Department


class EmployeesServices:
    @staticmethod
    async def get_Employees(db:AsyncSession, limit: int = 50,offset: int = 0):
        try:
            #  get employees with their departments
            stm = select(Employee).options(joinedload(Employee.department)).limit(limit).offset(offset)

            employees = await db.execute(stm)

            return employees.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400,  detail=str(e))

