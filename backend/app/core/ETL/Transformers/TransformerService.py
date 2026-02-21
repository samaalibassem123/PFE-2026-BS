from collections import defaultdict

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import Biotime_extractor, EasyProject_extractor
from app.core.database.models import Department, Employee, Attendance


class TransformerService:
    @staticmethod
    def tranform_personnel_department(data):
        departments = []
        for dep in data:
            depart = defaultdict()
            depart['id'] = dep['id']
            depart['name'] = dep["dept_name"]
            depart = Department(**depart)
            departments.append(depart)
        return departments

    @staticmethod
    def transform_easy_employee_view(data):
        employees = []
        for e in data:
            emp = defaultdict()
            emp['id'] = e['ep_emp_id']
            emp['full_name'] = e['emp_fullname']
            emp['email'] = e['email']

            # search for employee department from biotime employee view

            biotime_emps = Biotime_extractor.get_BiotimeEmployees()
            for bt_emp in biotime_emps:
                if bt_emp['email'] == emp['email'] or bt_emp['emp_fullname'] == emp['full_name']:
                    emp['department_id'] = bt_emp['department_id']
                    emp['hire_date'] = bt_emp['hire_date']
                    break

            employee = Employee(**emp)
            employees.append(employee)

        return employees

    @staticmethod
    def transform_biotime_checkinout_view(data):
        attendances = []
        for att in data:
            attendance = defaultdict()
            attendance['id'] = att['id']
            attendance['check_in'] = att['clock_in']
            attendance['check_out'] = att['clock_out']
            attendance['att_date'] = att['att_date']
            attendance['week_day'] = att['week_day']

            '''
              - now we get the emp id
              - to get teh emp_id we can use either easyproject employee view or the main app employees table  
            '''

            # get employees from easy project
            # insert the emp only if u find his id
            employees = EasyProject_extractor.get_employees()
            for e in employees:
                if att['email'] == e['email'] or att['first_name'] == e['emp_fullname']:
                    attendance['emp_id'] = e['ep_emp_id']
                    attendances.append(Attendance(**attendance))
                    break

        return attendances

