from fastapi import APIRouter, HTTPException, Response, Request, Depends


from app.core.auth import create_access_token
from app.core.auth.security import get_current_user
from app.core.dependcies import DB_dependecy
from app.modules.auth.schemas.AuthSchema import UserLoginRequest, UserLoginRespone
from app.modules.auth.services.AuthService import AuthService

auth_router = APIRouter(prefix='/auth', tags=['Auth'])



@auth_router.post('/login', response_model=UserLoginRespone)
async def login(request:Request,response:Response,user:UserLoginRequest, db:DB_dependecy):


    # step 1 : Auth the user
    # the authuser fnc will handle any problem like the user does not exist or the password is incorrect

    user = await AuthService.authUser(db,user)

    '''
    step 2 : create the  token
    set the token httponly
    '''

    token = create_access_token({"id":str(user.id),"email":user.email, "role":user.role})
    response.set_cookie(
        key='access_token',
        value=token,
        httponly=True,
        samesite='lax',
        secure=False,
        path="/"
    )

    return user



@auth_router.post('/logout')
async def logout(response:Response):
    try:
        response.delete_cookie('access_token')
        return True
    except Exception as e:
        raise  HTTPException(status_code=400, detail=str(e))


@auth_router.get('/me')
async def get_me(user=Depends(get_current_user)):
    return user
