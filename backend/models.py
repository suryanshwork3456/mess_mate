# from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Enum
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from .database import Base
# from sqlalchemy import Column, Integer, String, Text, DateTime
# from sqlalchemy.ext.declarative import declarative_base
# from datetime import datetime
# from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
# from sqlalchemy.sql import func

# Base = declarative_base()

# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     email = Column(String, unique=True, index=True)
#     password_hash = Column(String)
#     role = Column(String)  # student, admin, worker
#     roll_number = Column(String, unique=True, nullable=True)
#     worker_id = Column(String, unique=True, nullable=True)
#     admin_id = Column(String, unique=True, nullable=True)
#     created_at = Column(DateTime, default=datetime.utcnow)

# class Meal(Base):
#     __tablename__ = "meals"
#     id = Column(Integer, primary_key=True, index=True)
#     date = Column(String, index=True) # ISO Date
#     meal_type = Column(String) # breakfast, lunch, dinner
#     menu_items = Column(JSON) # List of strings
#     created_at = Column(DateTime, default=datetime.utcnow)

# class Feedback(Base):
#     __tablename__ = "feedback"
#     id = Column(Integer, primary_key=True, index=True)
#     student_id = Column(Integer, ForeignKey("users.id"))
#     meal_id = Column(Integer, ForeignKey("meals.id"))
#     rating = Column(Float)
#     emoji_rating = Column(String)
#     tags = Column(JSON)
#     comment = Column(String, nullable=True)
#     created_at = Column(DateTime, default=datetime.utcnow)

# class Review(Base):
#     __tablename__ = "reviews"

#     id = Column(Integer, primary_key=True, index=True)
#     rating = Column(Float, nullable=False)  # e.g., 4.5
#     comment = Column(String, nullable=True)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

# class Complaint(Base):
#     __tablename__ = "complaints"

#     id = Column(Integer, primary_key=True, index=True)
#     category = Column(String, nullable=False)  # e.g., "Hostel", "Mess", "Academics"
#     is_active = Column(Boolean, default=True)  # To match the "18 ACTIVE" text
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

# class Command(Base):
#     __tablename__ = "commands"
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     description = Column(String)
#     priority = Column(String)
#     assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
#     status = Column(String, default="Pending")
#     deadline = Column(String)
#     created_at = Column(DateTime, default=datetime.utcnow)

# class FoodReview(Base):
#     __tablename__ = "food_reviews"

#     id = Column(Integer, primary_key=True, index=True, autoincrement=True)
#     student_name = Column(String(50), nullable=False)
#     hostel_name = Column(String(50), nullable=False)
#     meal_type = Column(String(20), nullable=False)  # Breakfast, Lunch, etc.
#     food_item = Column(String(100), nullable=False)
#     rating = Column(Integer, nullable=False)
#     comment = Column(Text, nullable=True)
#     # Note: datetime.utcnow is deprecated in newer python versions, but fine for now.
#     created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# class UserDB(Base):
#     __tablename__ = "users"
    
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True, nullable=False)
#     email = Column(String, unique=True, index=True, nullable=False)
#     password_hash = Column(String, nullable=False)



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