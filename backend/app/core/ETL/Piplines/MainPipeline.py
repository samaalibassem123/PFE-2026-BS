from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Piplines.ETL_Employee import ETL_employees
from app.core.ETL.Piplines.ETL_department import ETL_departments


async def MainPipeline(db:AsyncSession):
    # fill departments table
    await ETL_departments(db)

    # fill employees table
    await ETL_employees(db)