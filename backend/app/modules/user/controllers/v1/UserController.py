from fastapi import APIRouter

from app.core.auth.jwt import create_access_token
from app.modules.user.schemas.User import UserSchema

user_router = APIRouter(prefix="/v1/user", tags=["User"])

@user_router.get("/me")
async def read_user():
    return {"username":"test"}


@user_router.post("/login")
async def login_user(user:UserSchema):
    print(user)
    token = create_access_token(user)
    return token




