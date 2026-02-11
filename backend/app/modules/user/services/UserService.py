from collections import defaultdict

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth.security import hash_password
from app.core.database.models import User
from app.modules.user.schemas.User import UserCreateSchema, UserUpdateData, UsersNumberSchema


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

    async def fetch_user_by_id(db:AsyncSession, user_id:str):
        user  = await db.execute(select(User).where(User.id == user_id))
        return user.scalars().first()

    async def fetch_all_users(db:AsyncSession, user):
        users = await db.execute(select(User).where(User.email != user['email']))
        return users.scalars().all()

    async def delete_user_by_id(db:AsyncSession, user_id):
        user = await db.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail='user not found')

        await db.delete(user)
        await db.commit()
        return True

    async def update_user_by_ida(db:AsyncSession, user_id:str, new_user_data:UserUpdateData):
        # step 1 : fetch the new user email if it is used before
        fetch_mail = await UserService.fetch_by_email(db,new_user_data.email)

        if fetch_mail is not None:
            if str(fetch_mail.id) != str(user_id):
                raise HTTPException(status_code=400, detail="Email is used before")

        # step 2 : get the user that should be updated
        fetch_user = await UserService.fetch_user_by_id(db,user_id)
        if  fetch_user is None:
            raise  HTTPException(status_code=400, detail="User doesn't exit")

        # step 3 : Update the user
        fetch_user.email = new_user_data.email
        fetch_user.username = new_user_data.username
        fetch_user.role = new_user_data.role

        await db.commit()
        await db.refresh(fetch_user)

        return fetch_user

    '''
    user number by role
    '''
    async def get_users_numbers(db:AsyncSession)->UsersNumberSchema:
        users = await db.execute(select(User))


        data = defaultdict(int)
        users_table =users.scalars().all()
        for user in users_table :
            user_dict = user.__dict__
            print(user_dict['role'])
            data[str(user_dict['role'])] += 1

        res = {}
        res['total_users'] = len(users_table)
        res['total_admins'] = data['ADMIN']
        res['total_rh'] = data['RH']
        res['total_projectM'] = data['PROJECT MANAGER']

        return res




