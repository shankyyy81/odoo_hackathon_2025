from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    MONGODB_URI: str
    DATABASE_NAME: str = "rewear"
    JWT_SECRET_KEY: str
    CLOUDINARY_URL: str = ""
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()

settings = get_settings() 