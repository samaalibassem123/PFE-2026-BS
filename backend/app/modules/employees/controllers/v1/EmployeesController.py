from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.employees.services.EmployeesServices import EmployeesServices

employees_router = APIRouter(prefix="/v1/employees", tags=["Employees"])


@employees_router.get('/')
async def get_employees(db:DB_dependecy, limit: int = 50,offset: int = 0, fullname:str|None=None, email:str|None=None, department:str|None=None):
     employees = await EmployeesServices.get_Employees(db, limit,offset, fullname, email, department)
     return employees

@employees_router.get('/departments')
async def get_departments(db:DB_dependecy):
     departments = await EmployeesServices.get_departments(db)
     return departments