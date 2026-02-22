from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.projects.services.ProjectsService import ProjectsService

projects_router = APIRouter(prefix='/v1/projects', tags=['Projects'])

@projects_router.get('/')
async def get_projects(db:DB_dependecy, limit: int = 50,offset: int = 0):
    projects = await ProjectsService.get_projects(db,limit,offset)
    return projects

