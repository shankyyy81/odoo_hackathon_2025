from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.models.user import User
from app.utils.auth import hash_password, verify_password, create_access_token, get_current_user
from datetime import timedelta
from app.core.config import settings

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

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    user = await User.find_one(User.email == user_credentials.email)
    if not user or not verify_password(user_credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        profile_picture=current_user.profile_picture,
        points=current_user.points,
        is_admin=current_user.is_admin
    ) 