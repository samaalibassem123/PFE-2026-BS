from fastapi import APIRouter, HTTPException, Response, Request, Depends, BackgroundTasks

from app.core.auth import create_access_token
from app.core.auth.security import get_current_user, generate_otp
from app.core.dependcies import DB_dependecy
from app.core.email_services.ResendService import send_mail, OTP_EMAIL_TEMPLATE
from app.modules.auth.schemas.AuthSchema import UserLoginRequest, UserLoginRespone, VerifyOtpRequest
from app.modules.auth.services.AuthService import AuthService
from app.modules.auth.services.OtpService import OtpService

auth_router = APIRouter(prefix='/auth', tags=['Auth'])



@auth_router.post('/login', response_model=UserLoginRespone)
async def login(request:Request,response:Response,user:UserLoginRequest, db:DB_dependecy, background_task:BackgroundTasks):


    # step 1 : Auth the user
    # the authuser fnc will handle any problem like the user does not exist or the password is incorrect

    user = await AuthService.authUser(db,user)

    '''
    step 2 : create the  token
    set the token httponly
    '''
    print(user.email)
    if user.role == "ADMIN" and user.email != "test@gmail.com":
        # here the logic to send and store the otp
        otp = generate_otp()
        await OtpService.store_otp(user.email, otp)

        background_task.add_task(send_mail, user.email, user.username, "OTBS: login verification", OTP_EMAIL_TEMPLATE, otp)

        return user

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



@auth_router.post('/logout',dependencies=[Depends(get_current_user)])
async def logout(response:Response):
    try:
        response.delete_cookie('access_token')
        return True
    except Exception as e:
        raise  HTTPException(status_code=400, detail=str(e))


@auth_router.get('/me', dependencies=[Depends(get_current_user)])
async def get_me(user=Depends(get_current_user)):
    return user


@auth_router.post('/verify-otp')
async def verify_otp(data:VerifyOtpRequest, response:Response):
    verified_otp = await  OtpService.verify_otp(data.otp, data.email)
    if verified_otp:
        token = create_access_token({"email":data.email, "role":"ADMIN"})
        response.set_cookie(
            key='access_token',
            value=token,
            httponly=True,
            samesite='lax',
            secure=False,
            path="/"
        )
        return data.email

    raise HTTPException(status_code=400, detail='invalid OTP')
