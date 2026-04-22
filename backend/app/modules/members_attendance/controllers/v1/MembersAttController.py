import datetime

from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user, require_role
from app.modules.members_attendance.services.MembersAttService import MembersAttendanceService

members_att_router = APIRouter(prefix='/v1/members-att', tags=['Members Attendance'],  dependencies=[Depends(get_current_user)])

@members_att_router.get('/', dependencies=[Depends(require_role(["PROJECT_MANAGER"]))])
async def get_members_att(db:DB_dependecy,
                          limit: int = 50,
                          offset: int = 0,
                          email:str|None=None,
                          member_name:str|None=None,
                          project_name:str|None=None,
                          start_date:datetime.date|None=None,
                          end_date:datetime.date|None=None,
                          month: int | None = None,
                          day:int|None=None,
                          event:str|None=None,
                          user=Depends(get_current_user)):
    members_att = await MembersAttendanceService.get_members_att(user['id'], db , limit ,offset, email, member_name, project_name, start_date, end_date ,event, month, day)
    return members_att

