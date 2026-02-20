'''
    EasyProject is a mysql database
       The View That we are going to use :
        - EASY_ATTENDANCE_FULL_VIEW
        - EASY_EMPLOYEE_VIEW
'''


from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.orm import Session

from app.core.config import settings


EasyProjectdb_engine = create_engine(settings.EASY_PROJECT_URL, echo=True)
EasyProjectMetadata = MetaData()

EASY_EMPLOYEE_VIEW = Table("easy_employee_view", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)
EASY_ATTENDANCE_FULL_VIEW = Table("easy_attendance_full_view", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)

class EasyProjectDbService:
    def get_employees(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.query(EASY_EMPLOYEE_VIEW).all()
            print(res)
            return res

    def get_attendance(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.query(EASY_ATTENDANCE_FULL_VIEW).all()
            print(res)
            return res

EasyProject_DB = EasyProjectDbService()
