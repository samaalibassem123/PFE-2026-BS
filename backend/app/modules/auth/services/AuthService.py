from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth.security import verify_password
from app.modules.auth.schemas.AuthSchema import UserLoginRequest
from app.modules.pending_users.services.PendingUsersService import PendingUsersService
from app.modules.user.services import UserService


class AuthService:
    async def authUser(db:AsyncSession,user:UserLoginRequest):
        # step 1 : fetch user if he exist on pending users table
        pending_user = await PendingUsersService.getPendingUser(db,user.email)
        if pending_user:
            raise HTTPException(status_code=401,detail="you must wait for admin approving")
        # step 2 : fetch user by email
        user_db = await UserService.fetch_by_email(db,user.email)

        if not user_db:
            raise HTTPException(status_code=404,detail='User Does not exist')


        # step2 : verify password
        ok_pass = verify_password(user.password, user_db.password)

        if not ok_pass:
            raise HTTPException(status_code=404, detail='Password Incorrect')

        return user_db


