import cloudinary
import cloudinary.uploader
import cloudinary.api
from app.core.config import settings

# Configure Cloudinary only if credentials are provided
if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET
    )
    CLOUDINARY_ENABLED = True
else:
    CLOUDINARY_ENABLED = False

# Default upload parameters for clothing images
DEFAULT_UPLOAD_PARAMS = {
    "folder": "rewear/clothing",
    "allowed_formats": ["jpg", "jpeg", "png", "webp"],
    "transformation": [
        {"width": 800, "height": 800, "crop": "fill", "gravity": "auto"},
        {"quality": "auto", "fetch_format": "auto"}
    ]
}

async def upload_image(file, public_id=None):
    """Upload an image to Cloudinary with optimized settings"""
    if not CLOUDINARY_ENABLED:
        raise Exception("Cloudinary is not configured. Please add Cloudinary credentials to your .env file.")
    
    try:
        upload_params = DEFAULT_UPLOAD_PARAMS.copy()
        if public_id:
            upload_params["public_id"] = public_id
            
        result = cloudinary.uploader.upload(
            file,
            **upload_params
        )
        
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "width": result["width"],
            "height": result["height"],
            "format": result["format"]
        }
    except Exception as e:
        raise Exception(f"Failed to upload image: {str(e)}")

async def delete_image(public_id):
    """Delete an image from Cloudinary"""
    if not CLOUDINARY_ENABLED:
        raise Exception("Cloudinary is not configured. Please add Cloudinary credentials to your .env file.")
    
    try:
        result = cloudinary.uploader.destroy(public_id)
        print(f"[CLOUDINARY] Delete result for {public_id}: {result}")
        
        # Check if deletion was successful
        if result.get("result") == "ok":
            return {"success": True, "message": "Image deleted successfully", "result": result}
        elif result.get("result") == "not found":
            return {"success": False, "message": "Image not found in Cloudinary", "result": result}
        else:
            return {"success": False, "message": f"Unexpected result: {result.get('result')}", "result": result}
            
    except Exception as e:
        print(f"[CLOUDINARY] Error deleting {public_id}: {e}")
        raise Exception(f"Failed to delete image: {str(e)}")

async def get_image_url(public_id, transformation=None):
    """Get optimized image URL with optional transformations"""
    if not CLOUDINARY_ENABLED:
        raise Exception("Cloudinary is not configured. Please add Cloudinary credentials to your .env file.")
    
    try:
        if transformation:
            return cloudinary.CloudinaryImage(public_id).build_url(transformation=transformation)
        return cloudinary.CloudinaryImage(public_id).build_url()
    except Exception as e:
        raise Exception(f"Failed to generate image URL: {str(e)}") 