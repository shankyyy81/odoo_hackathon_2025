from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    profile_picture: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    name: str
    profile_picture: Optional[str] = None
    points: int
    is_admin: bool 