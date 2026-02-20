'''
    EasyProject is a mysql database
       The View That we are going to use :
        - EASY_ATTENDANCE_FULL_VIEW
        - EASY_EMPLOYEE_VIEW
'''


from sqlalchemy import create_engine
from app.core.config import settings


EasyProjectdb_engine = create_engine(settings.EASY_PROJECT_URL, echo=True)

