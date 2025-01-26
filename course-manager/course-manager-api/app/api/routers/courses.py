from fastapi import APIRouter

router = APIRouter(prefix="/cursos", tags=["cursos"])

@router.get("/")
async def get_courses():
    return [{"title": "Engenharia de Software"}]