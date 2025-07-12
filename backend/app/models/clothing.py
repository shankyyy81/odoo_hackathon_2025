from beanie import Document, Indexed
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

class Clothing(Document):
    title: str
    description: str
    category: ClothingCategory
    condition: ClothingCondition
    size: ClothingSize
    brand: Optional[str] = None
    color: Optional[str] = None
    material: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    images: List[str] = []  # Cloudinary URLs
    tags: List[str] = []
    
    # User relationships
    seller_id: Indexed(str)  # User who listed the item
    buyer_id: Optional[str] = None  # User who purchased (if sold)
    
    # Status and metadata
    is_sold: bool = False
    is_featured: bool = False
    views_count: int = 0
    likes_count: int = 0
    
    # Timestamps
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
    sold_at: Optional[datetime] = None
    
    class Settings:
        name = "clothing"
        indexes = [
            "category",
            "condition", 
            "size",
            "price",
            "is_sold",
            "created_at"
        ]
    
    class Config:
        use_enum_values = True 