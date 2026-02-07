from fastapi import HTTPException
from jose import jwt, JWTError
from datetime import  datetime, timedelta, timezone

from app.core.config import settings



def create_access_token(data:dict):
    to_encode = data.copy()
    time_now = datetime.now(timezone.utc)
    expire = time_now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode['exp'] = expire
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHMS)


def verify_token(token:str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHMS)
        return payload
    except JWTError:
        raise HTTPException(status_code=400, detail='Unothorized token')
