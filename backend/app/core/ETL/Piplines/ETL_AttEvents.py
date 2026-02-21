from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import EasyProject_extractor, Biotime_extractor
from app.core.ETL.Loaders.LoaderService import LoaderService
from app.core.ETL.Transformers.TransformerService import TransformerService


async def ETL_AttEvents(db:AsyncSession):
    # Extract  from easyproject and biotime
    att_event_easyP = EasyProject_extractor.get_easy_attendance_activities()
    att_event_biotime = Biotime_extractor.get_BiotimeAttPaycode()

    # Transform
    transformed_att_event_easyP = TransformerService.transform_att_event(att_event_easyP)
    transformed_att_event_biotime = TransformerService.transform_att_event(att_event_biotime)

    # Loading of the two transfomed table from biotime and easyprojects
    await LoaderService.load_att_events(transformed_att_event_biotime + transformed_att_event_easyP, db)

