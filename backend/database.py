from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Connect to sqlite for demo purposes so it runs immediately if they clone it,
# but the prompt asked for Postgres. In proper production we'd use os.getenv("DATABASE_URL")
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./messmate.db")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    # check_same_thread is needed only for sqlite
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
