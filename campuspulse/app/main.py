from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import Issue

app = FastAPI(title="CampusPulse API")


# Allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Temporary storage
issues = []


@app.get("/")
def home():
    return {
        "message": "Welcome to CampusPulse API"
    }


@app.get("/issues")
def get_issues():
    return {
        "issues": issues
    }


@app.post("/issues")
def create_issue(issue: Issue):

    new_issue = issue.model_dump()

    issues.append(new_issue)

    return {
        "message": "Issue created successfully",
        "issue": new_issue
    }