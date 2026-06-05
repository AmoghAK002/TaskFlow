from fastapi import APIRouter
from firebase_config import db
from gemini_service import (
    generate_description
)
from datetime import datetime
from google.cloud.firestore import Query

router = APIRouter()

def add_activity(action, item):

    db.collection("activity_logs").add({
        "action": action,
        "item": item,
        "timestamp": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    })

@router.get("/tasks")
def get_tasks():

    docs = db.collection("tasks").stream()

    tasks = []

    for doc in docs:

        task = doc.to_dict()

        tasks.append(task)

    return tasks


@router.post("/tasks")
def create_task(task: dict):

    db.collection("tasks").document(
        str(task["id"])
    ).set(task)

    add_activity(
        "Created Task",
        task["title"]
    )

    return {
        "message": "Task Added"
    }


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    doc_ref = db.collection(
        "tasks"
    ).document(str(task_id))

    doc = doc_ref.get()

    if doc.exists:

        task = doc.to_dict()

        add_activity(
            "Deleted Task",
            task["title"]
        )

    doc_ref.delete()

    return {
        "message": "Task Deleted"
    }


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    updated_task: dict
):

    db.collection("tasks").document(
        str(task_id)
    ).set(updated_task)

    add_activity(
        "Updated Task",
        updated_task["title"]
    )

    return {
        "message": "Task Updated"
    }

@router.post(
    "/generate-task"
)
def generate_task(
    data: dict
):

    title = data["title"]

    description = (
        generate_description(
            title
        )
    )

    return {
        "description":
        description
    }

@router.get("/activity-logs")
def get_activity_logs():

    docs = (
        db.collection("activity_logs")
        .order_by(
            "timestamp",
            direction=Query.DESCENDING
        )
        .stream()
    )

    logs = []

    for doc in docs:

        log = doc.to_dict()

        logs.append(log)

    return logs