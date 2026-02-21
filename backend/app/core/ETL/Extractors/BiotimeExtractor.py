from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.external_database.BiotimeDb import BiotimeDb_engine, CHECK_IN_OUT_VIEW, BIOTIME_EMPLOYEE_VIEW, \
    BIOTIME_ATT_LEAVE_VIEW, personnel_department, att_paycode


class BiotimeDBServices:
    # Views
    def get_BiotimeEmployees(self):
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(BIOTIME_EMPLOYEE_VIEW)).mappings().all()
            print(res)
            return res


    def get_BiotimeCheckInOut(self):
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(CHECK_IN_OUT_VIEW)).mappings().all()
            print(res)
            return res

    def get_BiotimeAttLeave(self):
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(BIOTIME_ATT_LEAVE_VIEW)).mappings().all()
            print(res)
            return res


    # Tables
    def get_BiotimeDepratments(self):
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(personnel_department)).mappings().all()
            print(res)
            return res

    def get_BiotimeAttPaycode(self):
        with Session(BiotimeDb_engine) as session:
            res = session.execute(select(att_paycode)).mappings().all()
            print(res)
            return res



Biotime_extractor = BiotimeDBServices()