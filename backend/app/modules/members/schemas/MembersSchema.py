from pydantic import BaseModel

from app.modules.employees.schemas.EmployeesSchema import EmployeeData
from app.modules.projects.schemas.ProjectSchemas import ProjectData


class MembersData(BaseModel):
    id:int
    project:ProjectData
    employee:EmployeeData

class GetMembersResponse(BaseModel):
    total:int
    data:list[MembersData]