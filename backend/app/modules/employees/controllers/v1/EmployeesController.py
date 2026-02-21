from fastapi import APIRouter

from app.core import DB_dependecy
from app.core.external_database import Biotime_DB, EasyProject_DB

employees_router = APIRouter(prefix="/v1/employees", tags=["Employees"])

'''
    this api fill the department table at first than the employees table
'''
@employees_router.post('/fill_table')
async def fill_employee_table(db:DB_dependecy):
    print('-------------------- BIOTIME --------------------')
    Biotime_DB.get_BiotimeEmployees()
    print('-------------------- DEPARTMENT --------------------')
    Biotime_DB.get_BiotimeDepratments()
    print('-------------------- PAYCODE --------------------')
    Biotime_DB.get_BiotimeAttPaycode()
    print('-------------------- ATT LEAVE --------------------')
    Biotime_DB.get_BiotimeAttLeave()
    print('-------------------- CHECK IN OUT --------------------')
    Biotime_DB.get_BiotimeCheckInOut()

    print('----------------- Easy Project ----------------')
    EasyProject_DB.get_projects()
    print('----------------- Easy MEMBERS ----------------')

    EasyProject_DB.get_members()
    print('----------------- Easy ATTENDANCE ACT ----------------')

    EasyProject_DB.get_easy_attendance_activities()
    print('----------------- Easy ATTENDANCE ----------------')

    EasyProject_DB.get_attendance()
    print('----------------- Easy EMPLOYEES ----------------')

    EasyProject_DB.get_employees()
