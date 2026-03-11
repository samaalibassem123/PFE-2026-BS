from fastapi import APIRouter, BackgroundTasks

from app.core import DB_dependecy
from app.core.database.models import Role
from app.core.email_services.ResendService import send_mail
from app.modules.pending_users.schemas.PendingUsersSchemas import ApproveUserRequest, PendingUserData
from app.modules.pending_users.services.PendingUsersService import PendingUsersService

pending_users_router = APIRouter(prefix="/pending-users", tags=["Pending Users"])

@pending_users_router.get('/')
async def get_pending_users(db:DB_dependecy,
                            limit:int|None=50,
                            offset:int|None=0,
                            role: Role | None = None,
                            ):
    users = await PendingUsersService.getPendingsUsers(db, limit, offset, role)
    return users

@pending_users_router.post("/")
async def add_user(data:PendingUserData,db:DB_dependecy):
    await PendingUsersService.addUser(data, db)


@pending_users_router.post("/approve")
async def approve_user(data:ApproveUserRequest, db:DB_dependecy, background_task:BackgroundTasks):
    await PendingUsersService.approveUser(data.email, data.status,db)
    # if the user is approved than send mail so he can login
    if data.status == "APPROVED":
        # we need to add the send mail func to background because it can be slow and stop the api
        background_task.add_task(send_mail, data.email,data.username, "Login to your OTBS Account")
    return  {"message":"user approved succfully and mail is send"}

