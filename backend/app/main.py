from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from starlette.middleware.cors import CORSMiddleware

from app.core import DB_dependecy
from app.core.config import settings
#from app.core.ETL.Piplines.MainPipeline import MainPipeline
from app.modules.auth.controllers.AuthController import auth_router
from app.modules.chekinout.controllers.v1.CheckinoutController import checkinout_router
from app.modules.employees.controllers.v1.EmployeesController import employees_router
from app.modules.employees_leave.controllers.v1.EmployeeLeaveController import employees_leave_router
from app.modules.members.controllers.v1.MembersContoller import members_router
from app.modules.members_attendance.controllers.v1.MembersAttController import members_att_router
from app.modules.projects.controllers.v1.ProjectController import projects_router
from app.modules.user.controllers.v1.UserController import user_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''@app.get('/etl')
async def elt_db(db:DB_dependecy):
    return await MainPipeline(db)'''

print(settings.POSTGRES_PORT)

app.include_router(auth_router)
app.include_router(user_router , prefix="/api")
app.include_router(checkinout_router, prefix="/api")
app.include_router(employees_router, prefix="/api")
app.include_router(employees_leave_router, prefix="/api")
app.include_router(members_router, prefix="/api")
app.include_router(members_att_router, prefix="/api")
app.include_router(projects_router, prefix="/api")


