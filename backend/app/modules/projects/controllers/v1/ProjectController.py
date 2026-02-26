from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user, require_role
from app.modules.projects.schemas.ProjectSchemas import GetProjectsResponse, GetAssignedUsersResponse, \
    GetNoneAssignedUsersResponse, AssignProjectData
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

@projects_router.post('/assign', dependencies=[Depends(require_role(["ADMIN"]))])
async def assign_project(db:DB_dependecy, data:AssignProjectData):
    res = await ProjectsService.assign_project(db, data.project_id, data.users_id)
    return res


@projects_router.delete('/unassign', dependencies=[Depends(require_role(["ADMIN"]))])
async def assign_project(db:DB_dependecy, data:AssignProjectData):
    res = await ProjectsService.unassign_project(db, data.project_id, data.users_id)
    return res

@projects_router.get("/assigned/users", response_model=GetAssignedUsersResponse, dependencies=[Depends(require_role(["ADMIN"]))])
async def assigned_users(db:DB_dependecy, project_id:int, limit:int|None=50, offset:int|None=0, email:str|None=None):
    '''

    :param db:
    :param project_id:
    :param limit:
    :param offset:
    :param email:
    :return: users

    this function get the users of a specific project that the admin assigned them to

    '''
    res = await ProjectsService.assigned_users(db, project_id, limit, offset, email)
    return res

@projects_router.get("/nonassigned/users", response_model=GetNoneAssignedUsersResponse,dependencies=[Depends(require_role(["ADMIN"]))])
async def non_assigned_user(db:DB_dependecy, project_id:int, limit: int | None = 50, offset: int | None = 0,
                                 email: str | None = None ):
    '''
    :param db:
    :param project_id:
    :param limit:
    :param offset:
    :param email:
    :return:
    '''
    res = await ProjectsService.non_assigned_users(db, project_id, limit, offset, email)
    return res



