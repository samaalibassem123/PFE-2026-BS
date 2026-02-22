from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.chekinout.services.CheckinoutService import CheckinOutService

checkinout_router = APIRouter(prefix='/v1/checkinout', tags=['Check in - Check out'])


@checkinout_router.get('/')
async def get_checkinouts(db:DB_dependecy, limit: int = 50,offset: int = 0, fullname:str | None = None, email: str | None = None, att_date:str|None=None):
    checkinouts = await CheckinOutService.get_checkinouts(db, limit, offset ,fullname, email, att_date)
    return checkinouts