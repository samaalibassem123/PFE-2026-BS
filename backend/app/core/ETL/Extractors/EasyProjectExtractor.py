from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.external_database.EasyProjectDb import EasyProjectdb_engine, EASY_EMPLOYEE_VIEW, \
    EASY_ATTENDANCE_FULL_VIEW, projects, members, easy_attendance_activities


class EasyProjectDbService:
    # Views
    def get_employees(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(EASY_EMPLOYEE_VIEW)).mappings().all()
            print(res)
            return res

    def get_attendance(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(EASY_ATTENDANCE_FULL_VIEW)).mappings().all()
            print(res)
            return res
    # Tables
    def get_projects(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(projects)).mappings().all()
            print(res)
            return res

    def get_members(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(members)).mappings().all()
            print(res)
            return res

    def get_easy_attendance_activities(self):
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(easy_attendance_activities)).mappings().all()
            print(res)
            return res




EasyProject_extractor = EasyProjectDbService()
