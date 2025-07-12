from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
from typing import List
from app.models.user import User
from app.utils.auth import get_current_user
from app.core.cloudinary_config import upload_image, delete_image
import uuid

router = APIRouter(prefix="/images", tags=["images"])

@router.post("/upload")
async def upload_clothing_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Upload a single image for clothing items"""
    
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image (jpg, jpeg, png, webp)"
        )
    
    # Validate file size (max 10MB)
    if file.size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File size must be less than 10MB"
        )
    
    try:
        # Generate unique public_id for the image
        public_id = f"rewear/clothing/{current_user.id}/{uuid.uuid4()}"
        
        # Upload to Cloudinary
        result = await upload_image(file.file, public_id)
        
        return {
            "message": "Image uploaded successfully",
            "image_url": result["url"],
            "public_id": result["public_id"],
            "width": result["width"],
            "height": result["height"]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload image: {str(e)}"
        )

@router.post("/upload-multiple")
async def upload_multiple_images(
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user)
):
    """Upload multiple images for clothing items"""
    
    if len(files) > 5:
        raise HTTPException(
            status_code=400,
            detail="Maximum 5 images allowed per upload"
        )
    
    uploaded_images = []
    
    for file in files:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail=f"File {file.filename} must be an image"
            )
        
        # Validate file size (max 10MB per file)
        if file.size > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail=f"File {file.filename} size must be less than 10MB"
            )
    
    try:
        for file in files:
            # Generate unique public_id for each image
            public_id = f"rewear/clothing/{current_user.id}/{uuid.uuid4()}"
            
            # Upload to Cloudinary
            result = await upload_image(file.file, public_id)
            
            uploaded_images.append({
                "filename": file.filename,
                "image_url": result["url"],
                "public_id": result["public_id"],
                "width": result["width"],
                "height": result["height"]
            })
        
        return {
            "message": f"Successfully uploaded {len(uploaded_images)} images",
            "images": uploaded_images
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload images: {str(e)}"
        )

@router.delete("/{public_id:path}")
async def delete_clothing_image(
    public_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete an image from Cloudinary"""
    print(f"[DEBUG] Attempting to delete image with public_id: {public_id}")
    print(f"[DEBUG] Current user ID: {current_user.id}")
    try:
        # Verify the image belongs to the current user
        if not public_id.startswith(f"rewear/clothing/{current_user.id}/"):
            print(f"[DEBUG] Not authorized: public_id does not match user")
            raise HTTPException(
                status_code=403,
                detail="Not authorized to delete this image"
            )
        result = await delete_image(public_id)
        print(f"[DEBUG] Cloudinary delete result: {result}")
        
        if result.get("success"):
            return {
                "message": result["message"],
                "result": result["result"]
            }
        else:
            return {
                "message": result["message"],
                "result": result["result"],
                "note": "The image may not exist in Cloudinary or may have already been deleted"
            }
    except Exception as e:
        print(f"[ERROR] Failed to delete image: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete image: {str(e)}"
        ) 