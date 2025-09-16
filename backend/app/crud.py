# backend/app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        dob=user.dob,
        email=user.email,
        password=user.password,  # plain text per request (consider hashing)
        role=user.role or "student",
        is_admin=bool(user.is_admin),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    # plain text comparison
    if user.password != password:
        return None
    return user

# -------------------------
# Role-specific CRUD
# -------------------------

def create_student(db: Session, user_id: int, roll_number: str, department: str):
    db_student = models.Student(
        user_id=user_id,
        roll_number=roll_number,
        department=department
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def create_teacher(db: Session, user_id: int, employee_id: str, specialization: str):
    db_teacher = models.Teacher(
        user_id=user_id,
        employee_id=employee_id,
        specialization=specialization
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher
