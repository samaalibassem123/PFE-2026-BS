from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor
from app.core.ETL.Loaders.v1.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_Members(db: AsyncSession, batch_size: int = 1000):


    easy_members = EasyProject_extractor.get_members()

    # Transform batch
    transformed_members = TransformerService.transform_members(easy_members)

    # Load batch
    await LoaderService.load_members(transformed_members, db)
