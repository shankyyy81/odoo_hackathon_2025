# Cloudinary Integration Setup

## Prerequisites

1. Create a free Cloudinary account at https://cloudinary.com/
2. Get your credentials from the Cloudinary Dashboard

## Environment Variables

Add these to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://your-api-key:your-api-secret@your-cloud-name
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## How to Get Cloudinary Credentials

1. Sign up at https://cloudinary.com/
2. Go to your Dashboard
3. Copy the following values:
   - **Cloud Name**: Found in the dashboard URL
   - **API Key**: Listed in the dashboard
   - **API Secret**: Listed in the dashboard

## API Endpoints

### Upload Single Image
```
POST /images/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: <image_file>
```

### Upload Multiple Images
```
POST /images/upload-multiple
Content-Type: multipart/form-data
Authorization: Bearer <token>

files: <image_files> (max 5)
```

### Delete Image
```
DELETE /images/{public_id}
Authorization: Bearer <token>
```

### Create Clothing with Images
```
POST /clothing/with-images
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Vintage Denim Jacket",
  "description": "Classic denim jacket in great condition",
  "category": "outerwear",
  "condition": "good",
  "size": "m",
  "price": 45.0,
  "image_urls": ["https://res.cloudinary.com/...", "https://res.cloudinary.com/..."]
}
```

## Features

- **Automatic Image Optimization**: Images are resized to 800x800px and optimized
- **Multiple Formats**: Supports JPG, JPEG, PNG, and WebP
- **User Isolation**: Images are organized by user ID
- **File Validation**: 10MB max file size, image type validation
- **Secure URLs**: Uses HTTPS URLs for all images 