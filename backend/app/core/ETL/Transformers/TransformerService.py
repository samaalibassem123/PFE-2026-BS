from collections import defaultdict

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.ETL.Extractors import Biotime_extractor, EasyProject_extractor
from app.core.database.models import Department, Employee, Attendance, Project, Member, AttendanceEvent, \
    EmployeeAttendanceEvent


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
                if  bt_emp['emp_fullname'].upper() == emp['full_name'].upper():
                    emp['department_id'] = bt_emp['department_id']
                    emp['hire_date'] = bt_emp['hire_date']
                    # insert mail if it didn't  exist on easyproject
                    emp['email'] = bt_emp['email']
                    break

            employee = Employee(**emp)
            employees.append(employee)

        return employees

    @staticmethod
    def transform_biotime_checkinout_view(data):
        attendances = []
        employees = EasyProject_extractor.get_employees()
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
            for e in employees:
                if att['email'] == e['email'] or att['first_name'].upper() == e['emp_fullname'].upper():
                    attendance['emp_id'] = e['ep_emp_id']
                    att['email'] = e['email']
                    attendances.append(Attendance(**attendance))
                    break

        return attendances

    @staticmethod
    def transform_projects(data):
        projects = []
        for p in data:
            project = defaultdict()
            project['id'] = p['id']
            project['name'] = p['name']
            project['identifier'] = p['identifier']
            project['created_on'] = p['created_on']
            project['updated_on'] = p['updated_on']

            projects.append(Project(**project))
        return projects

    @staticmethod
    def transform_members(data):
        members = []
        employees = EasyProject_extractor.get_employees()
        employees_id = [emp['ep_emp_id'] for emp in employees]
        for m in data:
            member = defaultdict()
            member['id'] = m['id']
            member['emp_id'] = m['user_id']
            member['project_id'] = m['project_id']
            if member['emp_id'] in employees_id:
                members.append(Member(**member))

        return members

    '''
        id_step so confilcts between biotime and easyP don't happed
    '''
    @staticmethod
    def transform_att_event(data, id_step:int=0):
        att_events = []
        for ev in data:
            att_event = defaultdict()
            att_event['id'] = int(ev['id']) + id_step
            att_event['name'] = ev['name']
            att_events.append(AttendanceEvent(**att_event))

        return att_events


    @staticmethod
    def transform_easy_emp_att_events(data):
        emp_att_events = []
        for ev in data:
            emp_att = defaultdict()
            emp_att['apply_time'] = ev['created_at']
            emp_att['start_date'] = ev['arrival']
            emp_att['end_date'] = ev['departure']
            emp_att['emp_id'] = ev['ep_emp_id']
            emp_att['event_id'] = int(ev['activity_id']) + 19 #19 the numver of all events on biotime so the new id added without repeating or conflicts

            emp_att_events.append(EmployeeAttendanceEvent(**emp_att))

        return emp_att_events

    @staticmethod
    def transform_biotime_emp_att_events(data):
        emp_att_events = []
        employees = EasyProject_extractor.get_employees()
        for ev in data:
            emp_att = defaultdict()
           
            emp_att['apply_time'] = ev['apply_time']
            emp_att['start_date'] = ev['start_time']
            emp_att['end_date'] = ev['end_time']
            emp_att['event_id'] = ev['pay_code_id']

            # search for the emp id before inserting
            for e in employees:
                if ev['email'] == e['email'] or ev['first_name'].upper() == e['emp_fullname'].upper():
                    emp_att['emp_id'] = e['ep_emp_id']
                    emp_att_events.append(EmployeeAttendanceEvent(**emp_att))
                    break

        return emp_att_events