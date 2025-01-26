from pydantic import BaseModel

class Course(BaseModel):
    title: str
    description: str
    workload: int