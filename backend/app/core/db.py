from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import get_settings
import logging

# Import your document models here when you create them
# from app.models.user import User
# from app.models.item import Item

async def init_db():
    settings = get_settings()
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    # Add your document models to the list below as you create them
    await init_beanie(database=db, document_models=[])
    logging.info("MongoDB and Beanie initialized!") 