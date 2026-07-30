from pydantic import BaseModel


class Issue(BaseModel):
    title: str
    description: str
    category: str
    priority: str
    location: str