from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

# ----------------------
# Base user schemas
# ----------------------
class UserBase(BaseModel):
    name: str
    dob: Optional[date]
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "student"  # student/teacher/admin
    is_admin: Optional[bool] = False
    passkey: Optional[str] = None  # optional admin passkey

    # Role-specific fields
    roll_number: Optional[str] = None      # for students
    department: Optional[str] = None       # for students
    employee_id: Optional[str] = None      # for teachers
    specialization: Optional[str] = None   # for teachers

class UserOut(UserBase):
    id: int
    role: str
    is_admin: bool

    class Config:
        orm_mode = True

class SignInPayload(BaseModel):
    email: EmailStr
    password: str
