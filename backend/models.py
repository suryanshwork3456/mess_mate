from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)  # student, admin, worker
    roll_number = Column(String, unique=True, nullable=True)
    worker_id = Column(String, unique=True, nullable=True)
    admin_id = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Meal(Base):
    __tablename__ = "meals"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, index=True) # ISO Date
    meal_type = Column(String) # breakfast, lunch, dinner
    menu_items = Column(JSON) # List of strings
    created_at = Column(DateTime, default=datetime.utcnow)

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    meal_id = Column(Integer, ForeignKey("meals.id"))
    rating = Column(Float)
    emoji_rating = Column(String)
    tags = Column(JSON)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Complaint(Base):
    __tablename__ = "complaints"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    category = Column(String)
    status = Column(String, default="Pending") # Pending, In Progress, Resolved
    priority = Column(String, default="Medium")
    admin_notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Command(Base):
    __tablename__ = "commands"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    priority = Column(String)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="Pending")
    deadline = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class FoodReview(Base):
    __tablename__ = "food_reviews"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_name = Column(String(50), nullable=False)
    hostel_name = Column(String(50), nullable=False)
    meal_type = Column(String(20), nullable=False)  # Breakfast, Lunch, etc.
    food_item = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    # Note: datetime.utcnow is deprecated in newer python versions, but fine for now.
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class UserDB(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)