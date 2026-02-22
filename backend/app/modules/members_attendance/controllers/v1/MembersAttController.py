from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user
from app.modules.members_attendance.services.MembersAttService import MembersAttendanceService

members_att_router = APIRouter(prefix='/v1/members', tags=['Members Attendance'])

@members_att_router.get('/')
async def get_members_att(db:DB_dependecy, user=Depends(get_current_user)):
    members_att = await MembersAttendanceService.get_members_att(user['id'], db)
    return members_att

