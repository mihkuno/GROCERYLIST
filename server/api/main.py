from typing import List, Union
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Database Setup
DATABASE_URL = "mysql+pymysql://root:Ashing123$!@localhost:3306/GROCERYLIST"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class UserDB(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(45), nullable=False)
    email = Column(String(45), nullable=False, unique=True)
    password = Column(String(32), nullable=False)
    last_login = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    lists = relationship("ListDB", back_populates="user")

class ListDB(Base):
    __tablename__ = "List"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    name = Column(String(45), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, default=None)
    user = relationship("UserDB", back_populates="lists")
    items = relationship("ItemDB", back_populates="list")

class ItemDB(Base):
    __tablename__ = "Item"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    list_id = Column(Integer, ForeignKey("List.id"), nullable=False)
    name = Column(String(45), nullable=False)
    quantity = Column(Integer, default=1)
    price = Column(Float, default=0.00)
    is_checked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    list = relationship("ListDB", back_populates="items")

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic Models
class User(BaseModel):
    name: str
    email: str
    password: str

    class Config:
        orm_mode = True

class UserUpdateName(BaseModel):
    name: str

    class Config:
        orm_mode = True

class UserUpdatePassword(BaseModel):
    password: str

    class Config:
        orm_mode = True

class List(BaseModel):
    name: str
    user_id: int

    class Config:
        orm_mode = True

class Item(BaseModel):
    name: str
    quantity: int = 1
    price: float = 0.0
    is_checked: bool = False
    list_id: int

    class Config:
        orm_mode = True

# FastAPI app
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.post("/users/", response_model=User)
def create_user(user: User, db: SessionLocal = Depends(get_db)):
    db_user = UserDB(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int, db: SessionLocal = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{user_id}/name", response_model=User)
def update_user_name(user_id: int, user_update: UserUpdateName, db: SessionLocal = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.name = user_update.name

    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/users/{user_id}/password", response_model=User)
def update_user_password(user_id: int, user_update: UserUpdatePassword, db: SessionLocal = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.password = user_update.password

    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/lists/", response_model=List)
def create_list(list_data: List, db: SessionLocal = Depends(get_db)):
    db_list = ListDB(**list_data.dict())
    db.add(db_list)
    db.commit()
    db.refresh(db_list)
    return db_list

@app.get("/lists/{list_id}", response_model=List)
def get_list(list_id: int, db: SessionLocal = Depends(get_db)):
    list_entry = db.query(ListDB).filter(ListDB.id == list_id).first()
    if not list_entry:
        raise HTTPException(status_code=404, detail="List not found")
    return list_entry

@app.put("/lists/{list_id}", response_model=List)
def update_list(list_id: int, list_data: List, db: SessionLocal = Depends(get_db)):
    db_list = db.query(ListDB).filter(ListDB.id == list_id).first()
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    db_list.name = list_data.name
    db_list.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_list)
    return db_list

@app.post("/items/", response_model=Item)
def create_item(item: Item, db: SessionLocal = Depends(get_db)):
    db_item = ItemDB(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int, db: SessionLocal = Depends(get_db)):
    item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: Item, db: SessionLocal = Depends(get_db)):
    db_item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: SessionLocal = Depends(get_db)):
    db_item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}
