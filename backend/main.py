from datetime import datetime, timedelta
from typing import List
import jwt
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from sqlalchemy.orm import Session

# Internal module imports
from database import  engine, SessionLocal
from models import FoodReview, UserDB, Base
from schemas import UserLogin, UserRegister, ReviewCreate, ReviewResponse
# Assuming you have a database setup file where SessionLocal is defined
# from database import SessionLocal 

app = FastAPI(title="MessMate API", description="Backend for student mess food reviews")

Base.metadata.create_all(bind=engine)

# Enable CORS for React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security Constants
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "hackathon_mega_secret_key_change_this"
ALGORITHM = "HS256"




# --- DATABASE DEPENDENCY ---
def get_db():
    """
    Yields a database session per request and closes it after.
    """
    # Replace 'SessionLocal()' with whatever your actual DB session factory is called
    db = SessionLocal() 
    try:
        yield db
    finally:
        db.close()

# --- API ENDPOINTS ---

# ==========================================
# AUTHENTICATION ENDPOINTS
# ==========================================

@app.post("/api/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # 1. Validate distinct username
    existing_username = db.query(UserDB).filter(UserDB.username == user_data.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username is already taken")
        
    # 2. Validate distinct email
    existing_email = db.query(UserDB).filter(UserDB.email == user_data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email is already registered")

    # 3. Hash secret password and commit entry
    hashed_password = pwd_context.hash(user_data.password)
    new_user = UserDB(
        username=user_data.username,
        email=user_data.email,
        password_hash=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully!"}


@app.post("/api/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    # 1. Look up user profile by username
    user = db.query(UserDB).filter(UserDB.username == user_data.username).first()
    
    # 2. Verify existence and validate hash matching
    if not user or not pwd_context.verify(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
        
    # 3. Issue JWT Token (set to 1 day expiration for hackathon ease)
    expire = datetime.utcnow() + timedelta(days=1)
    token_data = {"sub": user.username, "exp": expire}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "message": "Login successful",
        "token": token,
        "username": user.username
    }

@app.post("/reviews/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    """
    Submit a new food review. Validates input JSON using ReviewCreate schema.
    """
    db_review = FoodReview(
        student_name=review.student_name,
        hostel_name=review.hostel_name,
        meal_type=review.meal_type,
        food_item=review.food_item,
        rating=review.rating,
        comment=review.comment
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    
    return db_review 



@app.get("/reviews/", response_model=List[ReviewResponse])
def get_all_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch a list of mess food reviews with pagination.
    """
    reviews = db.query(FoodReview).offset(skip).limit(limit).all()
    return reviews
   


@app.get("/reviews/{review_id}", response_model=ReviewResponse)
def get_review_by_id(review_id: int, db: Session = Depends(get_db)):
    """
    Fetch a single review by its ID.
    """
    review = db.query(FoodReview).filter(FoodReview.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review