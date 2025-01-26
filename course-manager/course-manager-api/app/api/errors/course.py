from fastapi import HTTPException
from http import HTTPStatus

class CourseTitleConflictError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.CONFLICT,
        detail="O titulo informado já está sendo em outro curso.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class CourseNotFoundError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.NOT_FOUND,
        detail="O curso informado não foi encontrado em nossos registros.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)