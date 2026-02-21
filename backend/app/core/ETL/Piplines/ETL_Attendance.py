from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import Biotime_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_Attendances(db:AsyncSession):
    # Extraction
    attendaces =  Biotime_extractor.get_BiotimeCheckInOut()

    # Transforming
    transformed_att = TransformerService.transform_biotime_checkinout_view(attendaces)

    # Loading
    await LoaderService.load_attendance(transformed_att, db)
