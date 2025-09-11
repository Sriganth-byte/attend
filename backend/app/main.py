# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth

app = FastAPI(title="LocalAuth (dev)")

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create DB tables
Base.metadata.create_all(bind=engine)

# include routers
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "backend up. Use /auth/signup and /auth/signin"}
