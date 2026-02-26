from pydantic import BaseModel
from datetime import datetime


class DepartmentData(BaseModel):
    id:int
    name:str

class GetEmployeesResponse(BaseModel):
    id: int
    full_name: str
    email: str
    hire_date: datetime
    department: DepartmentData

