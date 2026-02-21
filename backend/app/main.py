from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from starlette.middleware.cors import CORSMiddleware

from app.core import DB_dependecy
from app.core.ETL.Piplines.MainPipeline import MainPipeline
from app.modules.auth.controllers.AuthController import auth_router
from app.modules.employees.controllers.v1.EmployeesController import employees_router
from app.modules.user.controllers.v1.UserController import user_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/etl')
async def elt_db(db:DB_dependecy):
    return await MainPipeline(db)



app.include_router(auth_router)
app.include_router(user_router , prefix="/api")
app.include_router(employees_router, prefix="/api")
