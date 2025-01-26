from typing import Annotated, Any, Generator
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.db import engine


def get_session() -> Generator[Session, Any, None]:
    with Session(engine) as session:
        yield session


settings = Settings()
SessionDep = Annotated[Session, Depends(get_session)]