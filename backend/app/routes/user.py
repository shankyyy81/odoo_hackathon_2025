from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from app.utils.auth import hash_password

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register", response_model=UserResponse)
async def register_user(user_in: UserCreate):
    existing = await User.find_one(User.email == user_in.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
        name=user_in.name,
        profile_picture=user_in.profile_picture,
        points=0,
        is_admin=False
    )
    await user.insert()
    return UserResponse(
        id=str(user.id),
        email=user.email,
        name=user.name,
        profile_picture=user.profile_picture,
        points=user.points,
        is_admin=user.is_admin
    ) 