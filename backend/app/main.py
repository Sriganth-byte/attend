# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth

app = FastAPI(title="LocalAuth (dev)")

# ✅ Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update if frontend URL changes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create all tables in SQLite DB (users, students, teachers, etc.)
Base.metadata.create_all(bind=engine)

# ✅ Include auth router (signup/signin)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "backend up. Use /auth/signup and /auth/signin"}
