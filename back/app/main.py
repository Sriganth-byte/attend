from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routes import auth

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Allow frontend React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI backend is running!"}

# Register routes
app.include_router(auth.router)
