

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import EmployeeAttendanceEvent, AttendanceEvent, Employee, Member, UserProject


class MembersAttendanceService:
    @staticmethod
    async def get_members_att(userId, db:AsyncSession, limit: int = 50,offset: int = 0):
        # get only the  attendance of  members that are assigned to the projects that the user can see
        stm = ((select(EmployeeAttendanceEvent, AttendanceEvent, Employee, UserProject)
               .join(AttendanceEvent, EmployeeAttendanceEvent.event_id == AttendanceEvent.id)
               .join(Employee, EmployeeAttendanceEvent.emp_id == Employee.id))
               .join(Member, EmployeeAttendanceEvent.emp_id == Member.emp_id)
               .join(UserProject, Member.project_id == UserProject.project_id)
               .where(UserProject.user_id == userId).limit(limit).offset(offset))

        try:
            members_att = await db.execute(stm)
            return members_att.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))