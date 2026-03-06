from pydantic import BaseModel
from datetime import datetime

from app.modules.employees.schemas.EmployeesSchema import EmployeeData, DepartmentData


class CheckinoutData(BaseModel):
    check_in: datetime
    check_out: datetime
    att_date: datetime
    week_day: int
    employee: EmployeeData
    department:DepartmentData

class GetCheckinoutRespone(BaseModel):
    total:int
    data:CheckinoutData