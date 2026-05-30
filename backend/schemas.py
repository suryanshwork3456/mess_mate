from pydantic import BaseModel, Field , EmailStr
from typing import Optional, List
from datetime import datetime

# Validator for creating a new food review
class ReviewCreate(BaseModel):
    student_name: str
    hostel_name: str
    meal_type: str
    food_item: str
    rating: int
    comment: Optional[str] = None
    tags: Optional[List[str]] = []

# Validator for responding back to the client
class ReviewResponse(ReviewCreate):
    id: int
    created_at: datetime

    # Modern Pydantic v2 configuration style
    model_config = {
        "from_attributes": True
    }

# For Registration (Username, Email, Password)
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

# For Login (Username, Password)
class UserLogin(BaseModel):
    username: str
    password: str

# Schema for Weekly Rating Trend
class DayRating(BaseModel):
    day: str       # "Mon", "Tue", etc.
    rating: float  # Average rating for that day, e.g., 4.3

class WeeklyRatingResponse(BaseModel):
    trend: List[DayRating]

# Schema for Complaint Categories
class CategoryCount(BaseModel):
    category: str
    count: int

class ComplaintCategoryResponse(BaseModel):
    total_active: int
    categories: List[CategoryCount]

class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    time: str

    class Config:
        from_attributes = True  # Allows Pydantic to read SQLAlchemy models