from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.core.auth.jwt import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token:str = Depends(oauth2_scheme) ):
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    # get user from db
    user = "test"
    if user is None:
        raise HTTPException(status_code=400, detail="User does not exist")

    return user


