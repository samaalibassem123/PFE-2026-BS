import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel



class UserSchema(BaseModel):
    email:str
    password:str

class UserCreateSchema(BaseModel):
    username:str
    email:str
    password:str
    role:str


class UserResponseSchema(BaseModel):
    id:UUID
    username:str | None
    email:str
    role:str
    created_at:datetime.datetime


class UserUpdateData(BaseModel):
    username:Optional[str]
    email:Optional[str]
    role:Optional[str]


class UsersNumberSchema(BaseModel):
    total_users: int
    total_admins: int
    total_rh: int
    total_projectM: int