from sqlalchemy import Column, Integer, String

from .database import Base

class PLAYER(Base):
    __tablename__ = 'players'
    username = Column(String, primary_key=True)
    total_score = Column(Integer, default=0)