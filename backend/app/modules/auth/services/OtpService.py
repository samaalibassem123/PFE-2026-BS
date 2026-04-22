from fastapi import BackgroundTasks, HTTPException
from langsmith import expect

from app.core.auth.security import generate_otp
from app.core.email_services.ResendService import send_mail
from app.core.redis.redis_client import redis_client

OTP_EXPIRE_SECONDS = 300  # 5 minutes


class OtpService:

    @staticmethod
    async def store_otp(user_email:str, otp:str):
        key = f'otp:{user_email}'
        print(otp)
        await redis_client.set(key, otp, ex=OTP_EXPIRE_SECONDS)

    @staticmethod
    async def verify_otp(otp:str, user_email:str):
        try :
            print(otp, user_email)
            key = f'otp:{user_email}'
            stored_otp = await redis_client.get(key)

            if not stored_otp:
                return False

            if otp != stored_otp:
                return False

            return True

        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=str(e))



