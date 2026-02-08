from typing import List

from fastapi import Depends, Request, HTTPException
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher


from app.core.auth import verify_token


password_hasher = PasswordHash((Argon2Hasher(),))

def hash_password(plain_password: str) -> str:
    return password_hasher.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return password_hasher.verify(plain_password, hashed_password)
    except Exception :
        return False




def get_current_user(request:Request):
    token = request.cookies.get('access_token')
    print(token)
    if not token:
        raise HTTPException(status_code=404, detail='user unothorized')

    payload = verify_token(token)
    return payload


def require_role(roles:List[str]):
    def role_checker(user=Depends(get_current_user)):
        if user['role'] not in roles:
            raise HTTPException(status_code=400, detail='route unothorized')
        return user
    return role_checker




