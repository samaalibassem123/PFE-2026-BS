from dns.e164 import query
from fastapi import HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth.security import hash_password
from app.core.database.models import PendingUser, Role, PendingUsersStatus, User
from app.modules.pending_users.schemas.PendingUsersSchemas import PendingUserData
from app.modules.user.schemas.User import UserCreateSchema
from app.modules.user.services import UserService


class PendingUsersService:
    @staticmethod
    async def getPendingsUsers(db:AsyncSession,
                               limit: int | None = 50,
                               offset: int | None = 0,
                               role: Role | None = None,
                               ):
        try:

            query = select(PendingUser)
            #filters
            if role:
                query = query.where(PendingUser.user['role'] == role)
            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            users_res = await db.execute(query.offset(offset).limit(limit))
            users = users_res.scalars().all()
            return  {
                "total":total,
                "data":users
            }
        except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))

    @staticmethod
    async def getPendingUser(db:AsyncSession, email:str):
        try:
            user = await db.execute(select(PendingUser).where(PendingUser.email == email))
            return user.scalar_one_or_none()
        except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))

    @staticmethod
    async def approveUser(email:str, status:PendingUsersStatus,db:AsyncSession):
        try:
            result  = await db.execute(select(PendingUser).where(PendingUser.email == email))
            user = result.scalar_one_or_none()
            if user:
                user.status = status
                await db.commit()
                # add user add user to user table
                user_info =User(**user.user)
                if status == "APPROVED":
                    db.add(user_info)
                    await db.commit()


        except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))

    @staticmethod
    async def addUser(user:PendingUserData,db:AsyncSession):

            # first fetch user by mail the user table
            fetched_user = await UserService.fetch_by_email(db,user.email)
            if fetched_user:
                raise HTTPException(status_code=422 , detail="user email is already used")

            try:
                user = user.model_dump()
                user['user']['password'] = hash_password(user['user']['password'])
                db.add(PendingUser(**user))
                await db.commit()
            except Exception as e:
                raise  HTTPException(status_code=404, detail="User is already on the waiting list")