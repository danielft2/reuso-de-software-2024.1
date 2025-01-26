from fastapi import APIRouter
from app.api.deps import SessionDep
from app.models_db import Course as Course_db
from app.api.models.course import Course
from sqlalchemy import select
from app.api.response import Response
from app.api.errors.globals import SomethingWrongError
from app.api.errors.course import CourseTitleConflictError, CourseNotFoundError
from uuid import UUID

router = APIRouter(prefix="/cursos", tags=["cursos"])


@router.get("/", response_model=Response[list[Course_db]])
async def get_courses(session: SessionDep):
    try:
        courses = session.scalars(select(Course_db)).all()
        return Response(data=courses)
    except:
        raise SomethingWrongError()


@router.get("/{course_id}", response_model=Response[Course_db])
async def get_course(course_id: UUID, session: SessionDep):

    try:
        course_db = get_course_by_id(course_id, session)
        return Response(data=course_db)
    except CourseNotFoundError:
        raise
    except:
        session.rollback()
        raise SomethingWrongError()


@router.post("/", response_model=Response[Course_db])
async def create_course(course: Course, session: SessionDep):
    verify_title_course_alredy_exists(course.title, session)

    try:
        new_course = Course_db(**course.model_dump())
        session.add(new_course)
        session.commit()
        session.refresh(new_course)

        return Response(data=new_course)
    except:
        session.rollback()
        raise SomethingWrongError()


@router.put("/{course_id}", response_model=Response[Course_db])
async def update_course(course_id: UUID, course: Course, session: SessionDep):
    course_db = get_course_by_id(course_id, session)

    if (course_db.title != course.title):
        verify_title_course_alredy_exists(course.title, session)

    try:
        course_db.title = course.title
        course_db.description = course.description
        course_db.workload = course.workload

        session.commit()
        return Response(data=course_db)
    except:
        session.rollback()
        raise SomethingWrongError()


@router.delete("/{course_id}", response_model=Response)
async def delete_course(course_id: UUID, session: SessionDep):
    course_db = get_course_by_id(course_id, session)

    try:
        session.delete(course_db)
        session.commit()
        return Response(message="Curso deletado com sucesso!")
    except:
        session.rollback()
        raise SomethingWrongError()


def verify_title_course_alredy_exists(title: str, session: SessionDep):
    try:
        course = session.scalar(
            select(Course_db).where(Course_db.title == title))
        if course:
            raise CourseTitleConflictError()
    except CourseTitleConflictError:
        raise
    except:
        raise SomethingWrongError()


def get_course_by_id(course_id: UUID, session: SessionDep):
    course = session.scalar(select(Course_db).where(Course_db.id == course_id))
    if not course:
        raise CourseNotFoundError()
    return course
