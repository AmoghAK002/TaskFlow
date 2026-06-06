from fastapi import APIRouter
from firebase_config import db
from datetime import datetime

router = APIRouter()

def add_activity(action, item):

    db.collection("activity_logs").add({
        "action": action,
        "item": item,
        "timestamp": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    })

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
def create_project(project: dict):

    db.collection(
        "projects"
    ).document(
        str(project["id"])
    ).set(project)

    add_activity(
        "Created Project",
        project["name"]
    )

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

    doc_ref = db.collection(
        "projects"
    ).document(
        str(project_id)
    )

    doc = doc_ref.get()

    if doc.exists:

        project = doc.to_dict()

        add_activity(
            "Deleted Project",
            project["name"]
        )

    doc_ref.delete()

    return {
        "message":
        "Project Deleted"
    }