'''
    EasyProject is a mysql database
       The View That we are going to use :
        - EASY_ATTENDANCE_FULL_VIEW
        - EASY_EMPLOYEE_VIEW
       Tables :
        - projects
        - members
        - easy_attendance_activities
'''


from sqlalchemy import create_engine, Table, MetaData, select
from sqlalchemy.orm import Session

from app.core.config import settings


EasyProjectdb_engine = create_engine(settings.EASY_PROJECT_URL, echo=True)
EasyProjectMetadata = MetaData()

# Views
EASY_EMPLOYEE_VIEW = Table("easy_employee_view", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)
EASY_ATTENDANCE_FULL_VIEW = Table("easy_attendance_full_view", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)

# Tables
projects = Table("projects", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)
members = Table("members", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)
easy_attendance_activities = Table("easy_attendance_activities", EasyProjectMetadata, autoload_with=EasyProjectdb_engine)

