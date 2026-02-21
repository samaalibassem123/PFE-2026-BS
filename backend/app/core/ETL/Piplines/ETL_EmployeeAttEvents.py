from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor, Biotime_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_EmpAttEvents(db:AsyncSession):
    # Extract from easyproject and biotime
    ep_emp_att = EasyProject_extractor.get_attendance()
    bt_emp_att = Biotime_extractor.get_BiotimeAttLeave()

    # Transform
    transformed_ep_emp_att = TransformerService.transform_easy_emp_att_events(ep_emp_att)
    transformed_bt_emp_att = TransformerService.transform_biotime_emp_att_events(bt_emp_att)

    # Loading
    await LoaderService.load_projects(transformed_ep_emp_att + transformed_bt_emp_att, db)

