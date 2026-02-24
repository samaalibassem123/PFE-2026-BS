
from fastapi import APIRouter, HTTPException, Depends

from app.core.auth.security import get_current_user, require_role
from app.modules.user.schemas.User import UserCreateSchema, UserResponseSchema, UserUpdateData, UsersNumberSchema
from app.core import DB_dependecy
from app.modules.user.services.UserService import UserService




'''
    this route can only be used by 
    a user by the role of "ADMIN"
    - you can delete the dependcies when u installed the app the first time so u cana create users 
'''
user_router = APIRouter(prefix="/v1/user", tags=["User"], dependencies=[ Depends(get_current_user), Depends(require_role(['ADMIN'])) ])


@user_router.post('/')
async def create_user(user:UserCreateSchema, db:DB_dependecy ):
    try:
        user = await UserService.create_user(db, user)
        return user
    except:
        raise HTTPException(status_code=400, detail='Error on the server')



@user_router.get('/numbers', response_model=UsersNumberSchema)
async def get_users_numbers(db:DB_dependecy):
     users_numbers = await  UserService.get_users_numbers(db)
     return users_numbers


@user_router.get("/{email}", response_model=UserResponseSchema)
async def get_user(email:str, db:DB_dependecy):
    try:
        user = await UserService.fetch_by_email(db,email)
        return user
    except:
        raise HTTPException(status_code=400, detail='Server Error' )


@user_router.get('/')
async def get_users(db:DB_dependecy,
                    limit:int|None=5,
                    offset:int|None = 0,
                    role: str|None = None,
                    email:str|None = None,
                    current_user=Depends(get_current_user)):

    users = await UserService.fetch_all_users(db, current_user, limit, offset, role, email)
    return users



@user_router.delete('/{user_id}')
async def delete_user(user_id:str, db:DB_dependecy):
    try:
        user = await UserService.delete_user_by_id(db, user_id)
        return user
    except:
        raise HTTPException(status_code=400, detail="Server Error")

@user_router.put('/{user_id}')
async def update_user(user_id:str, new_user_data:UserUpdateData , db:DB_dependecy):
    user = await UserService.update_user_by_ida(db, user_id, new_user_data)
    return user
