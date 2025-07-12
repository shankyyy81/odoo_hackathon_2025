from fastapi import FastAPI
from app.core.db import init_db
from app.routes.user import router as user_router
from app.routes.clothing import router as clothing_router
from app.routes.images import router as images_router
from app.models.clothing import Clothing

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(user_router)
app.include_router(clothing_router)
app.include_router(images_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to ReWear API!"} 