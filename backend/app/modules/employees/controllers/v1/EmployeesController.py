from fastapi import APIRouter

from app.core import DB_dependecy


employees_router = APIRouter(prefix="/v1/employees", tags=["Employees"])

'''
    this api fill the department table at first than the employees table
'''
@employees_router.post('/fill_table')
async def fill_employee_table(db:DB_dependecy):
    pass
