'''

    the ETL pipelines must be kept organized as it found
    don't miss with the order of them , this can make errors and conflicts
    on filling the main DB

'''
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Piplines.ETL_AttEvents import ETL_AttEvents
from app.core.ETL.Piplines.ETL_Attendance import ETL_Attendances
from app.core.ETL.Piplines.ETL_Employee import ETL_employees
from app.core.ETL.Piplines.ETL_EmployeeAttEvents import ETL_EmpAttEvents
from app.core.ETL.Piplines.ETL_Members import ETL_Members
from app.core.ETL.Piplines.ETL_Projects import ETL_Projects
from app.core.ETL.Piplines.ETL_department import ETL_departments


async def MainPipeline(db:AsyncSession):
    try:
        # fill departments table
        #await ETL_departments(db)

        # fill employees table
        #await ETL_employees(db)

        # fill Attendance table
        #await ETL_Attendances(db)

        # fill Projects Table
        #await ETL_Projects(db)

        # fill members Table
        await ETL_Members(db)

        # load attendance events
        await ETL_AttEvents(db)

        # load Employee attendance Events
        await ETL_EmpAttEvents(db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))