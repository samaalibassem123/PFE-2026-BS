import datetime
from typing import Any, Optional
from uuid import UUID

from pydantic import BaseModel

from app.core.database.models import PendingUsersStatus


class ApproveUserRequest(BaseModel):
    email:str
    username:Optional[str]
    status:PendingUsersStatus

class DeleteUserRequest(BaseModel):
    email:str

class PendingUserData(BaseModel):
    id: Optional[UUID] = None
    email: str
    user: dict[str,Any]
    status:PendingUsersStatus
    created_at: Optional[datetime.date] = None
    approved_at: Optional[datetime.date] = None

class GetPendingUsersData(BaseModel):
    data:list[PendingUserData]
    total:int