import datetime

from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user, require_role
from app.modules.chekinout.services.CheckinoutService import CheckinOutService

checkinout_router = APIRouter(prefix='/v1/checkinout', tags=['Check in - Check out'], dependencies=[Depends(get_current_user), Depends(require_role(["RH"]))])


@checkinout_router.get('/')
async def get_checkinouts(db:DB_dependecy,
                          limit: int = 50,
                          offset: int = 0,
                          fullname:str | None = None,
                          email: str | None = None,
                          start_date:datetime.date|None=None,
                          end_date:datetime.date|None=None,
                          month:int|None=None,
                          day:int|None=None,
                          department:str|None=None
                          ):
    checkinouts = await CheckinOutService.get_checkinouts(db, limit, offset ,fullname, email, start_date,end_date,month,day, department)
    return checkinouts