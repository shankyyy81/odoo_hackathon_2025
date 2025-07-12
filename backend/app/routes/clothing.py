from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import Optional, List
from datetime import datetime
from app.schemas.clothing import (
    ClothingCreate, ClothingUpdate, ClothingResponse, 
    ClothingListResponse, ClothingCategory, ClothingCondition, ClothingSize
)
from app.models.clothing import Clothing
from app.models.user import User
from app.utils.auth import get_current_user
import math

router = APIRouter(prefix="/clothing", tags=["clothing"])

@router.post("/", response_model=ClothingResponse)
async def create_clothing_item(
    clothing_data: ClothingCreate,
    current_user: User = Depends(get_current_user)
):
    """Create a new clothing item"""
    clothing = Clothing(
        **clothing_data.dict(),
        seller_id=str(current_user.id)
    )
    await clothing.insert()
    return ClothingResponse(**clothing.dict())

@router.post("/with-images", response_model=ClothingResponse)
async def create_clothing_item_with_images(
    clothing_data: ClothingCreate,
    image_urls: List[str] = [],
    current_user: User = Depends(get_current_user)
):
    """Create a new clothing item with image URLs"""
    clothing = Clothing(
        **clothing_data.dict(),
        images=image_urls,
        seller_id=str(current_user.id)
    )
    await clothing.insert()
    return ClothingResponse(**clothing.dict())

@router.get("/", response_model=ClothingListResponse)
async def list_clothing_items(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    category: Optional[ClothingCategory] = None,
    condition: Optional[ClothingCondition] = None,
    size_filter: Optional[ClothingSize] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    search: Optional[str] = None,
    sort_by: str = Query("created_at", regex="^(created_at|price|title)$"),
    sort_order: str = Query("desc", regex="^(asc|desc)$")
):
    """List clothing items with filtering and pagination"""
    # Build query filters
    filters = {"is_sold": False}
    
    if category:
        filters["category"] = category
    if condition:
        filters["condition"] = condition
    if size_filter:
        filters["size"] = size_filter
    if min_price is not None:
        filters["price"] = {"$gte": min_price}
    if max_price is not None:
        if "price" in filters:
            filters["price"]["$lte"] = max_price
        else:
            filters["price"] = {"$lte": max_price}
    
    # Get total count
    total = await Clothing.find(filters).count()
    
    # Build sort
    sort_direction = -1 if sort_order == "desc" else 1
    sort_params = [(sort_by, sort_direction)]
    
    # Get paginated results
    skip = (page - 1) * size
    items = await Clothing.find(filters).sort(sort_params).skip(skip).limit(size).to_list()
    
    return ClothingListResponse(
        items=[ClothingResponse(**item.dict()) for item in items],
        total=total,
        page=page,
        size=size,
        pages=math.ceil(total / size)
    )

@router.get("/{item_id}", response_model=ClothingResponse)
async def get_clothing_item(item_id: str):
    """Get a specific clothing item by ID"""
    item = await Clothing.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Clothing item not found")
    
    # Increment view count
    item.views_count += 1
    await item.save()
    
    return ClothingResponse(**item.dict())

@router.put("/{item_id}", response_model=ClothingResponse)
async def update_clothing_item(
    item_id: str,
    clothing_data: ClothingUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update a clothing item (only by seller)"""
    item = await Clothing.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Clothing item not found")
    
    if str(item.seller_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to update this item")
    
    if item.is_sold:
        raise HTTPException(status_code=400, detail="Cannot update sold item")
    
    # Update fields
    update_data = clothing_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    
    item.updated_at = datetime.utcnow()
    await item.save()
    
    return ClothingResponse(**item.dict())

@router.delete("/{item_id}")
async def delete_clothing_item(
    item_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete a clothing item (only by seller)"""
    item = await Clothing.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Clothing item not found")
    
    if str(item.seller_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to delete this item")
    
    await item.delete()
    return {"message": "Item deleted successfully"}

@router.get("/my/listings", response_model=List[ClothingResponse])
async def get_my_listings(current_user: User = Depends(get_current_user)):
    """Get current user's clothing listings"""
    items = await Clothing.find(Clothing.seller_id == str(current_user.id)).to_list()
    return [ClothingResponse(**item.dict()) for item in items]

@router.get("/my/purchases", response_model=List[ClothingResponse])
async def get_my_purchases(current_user: User = Depends(get_current_user)):
    """Get current user's purchased items"""
    items = await Clothing.find(Clothing.buyer_id == str(current_user.id)).to_list()
    return [ClothingResponse(**item.dict()) for item in items]

@router.post("/{item_id}/like")
async def like_clothing_item(
    item_id: str,
    current_user: User = Depends(get_current_user)
):
    """Like a clothing item"""
    item = await Clothing.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Clothing item not found")
    
    # Allow users to like their own items (removed restriction)
    # if str(item.seller_id) == str(current_user.id):
    #     raise HTTPException(status_code=400, detail="Cannot like your own item")
    
    item.likes_count += 1
    await item.save()
    
    return {"message": "Item liked successfully"}

@router.post("/{item_id}/purchase")
async def purchase_clothing_item(
    item_id: str,
    current_user: User = Depends(get_current_user)
):
    """Purchase a clothing item"""
    item = await Clothing.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Clothing item not found")
    
    if item.is_sold:
        raise HTTPException(status_code=400, detail="Item is already sold")
    
    if str(item.seller_id) == str(current_user.id):
        raise HTTPException(status_code=400, detail="Cannot purchase your own item")
    
    # Update item status
    item.is_sold = True
    item.buyer_id = str(current_user.id)
    item.sold_at = datetime.utcnow()
    await item.save()
    
    # Award points to seller (you can implement this later)
    # seller = await User.get(item.seller_id)
    # seller.points += 10  # or whatever point system you want
    # await seller.save()
    
    return {"message": "Item purchased successfully"} 