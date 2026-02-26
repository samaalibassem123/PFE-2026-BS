from fastapi import HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import Employee, Department


class EmployeesServices:
    @staticmethod
    async def get_Employees(db:AsyncSession, limit: int = 50,offset: int = 0, fullname:str|None=None, email:str|None=None, department:str|None=None):
        try:
            #  get employees with their departments
            query = select(Employee, Department).join(Department,Employee.department_id == Department.id )

            if fullname:
                query = query.where(Employee.full_name.ilike(f"%{fullname}%"))
            if email:
                query = query.where(Employee.email.ilike(f"%{email}%"))
            if department:
                query = query.where(Department.name == department)


            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            result = await db.execute(query
                        .options(joinedload(Employee.department))
                        .limit(limit)
                        .offset(offset)
            )

            employees =  result.scalars().all()
            return {
                "total":total,
                "data":employees
            }
        except Exception as e:
            raise HTTPException(status_code=400,  detail=str(e))

    @staticmethod
    async def get_departments(db:AsyncSession):
        try:
            departments = await db.execute(select(Department))
            return departments.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
