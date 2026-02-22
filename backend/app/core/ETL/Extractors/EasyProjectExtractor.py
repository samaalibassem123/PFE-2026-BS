from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.external_database.EasyProjectDb import EasyProjectdb_engine, EASY_EMPLOYEE_VIEW, \
    EASY_ATTENDANCE_FULL_VIEW, projects, members, easy_attendance_activities


class EasyProjectDbService:
    # Views
    @staticmethod
    def get_employees():
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(EASY_EMPLOYEE_VIEW)).mappings().all()

            return res
    @staticmethod
    def get_attendance():
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(EASY_ATTENDANCE_FULL_VIEW)).mappings().all()

            return res
    # Tables
    @staticmethod
    def get_projects():
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(projects)).mappings().all()

            return res
    @staticmethod
    def get_members():
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(members)).mappings().all()

            return res
    @staticmethod
    def get_easy_attendance_activities():
        with Session(EasyProjectdb_engine) as session:
            res = session.execute(select(easy_attendance_activities)).mappings().all()
           
            return res




EasyProject_extractor = EasyProjectDbService()
