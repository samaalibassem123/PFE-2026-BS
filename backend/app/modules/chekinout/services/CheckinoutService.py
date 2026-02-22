from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.models import Attendance


class CheckinOutService:
    @staticmethod
    async def get_checkinouts(db:AsyncSession):
        try:
            checkinouts = await db.execute(select(Attendance))
            return checkinouts.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))