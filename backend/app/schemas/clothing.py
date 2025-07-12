from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ClothingCategory(str, Enum):
    TOPS = "tops"
    BOTTOMS = "bottoms"
    DRESSES = "dresses"
    OUTERWEAR = "outerwear"
    SHOES = "shoes"
    ACCESSORIES = "accessories"
    OTHER = "other"

class ClothingCondition(str, Enum):
    NEW = "new"
    LIKE_NEW = "like_new"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"

class ClothingSize(str, Enum):
    XS = "xs"
    S = "s"
    M = "m"
    L = "l"
    XL = "xl"
    XXL = "xxl"
    ONE_SIZE = "one_size"

class ClothingCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=10, max_length=1000)
    category: ClothingCategory
    condition: ClothingCondition
    size: ClothingSize
    brand: Optional[str] = Field(None, max_length=50)
    color: Optional[str] = Field(None, max_length=30)
    material: Optional[str] = Field(None, max_length=50)
    price: float = Field(..., gt=0)
    original_price: Optional[float] = Field(None, gt=0)
    tags: List[str] = Field(default_factory=list)

class ClothingUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=10, max_length=1000)
    category: Optional[ClothingCategory] = None
    condition: Optional[ClothingCondition] = None
    size: Optional[ClothingSize] = None
    brand: Optional[str] = Field(None, max_length=50)
    color: Optional[str] = Field(None, max_length=30)
    material: Optional[str] = Field(None, max_length=50)
    price: Optional[float] = Field(None, gt=0)
    original_price: Optional[float] = Field(None, gt=0)
    tags: Optional[List[str]] = None

class ClothingResponse(BaseModel):
    id: str
    title: str
    description: str
    category: ClothingCategory
    condition: ClothingCondition
    size: ClothingSize
    brand: Optional[str]
    color: Optional[str]
    material: Optional[str]
    price: float
    original_price: Optional[float]
    images: List[str]
    tags: List[str]
    seller_id: str
    buyer_id: Optional[str]
    is_sold: bool
    is_featured: bool
    views_count: int
    likes_count: int
    created_at: datetime
    updated_at: datetime
    sold_at: Optional[datetime]

class ClothingListResponse(BaseModel):
    items: List[ClothingResponse]
    total: int
    page: int
    size: int
    pages: int 