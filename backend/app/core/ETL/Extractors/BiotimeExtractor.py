from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.external_database.BiotimeDb import BiotimeDb_engine, CHECK_IN_OUT_VIEW, BIOTIME_EMPLOYEE_VIEW, \
    BIOTIME_ATT_LEAVE_VIEW, personnel_department, att_paycode


class BiotimeDBServices:
    # Views
    @staticmethod
    def get_BiotimeEmployees():
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(BIOTIME_EMPLOYEE_VIEW)).mappings().all()

            return res

    @staticmethod
    def get_BiotimeCheckInOut():
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(CHECK_IN_OUT_VIEW)).mappings().all()

            return res
    @staticmethod
    def get_BiotimeAttLeave():
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(BIOTIME_ATT_LEAVE_VIEW)).mappings().all()

            return res


    # Tables
    @staticmethod
    def get_BiotimeDepratments():
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(personnel_department)).mappings().all()

            return res
    @staticmethod
    def get_BiotimeAttPaycode():
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(att_paycode)).mappings().all()

            return res



Biotime_extractor = BiotimeDBServices()