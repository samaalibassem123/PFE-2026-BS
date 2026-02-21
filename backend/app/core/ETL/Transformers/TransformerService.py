from collections import defaultdict

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import Biotime_extractor
from app.core.database.models import Department, Employee


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