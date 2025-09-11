# backend/app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    name: str
    dob: Optional[date]
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "student"
    is_admin: Optional[bool] = False
    passkey: Optional[str] = None  # frontend can forward if needed

class UserOut(UserBase):
    id: int
    role: str
    is_admin: bool

    class Config:
        orm_mode = True

class SignInPayload(BaseModel):
    email: EmailStr
    password: str
