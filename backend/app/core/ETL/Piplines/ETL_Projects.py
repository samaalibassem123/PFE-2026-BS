from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_Projects(db:AsyncSession):
    # Extract from easyproject
    projects = EasyProject_extractor.get_projects()

    # Transform
    transformed_projects = TransformerService.transform_projects(projects)

    # Loading
    await LoaderService.load_projects(transformed_projects, db)

