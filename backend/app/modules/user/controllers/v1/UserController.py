from fastapi import APIRouter

user_router = APIRouter(prefix="/v1/user", tags=["User"])

@user_router.get("/me")
async def read_user():
    return {"username":"test"}




