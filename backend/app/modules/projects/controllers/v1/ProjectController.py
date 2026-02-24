from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user
from app.modules.projects.schemas.ProjectSchemas import GetProjectsResponse
from app.modules.projects.services.ProjectsService import ProjectsService

projects_router = APIRouter(prefix='/v1/projects', tags=['Projects'])

@projects_router.get('/', response_model=GetProjectsResponse)
async def get_projects(db:DB_dependecy,
                       limit: int = 50,
                       offset: int = 0,
                       name:str|None=None,
                       year:int|None=None,
                       month:int|None=None,
                       user=Depends(get_current_user)):
    projects = await ProjectsService.get_projects(user,db,limit,offset,name, year, month)
    return projects

@projects_router.post('/assign')
async def assign_project(db:DB_dependecy, project_id:int ,users_id:list[str]):
    res = await ProjectsService.assign_project(db, project_id, users_id)
    return res
