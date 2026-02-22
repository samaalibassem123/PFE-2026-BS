from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import Employee, Department


class EmployeesServices:
    @staticmethod
    async def get_Employees(db:AsyncSession):
        try:
            # first get employees with their departments
            employees = await db.execute(select(Employee, Department).join(Department, Employee.department_id == Department.id))
            return employees.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400,  detail=str(e))

