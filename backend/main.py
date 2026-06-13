from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from task_routes import router
from project_routes import router as project_router
from gemini_service import generate_description

app = FastAPI(title="TaskFlow AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://taskflow-ai-eight-chi.vercel.app",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
app.include_router(project_router)

@app.get("/")
def home():
    return {
        "message": "TaskFlow AI Backend Running"
    }