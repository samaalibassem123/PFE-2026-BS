from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor
from app.core.ETL.Loaders.v2.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_Members(db: AsyncSession, batch_size: int = 1000):

    # Extract → Transform → Load per batch
    for batch in EasyProject_extractor.get_members(batch_size):

        # Transform batch
        transformed_members = TransformerService.transform_members(batch)

        # Load batch
        await LoaderService.load_members(transformed_members, db)
