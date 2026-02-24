from pydantic import BaseModel
from datetime import date

class PorjectData(BaseModel):
    id:int
    name:str
    identifier:str
    created_on:date
    updated_on:date

class GetProjectsResponse(BaseModel):
    total:int
    data:list[PorjectData]