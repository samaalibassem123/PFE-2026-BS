from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.employees_leave.services.EmployeesLeaveService import EmployeesLeaveService

employees_leave_router = APIRouter(prefix='/v1/emp_leave', tags=['Employees Leave'])

@employees_leave_router.get('/')
async def get_employees_leave(db:DB_dependecy, limit: int = 50,offset: int = 0, fullname:str|None = None,email:str|None = None, event:str|None = None):
    employees_leave = await EmployeesLeaveService.get_employees_leave(db, limit,offset, fullname,email, event)
    return employees_leave

