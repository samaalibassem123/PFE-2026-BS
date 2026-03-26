from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from fastapi.responses import JSONResponse
from app.core.config import settings
from fastapi import  Request,status

class MaintenanceMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.allowed_origins = settings.ALLOWED_ORIGINS

    async def dispatch(self, request: Request, call_next):
        if not settings.MAINTAINANCE_MODE:
            return await call_next(request)

        origin = request.headers.get("origin", "")
        cors_headers = (
            {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
            }
            if origin in self.allowed_origins
            else {}
        )

        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"detail": "The app is updating. Please try again in 1 minute."},
            headers=cors_headers,
        )