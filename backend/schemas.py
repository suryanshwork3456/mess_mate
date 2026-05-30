from pydantic import BaseModel, Field , EmailStr
from typing import Optional
from datetime import datetime

# Validator for creating a new food review
class ReviewCreate(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=50, description="Name of the student")
    hostel_name: str = Field(..., description="e.g., Tandon, Malviya, SVBH")
    meal_type: str = Field(..., description="Breakfast, Lunch, Snacks, or Dinner")
    food_item: str = Field(..., min_length=2, description="The specific dish being reviewed")
    rating: int = Field(..., ge=1, le=5, description="Rating between 1 and 5 stars")
    comment: Optional[str] = Field(None, max_length=500, description="Optional text feedback")

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