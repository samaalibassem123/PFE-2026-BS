from uuid import UUID

from pydantic import BaseModel
from datetime import datetime

from app.modules.user.schemas.User import UserResponseSchema


class ProjectData(BaseModel):
    id:int
    name:str
    identifier:str
    created_on:datetime
    updated_on:datetime

class GetProjectsResponse(BaseModel):
    total:int
    data:list[ProjectData]






class GetAssignedUsersResponse(BaseModel):
    total: int
    data: list[UserResponseSchema]

class GetNoneAssignedUsersResponse(GetAssignedUsersResponse):
    pass


class AssignProjectData(BaseModel):
    project_id: int
    users_id: list[str]