import datetime
from uuid import UUID

from pydantic import BaseModel



class UserSchema(BaseModel):
    email:str
    password:str

class UserCreateSchema(BaseModel):
    email:str
    password:str
    role:str

class UserResponseSchema(BaseModel):
    id:UUID
    email:str
    role:str
    created_at:datetime.datetime
