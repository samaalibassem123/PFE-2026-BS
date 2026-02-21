from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_employees(db:AsyncSession):
    # Extraction
    employees = EasyProject_extractor.get_employees()

    # Transformation
    transformed_emps = TransformerService.transform_easy_employee_view(employees)

    # Loading
    await LoaderService.load_employees(transformed_emps, db)
