'''

    the ETL pipelines must be kept organized as it found
    don't miss with the order of them , this can make errors and conflicts
    on filling the main DB

'''

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.ETL.Piplines.ETL_Attendance import ETL_Attendances
from app.core.ETL.Piplines.ETL_Employee import ETL_employees
from app.core.ETL.Piplines.ETL_department import ETL_departments


async def MainPipeline(db:AsyncSession):
    # fill departments table
    await ETL_departments(db)

    # fill employees table
    await ETL_employees(db)

    # fill Attendance table
    await ETL_Attendances(db)

    