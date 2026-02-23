

from fastapi import HTTPException
from sqlalchemy import select, func, extract
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Employee, Member, UserProject, Project


class MembersAttendanceService:
    @staticmethod
    async def get_members_att(userId, db:AsyncSession, limit: int = 50,offset: int = 0, email:str|None=None, member_name:str|None=None, project_name:str|None=None, start_date:int|None=None, end_date:int|None=None, event:str|None=None ):



        try:
            # get only the  attendance of  members that are assigned to the projects that the user can see
            query = ((select(EmployeeAttendanceEvent, AttendanceEvent, Employee, UserProject, Member, Project)
               .join(AttendanceEvent, EmployeeAttendanceEvent.event_id == AttendanceEvent.id)
               .join(Employee, EmployeeAttendanceEvent.emp_id == Employee.id))
               .join(Member, EmployeeAttendanceEvent.emp_id == Member.emp_id)
               .join(Project, Member.project_id == Project.id)
               .join(UserProject, Member.project_id == UserProject.project_id)
               .where(UserProject.user_id == userId))

            if email:
                query = query.where(Employee.email.ilike(f"%{email}%"))
            if member_name:
                query = query.where(Employee.full_name.ilike(f"%{member_name}%"))
            if project_name:
                query = query.where(Project.name.ilike(f"%{project_name}%"))
            if start_date and end_date:
                query = query.where(extract("year", EmployeeAttendanceEvent.start_date) >= start_date, extract("year", EmployeeAttendanceEvent.end_date) <=end_date)

            if event:
                query = query.where(AttendanceEvent.name == event)


            total_res = await db.execute(select(func.count()).select_from(query.subquery()))
            total = total_res.scalar_one()
            result = await db.execute(query.options(joinedload(EmployeeAttendanceEvent.employee),  joinedload(EmployeeAttendanceEvent.event)).limit(limit).offset(offset))
            members_att = result.scalars().all()

            return {
                "total":total,
                "data":members_att
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))