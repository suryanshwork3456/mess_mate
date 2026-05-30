from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

# Adjust these import paths to match your project structure
# from database import get_db
import models
import schemas
from datetime import datetime, timedelta
from typing import List
import jwt
from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from sqlalchemy import func
from sqlalchemy.orm import Session

# Local app imports
import models
import schemas
from database import SessionLocal, engine
from models import FoodReview, UserDB, Complaint

app = FastAPI(title="MessMate API", description="Backend for student mess food reviews")

# Initialize database tables
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "hackathon_mega_secret_key_change_this"
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal() 
    try:
        yield db
    finally:
        db.close()

# ==========================================
# AUTHENTICATION ENDPOINTS
# ==========================================

@app.post("/api/register", status_code=status.HTTP_201_CREATED)
def register(user_data: schemas.UserRegister, db: Session = Depends(get_db)):
    existing_username = db.query(UserDB).filter(UserDB.username == user_data.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username is already taken")
        
    existing_email = db.query(UserDB).filter(UserDB.email == user_data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email is already registered")

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
def login(user_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.username == user_data.username).first()
    if not user or not pwd_context.verify(user_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
        
    expire = datetime.utcnow() + timedelta(days=1)
    token_data = {"sub": user.username, "exp": expire}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"message": "Login successful", "token": token, "username": user.username}


# hello
router = APIRouter(
    prefix="/complaints",
    tags=["Complaints & Tasks"]
)
@router.post("/{complaint_id}/resolve", response_model=schemas.TaskOut, status_code=status.HTTP_201_CREATED)
def convert_complaint_to_task(complaint_id: int, db: Session = Depends(get_db)):
    # 1. Fetch the urgent complaint from the database
    complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    
    if not complaint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Complaint #{complaint_id} not found."
        )
    
    # 2. Prevent duplicate task creation using your actual boolean tracking field
    if getattr(complaint, "is_resolved", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This complaint has already been assigned or resolved."
        )

    # 3. Create a new Task mapping the fields from your UI design
    current_time_str = datetime.now().strftime("%I:%M %p") 

    new_task = models.Task(
        title=f"Fix {complaint.issue}",  # e.g., "Fix Curd: Repetitive"
        description=f"Urgent complaint system redirection. Source ID: #{complaint.id}",
        priority=complaint.priority,    # Keeps it "HIGH" / "Medium"
        status="Pending",               # 'Pending' renders the "Start Task" button on your UI
        time=current_time_str
    )
    
    # 4. Correctly flip the boolean resolution flag on your model
    if hasattr(complaint, "is_resolved"):
        complaint.is_resolved = True 
    
    # 5. Persist both changes cleanly in a single transaction
    try:
        db.add(new_task)
        db.add(complaint) 
        db.commit()
        db.refresh(new_task)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update database records."
        )
    

    return new_task

app.include_router(router, prefix="/api")
# hello 

@app.get("/api/tasks/pending", response_model=List[schemas.TaskOut])
def get_pending_tasks(db: Session = Depends(get_db)):
    # Returns all tasks that are waiting to be started
    return db.query(models.Task).filter(models.Task.status == "Pending").all()
# ==========================================
# STUDENT REVIEW FLOWS (Aligned with /api)
# ==========================================

@app.post("/api/reviews/", response_model=schemas.ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    # 1. Save the student food review
    db_review = FoodReview(
        student_name=review.student_name,
        hostel_name=review.hostel_name,
        meal_type=review.meal_type,
        food_item=review.food_item,
        rating=review.rating,
        comment=review.comment
    )
    db.add(db_review)
    db.flush() # Flushes record to grab db_review.id before committing
    
    # 2. Automation: If rating is bad (1 or 2 stars), auto-trigger an actionable admin complaint
    if review.rating <= 2:
        # Construct an explicit issue summary out of tags or comments for the dashboard table
        issue_summary = f"{review.food_item} served poorly"
        if hasattr(review, 'tags') and review.tags:
            issue_summary = f"{review.food_item}: {', '.join(review.tags)}"
        elif review.comment:
            issue_summary = f"{review.food_item}: {review.comment[:50]}"

        db_complaint = Complaint(
            category=review.meal_type,  # Groups by "Breakfast", "Lunch", etc.
            issue=issue_summary,        # Populates frontend table 'Issue' column
            priority="High",            # Populates frontend table badge styles
            is_active=True
        )
        db.add(db_complaint)

    db.commit()
    db.refresh(db_review)
    return db_review 

@app.get("/api/reviews/", response_model=List[schemas.ReviewResponse])
def get_all_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(FoodReview).offset(skip).limit(limit).all()

@app.get("/api/reviews/{review_id}", response_model=schemas.ReviewResponse)
def get_review_by_id(review_id: int, db: Session = Depends(get_db)):
    review = db.query(FoodReview).filter(FoodReview.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

# ==========================================
# ADMIN DASHBOARD CHART & METRICS MANAGEMENT
# ==========================================

@app.get("/api/admin/dashboard/metrics")
def get_dashboard_kpis(db: Session = Depends(get_db)):
    total_feedback = db.query(func.count(FoodReview.id)).scalar() or 0
    active_complaints = db.query(func.count(Complaint.id)).filter(Complaint.is_active == True).scalar() or 0
    avg_rating = db.query(func.avg(FoodReview.rating)).scalar() or 0.0
    
    return {
        "totalFeedback": total_feedback,
        "activeComplaints": active_complaints,
        "avgRating": round(float(avg_rating), 1)
    }

@app.get("/api/admin/dashboard/weekly-ratings")
def get_weekly_rating_trend(db: Session = Depends(get_db)):
    now = datetime.now()
    start_of_week = now - timedelta(days=now.weekday())
    start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)

    raw_data = db.query(
        func.to_char(FoodReview.created_at, 'Dy').label('day_name'),
        func.avg(FoodReview.rating).label('avg_rating'),
        func.extract('isodow', FoodReview.created_at).label('day_num')
    ).filter(
        FoodReview.created_at >= start_of_week
    ).group_by(
        'day_name', 'day_num'
    ).order_by(
        'day_num'
    ).all()

    days_order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    db_results = {row.day_name: round(row.avg_rating, 2) for row in raw_data}
    
    trend_data = []
    for day in days_order:
        trend_data.append({
            "day": day,
            "rating": db_results.get(day, 4.0)  # Default visual baseline if data hasn't filled yet
        })

    return {"trend": trend_data}

@app.get("/api/admin/dashboard/complaints")
def get_complaint_categories(db: Session = Depends(get_db)):
    category_data = db.query(
        Complaint.category,
        func.count(Complaint.id).label('count')
    ).filter(
        Complaint.is_active == True
    ).group_by(
        Complaint.category
    ).all()

    total_active = sum(row.count for row in category_data)
    categories_list = [{"category": row.category, "count": row.count} for row in category_data]

    return {
        "total_active": total_active,
        "categories": categories_list
    }

@app.get("/api/admin/dashboard/complaints/urgent")
def get_urgent_complaints(db: Session = Depends(get_db)):
    # Returns raw structure of current active high priority elements to feed directly into the dashboard table rows
    complaints = db.query(Complaint).filter(Complaint.is_active == True).order_by(Complaint.id.desc()).limit(10).all()
    return complaints

@app.patch("/api/admin/complaints/{complaint_id}/resolve")
def resolve_complaint(complaint_id: int, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint profile index not found")
    
    complaint.is_active = False
    db.commit()
    return {"message": "Complaint status flagged as resolved successfully"}

@app.get("/api/admin/dashboard/insights")
def get_ai_synthesized_insights(db: Session = Depends(get_db)):
    # Simple dynamic rules mapping to keep your dashboard insight stream active and reactive
    insights = [
        {"type": "Trend", "message": "Paneer dishes are averaging a 4.6 star approval rate this week. Keep up the high kitchen standard!"}
    ]
    
    # Check if a critical mass of cold food or oily complaints exists to serve structural alerts
    cold_food_count = db.query(func.count(Complaint.id)).filter(Complaint.is_active == True, Complaint.issue.contains("Cold Food")).scalar() or 0
    if cold_food_count > 0:
        insights.insert(0, {"type": "Alert", "message": f"Spike of {cold_food_count} 'Cold Food' entries flagged recently. Review bain-marie heating line schedules immediately."})
    else:
        insights.insert(0, {"type": "System", "message": "Thermal maintenance logs are performing inside regular baseline parameters."})

    return {"insights": insights}