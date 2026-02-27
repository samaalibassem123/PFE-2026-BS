from pydantic import BaseModel
from datetime import datetime

from app.modules.employees.schemas.EmployeesSchema import EmployeeData


class EventData (BaseModel):
    id:int
    name:str


class EmployeeLeaveData(BaseModel):
    id:int
    apply_time:str
    start_date:str
    end_date:str
    employee:EmployeeData
    event:EventData


class GetEmployeeLeaveResponse(BaseModel):
    total:int
    data:list[EmployeeLeaveData]