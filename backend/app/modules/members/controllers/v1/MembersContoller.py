from fastapi import APIRouter, Depends

from app.core import DB_dependecy
from app.core.auth.security import get_current_user
from app.modules.members.services.MemberService import MemberService

members_router = APIRouter(prefix='/v1/members', tags=['Members'])

@members_router.get('/')
async def get_members(db:DB_dependecy, limit: int = 50,offset: int = 0, user=Depends(get_current_user)):
    members = await MemberService.get_members(user['id'],db, limit,offset)
    return members

