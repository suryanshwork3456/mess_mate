from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text
from sqlalchemy.sql import func
from database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, func

class UserDB(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="student")  # student, admin, worker

class FoodReview(Base):
    __tablename__ = "food_reviews"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, nullable=False)
    hostel_name = Column(String, nullable=False)
    meal_type = Column(String, nullable=False)
    food_item = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    
    # 🔴 FIX: Add default=datetime.utcnow (Pass the function itself, do NOT call it with parentheses)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)  # 'Breakfast', 'Lunch', etc.
    is_active = Column(Boolean, default=True)
    
    # 🔴 ADD THESE MISSING COLUMNS TO MATCH main.py:
    issue = Column(Text, nullable=True)        # Stores what went wrong (e.g., "Curd: Cold Food")
    priority = Column(String, nullable=True)   # Stores "High", "Medium", "Low" for dashboard badges
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(String, nullable=False)
    status = Column(String, default="Pending")  # Tracks "Pending", "In Progress", "Completed"
    time = Column(String, nullable=False)        # Stores timestamp strings like "10:30 AM"