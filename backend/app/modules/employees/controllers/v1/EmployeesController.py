from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user, require_role
from app.modules.employees.services.EmployeesServices import EmployeesServices

employees_router = APIRouter(prefix="/v1/employees", tags=["Employees"], dependencies=[Depends(get_current_user)])


@employees_router.get('/', dependencies=[Depends(require_role(["RH"]))])
async def get_employees(db:DB_dependecy,
                        limit: int = 50,
                        offset: int = 0,
                        fullname:str|None=None,
                        email:str|None=None,
                        department:str|None=None):
     employees = await EmployeesServices.get_Employees(db, limit,offset, fullname, email, department)
     return employees

@employees_router.get('/departments')
async def get_departments(db:DB_dependecy):
     departments = await EmployeesServices.get_departments(db)
     return departments


@employees_router.get('/by_department')
async def get_employees_by_depart(db:DB_dependecy):
     emp_count  = await EmployeesServices.get_employees_by_depart(db)
     return emp_count