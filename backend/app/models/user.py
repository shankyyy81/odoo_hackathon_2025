from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional

class User(Document):
    email: EmailStr = Field(unique=True)
    password_hash: str
    name: str
    profile_picture: Optional[str] = None
    points: int = 0
    is_admin: bool = False

    class Settings:
        name = "users"
        indexes = [
            ["email"]
        ] 