from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.projects.services.ProjectsService import ProjectsService

projects_router = APIRouter(prefix='/v1/projects', tags=['Projects'])

@projects_router.get('/')
async def get_projects(db:DB_dependecy):
    projects = await ProjectsService.get_projects(db)
    return projects

