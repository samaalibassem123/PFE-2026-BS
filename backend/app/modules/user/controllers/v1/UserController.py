
from fastapi import APIRouter, HTTPException, Depends

from app.core.auth.security import get_current_user, require_role
from app.modules.user.schemas.User import UserCreateSchema, UserResponseSchema
from app.core import DBsession
from app.modules.user.services.UserService import UserService

user_router = APIRouter(prefix="/v1/user", tags=["User"], dependencies=[Depends(get_current_user)])


@user_router.post('/', dependencies=[Depends(require_role(['ADMIN']))])
async def create_user(user:UserCreateSchema, db:DBsession ):
    try:
        user = await UserService.create_user(db, user)
        return user
    except:
        raise HTTPException(status_code=400, detail='Error on the server')




@user_router.get("/{email}", response_model=UserResponseSchema)
async def get_user(email:str, db:DBsession):
    try:
        user = await UserService.fetch_by_email(db,email)
        return user
    except:
        raise HTTPException(status_code=400, detail='Server Error' )


@user_router.get('/', response_model=list[UserResponseSchema])
async def get_users(db:DBsession):
    try:
        users = await UserService.fetch_all_users(db)
        return users
    except:
        raise HTTPException(status_code=400, detail='Server Error')