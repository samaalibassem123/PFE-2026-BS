import datetime
from uuid import UUID

from pydantic import BaseModel


class UserLoginRequest(BaseModel):
    email:str
    password:str

class UserLoginRespone(BaseModel):
    id:UUID
    email:str
    role:str
    created_at:datetime.datetime
