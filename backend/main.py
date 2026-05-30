from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

# In a real app we would import routers here
# from routers import auth, meals, feedback, complaints, suggestions, commands, announcements, analytics

app = FastAPI(title="MessMate API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to MessMate API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Placeholder routers for demonstration
# app.include_router(auth.router, prefix="/auth", tags=["Auth"])
# app.include_router(meals.router, prefix="/meals", tags=["Meals"])
# app.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
# app.include_router(complaints.router, prefix="/complaints", tags=["Complaints"])
# app.include_router(commands.router, prefix="/commands", tags=["Commands"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
