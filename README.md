# odoo_hackathon_2025

**Problem statement:** ReWear – Community Clothing Exchange
**Team:** Smells Like Team Spirit

## Backend Setup (FastAPI, MongoDB, Cloudinary)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd odoo_hackathon_2025
```

### 2. Install Python dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Set up environment variables
Create a `.env` file in the `backend` directory with the following content:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
DATABASE_NAME=rewear
JWT_SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

- Get your Cloudinary credentials from your Cloudinary dashboard.
- Get your MongoDB URI from MongoDB Atlas or your local MongoDB instance.

### 4. Run the backend server
```bash
uvicorn app.main:app --reload
```

- The API will be available at `http://localhost:8000`
- Interactive API docs: `http://localhost:8000/docs`

### 5. API Features
- User registration & login (JWT auth)
- Clothing item CRUD (with filtering, pagination)
- Image upload (Cloudinary), delete, and validation
- User-specific listings, likes, purchases

---

**For Cloudinary setup details, see:** `backend/CLOUDINARY_SETUP.md`

---

**Team emails:**
- Shashank Sathish: shashank2310219@ssn.edu.in
- Sidharth K: sidharth2310104@ssn.edu.in
- Saktheeswaran: saktheeswaran2310906@ssn.edu.in
