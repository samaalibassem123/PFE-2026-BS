from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.employees.services.EmployeesServices import EmployeesServices

employees_router = APIRouter(prefix="/v1/employees", tags=["Employees"])


@employees_router.post('/')
async def get_employees(db:DB_dependecy, limit: int = 50,offset: int = 0):
     employees = await EmployeesServices.get_Employees(db, limit,offset)
     return employees
