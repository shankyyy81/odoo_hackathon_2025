from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import get_settings
from app.models.user import User
from app.models.clothing import Clothing
import logging

async def init_db():
    settings = get_settings()
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    await init_beanie(database=db, document_models=[User, Clothing])
    logging.info("MongoDB and Beanie initialized!") 