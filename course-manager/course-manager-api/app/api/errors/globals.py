from http import HTTPStatus
from fastapi import HTTPException

class SomethingWrongError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
        detail="Aconteceu um erro por aqui. Já estamos trabalhando nisso. Tente novamente em breve.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)