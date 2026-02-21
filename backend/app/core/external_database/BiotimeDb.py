'''
    Biotime is a postgress DB
    The View That we are going to use :
        - BIOTIME_EMPLOYEE_VIEW
        - BIOTIME_ATT_LEAVE_VIEW
        - CHECK_IN_OUT_VIEW
    Tables :
        - personnel_department
        - att_paycode
'''
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import Session

from app.core.config import settings

BiotimeDb_engine = create_engine(settings.BIOTIME_DB_URL, echo=True)
BiotimeMetadata = MetaData()

# Views
BIOTIME_EMPLOYEE_VIEW = Table('biotime_employee_view',BiotimeMetadata, autoload_with=BiotimeDb_engine)

BIOTIME_ATT_LEAVE_VIEW = Table('biotime_att_leave_view',BiotimeMetadata, autoload_with=BiotimeDb_engine)

CHECK_IN_OUT_VIEW = Table('check_in_out_view',BiotimeMetadata, autoload_with=BiotimeDb_engine)

# Tables
personnel_department = Table('personnel_department', BiotimeMetadata , autoload_with=BiotimeDb_engine)

att_paycode = Table('att_paycode', BiotimeMetadata , autoload_with=BiotimeDb_engine)



class BiotimeDBServices:
    # Views
    def get_BiotimeEmployees(self):
        with Session(BiotimeDb_engine) as session:
            res = session.query(BIOTIME_EMPLOYEE_VIEW).all()
            print(res) # the results are sturecture as tuples on a list [()]
            return res


    def get_BiotimeCheckInOut(self):
        with Session(BiotimeDb_engine) as session:
            res = session.query(CHECK_IN_OUT_VIEW).all()
            print(res) # the results are sturecture as tuples on a list [()]
            return res

    def get_BiotimeAttLeave(self):
        with Session(BiotimeDb_engine) as session:
            res = session.query(BIOTIME_ATT_LEAVE_VIEW).all()
            print(res)  # the results are sturecture as tuples on a list [()]
            return res


    # Tables
    def get_BiotimeDepratments(self):
        with Session(BiotimeDb_engine) as session:
            res = session.query(personnel_department).all()
            print(res) # the results are sturecture as tuples on a list [()]
            return res

    def get_BiotimeAttPaycode(self):
        with Session(BiotimeDb_engine) as session:
            res = session.query(att_paycode).all()
            print(res)  # the results are sturecture as tuples on a list [()]
            return res



Biotime_DB = BiotimeDBServices()