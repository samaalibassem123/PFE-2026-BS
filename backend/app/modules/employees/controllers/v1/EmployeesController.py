from fastapi import APIRouter

from app.core import DB_dependecy
from app.core.external_database import Biotime_DB, EasyProject_DB

employees_router = APIRouter(prefix="/v1/employees", tags=["Employees"])

@employees_router.post('/fill_table')
async def fill_employee_table(db:DB_dependecy):
    EasyProject_DB.get_attendance()
    Biotime_DB.get_BiotimeEmploye()
