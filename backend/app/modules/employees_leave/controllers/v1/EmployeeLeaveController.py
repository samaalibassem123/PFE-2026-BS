from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.employees_leave.services.EmployeesLeaveService import EmployeesLeaveService

employees_leave_router = APIRouter(prefix='/v1/emp_leave', tags=['Employees Leave'])

@employees_leave_router.get('/')
async def get_employees_leave(db:DB_dependecy):
    employees_leave = await EmployeesLeaveService.get_employees_leave(db)
    return employees_leave

