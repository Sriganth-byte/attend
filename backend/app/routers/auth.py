# backend/app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud
from ..database import SessionLocal

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup", response_model=schemas.UserOut)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = crud.get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user in users table
    created_user = crud.create_user(db, payload)

    # Role-specific handling
    if payload.role == "student":
        if not payload.roll_number or not payload.department:
            raise HTTPException(status_code=400, detail="Missing student information")
        crud.create_student(db, user_id=created_user.id,
                            roll_number=payload.roll_number,
                            department=payload.department)

    elif payload.role == "teacher":
        if not payload.employee_id or not payload.specialization:
            raise HTTPException(status_code=400, detail="Missing teacher information")
        crud.create_teacher(db, user_id=created_user.id,
                            employee_id=payload.employee_id,
                            specialization=payload.specialization)

    # Optional: admin logic already set in payload.is_admin
    # If you want additional admin table, handle here

    return created_user


@router.post("/signin", response_model=schemas.UserOut)
def signin(payload: schemas.SignInPayload, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return user
