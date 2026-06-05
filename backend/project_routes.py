from fastapi import APIRouter
from firebase_config import db

router = APIRouter()

@router.get("/projects")
def get_projects():

    docs = db.collection(
        "projects"
    ).stream()

    projects = []

    for doc in docs:

        project = doc.to_dict()

        projects.append(project)

    return projects


@router.post("/projects")
def create_project(
    project: dict
):

    db.collection(
        "projects"
    ).document(
        str(project["id"])
    ).set(project)

    return {
        "message":
        "Project Added"
    }


@router.delete(
    "/projects/{project_id}"
)
def delete_project(
    project_id: int
):

    db.collection(
        "projects"
    ).document(
        str(project_id)
    ).delete()

    return {
        "message":
        "Project Deleted"
    }