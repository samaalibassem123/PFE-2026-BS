from fastapi import FastAPI

from app.modules.user.controllers.v1.UserController import user_router

app = FastAPI()

app.include_router(user_router)