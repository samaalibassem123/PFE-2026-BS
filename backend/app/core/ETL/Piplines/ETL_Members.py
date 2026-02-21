from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_Members(db:AsyncSession):
    # Extract from easyproject
    members = EasyProject_extractor.get_members()

    # Transform
    transformed_members = TransformerService.transform_members(members)

    # Loading
    await LoaderService.load_members(transformed_members, db)

