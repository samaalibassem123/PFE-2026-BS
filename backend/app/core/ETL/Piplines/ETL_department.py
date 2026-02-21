from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import Biotime_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_departments(db:AsyncSession):
    # EXTRACTION
    biotime_departments = Biotime_extractor.get_BiotimeDepratments()

    #TRANSFORMING
    transfomed_data = TransformerService.tranform_personnel_department(biotime_departments)

    # Loading
    await LoaderService.load_department(transfomed_data, db)