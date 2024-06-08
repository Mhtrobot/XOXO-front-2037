from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, ClassVar, List
from fastapi.middleware.cors import CORSMiddleware
from sql.database import SessionLocal, engine
from sqlalchemy.orm import Session
from pydantic import BaseModel
from sql import models

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[SessionLocal, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

class LoginData(BaseModel):
    user1: str
    user2: str
class PlayerBase(BaseModel):
    username: str
    total_score: int

class PlayerModel(PlayerBase):
    pass
    class Config:
        orm_mode = True

class gameResult(BaseModel):
    username: str
    status: str

@app.get("/")
async def root():
    return {"message": "running"}

@app.post("/login", response_model=bool)
async def login(data: LoginData, db: Session = Depends(get_db)):
    isLogged_1 = db.query(models.PLAYER).filter(models.PLAYER.username == data.user1).first()
    isLogged_2 = db.query(models.PLAYER).filter(models.PLAYER.username == data.user2).first()

    if isLogged_1 and isLogged_2:
        return True
    if not isLogged_1:
        raise HTTPException(status_code=404, detail=f"Username {data.user1} not found")
    if not isLogged_2:
        raise HTTPException(status_code=404, detail=f"Username {data.user2} not found")
    return False


@app.post("/register", response_model=bool)
async def register(player: PlayerBase, db: Session = Depends(get_db)):
    isTaken = db.query(models.PLAYER).filter(models.PLAYER.username == player.username).first()
    if isTaken:
        raise HTTPException(status_code=404, detail=f"Username {player.username} already exists")
        return False

    db_player = models.PLAYER(**player.dict())
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return True

@app.put("/update_score", response_model=PlayerBase)
async def result(player: gameResult, db: Session = Depends(get_db)):
    player_target = db.query(models.PLAYER).filter(models.PLAYER.username == player.username).first()
    if not player_target:
        raise HTTPException(status_code=404, detail="Player not found")
    player_target.username = player.username
    if player.status == "WIN":
        player_target.total_score +=1
    elif player.status == "LOSE":
        player_target.total_score -=1

    db.commit()
    db.refresh(player_target)
    return player_target




@app.delete("/delete_user/{username}", response_model=bool)
async def delete_user(user: str, db: Session = Depends(get_db)):
    user_target = db.query(models.PLAYER).filter(models.PLAYER.username == user).first()
    if not user_target:
        raise HTTPException(status_code=404, detail="such person does not exists!!")
        return False
    db.delete(user_target)
    db.commit()
    raise HTTPException(status_code=200, detail=f"deleted user {user}")
    return True