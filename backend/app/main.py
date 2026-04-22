import json
from contextlib import asynccontextmanager
from threading import Lock

from fastapi import FastAPI, Request,status
from fastapi.security import OAuth2PasswordBearer
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse


from app.core import DB_dependecy
from app.core.config import settings
from app.core.middleware import MaintenanceMiddleware
from app.core.redis.redis_client import redis_client
from app.modules.ai_agents.controllers.v1.RhAgentContoller import rh_agent_router
#from app.core.ETL.Piplines.MainPipeline import MainPipeline
from app.modules.auth.controllers.AuthController import auth_router
from app.modules.chekinout.controllers.v1.CheckinoutController import checkinout_router
from app.modules.employees.controllers.v1.EmployeesController import employees_router
from app.modules.employees_leave.controllers.v1.EmployeeLeaveController import employees_leave_router
from app.modules.members.controllers.v1.MembersContoller import members_router
from app.modules.members_attendance.controllers.v1.MembersAttController import members_att_router
from app.modules.pending_users.controllers.v1.PendingUsersController import pending_users_router
from app.modules.projects.controllers.v1.ProjectController import projects_router
from app.modules.user.controllers.v1.UserController import user_router

@asynccontextmanager
async def startup(app:FastAPI):
    try:
        await redis_client.ping()
        print("Redis connected")
    except Exception as e:
        print("Redis connection failed:", e)
        raise e

    yield

    await redis_client.close()
    print("Redis connection closed")

app = FastAPI()



# midelware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(MaintenanceMiddleware)




'''
@app.post("/etl")
async def etl_db(db: DB_dependecy):
    async def event_stream():
        async for step in MainPipeline(db):
            yield f"{json.dumps(step)}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream"
    )'''

print(settings.POSTGRES_PORT)

app.include_router(auth_router)

app.include_router(rh_agent_router, prefix="/api")

app.include_router(user_router , prefix="/api")
app.include_router(pending_users_router, prefix="/api")

app.include_router(checkinout_router, prefix="/api")
app.include_router(employees_router, prefix="/api")
app.include_router(employees_leave_router, prefix="/api")
app.include_router(members_router, prefix="/api")
app.include_router(members_att_router, prefix="/api")
app.include_router(projects_router, prefix="/api")

