from dns.e164 import query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth.security import hash_password
from app.core.database.models import User
from app.modules.user.schemas.User import UserCreateSchema


class UserService:
    async def create_user(db:AsyncSession,user:UserCreateSchema):
        # Hash the password before inserting the user
        hashed_user = user.model_dump()

        hashed_user['password'] = hash_password(hashed_user['password'])
        db_user = User(**hashed_user)

        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user

    async def fetch_by_email(db:AsyncSession, user_email:str):
        db_user = await db.execute(select(User).where(User.email == user_email))
        return db_user.scalars().first()