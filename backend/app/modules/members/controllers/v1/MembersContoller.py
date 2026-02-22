from fastapi import APIRouter

from app.core import DB_dependecy
from app.modules.members.services.MemberService import MemberService

members_router = APIRouter(prefix='/v1/members', tags=['Members'])

@members_router.get('/')
async def get_members(db:DB_dependecy, limit: int = 50,offset: int = 0):
    members = await MemberService.get_members(db, limit,offset)
    return members

