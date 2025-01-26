from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.core.config import Settings
engine = create_engine(Settings().DATABASE_URL)
