from fastapi import FastAPI
from app.models import Issue


app = FastAPI(
    title="CampusPulse",
    description="A simple campus issue reporting system",
)


# Temporary in-memory database
issues = []


@app.get("/")
def home():
    return {
        "message": "Welcome to CampusPulse!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "running"
    }


@app.post("/issues")
def create_issue(issue: Issue):

    issues.append(issue)

    return {
        "message": "Issue reported successfully",
        "issue": issue
    }


@app.get("/issues")
def get_issues():

    return {
        "total_issues": len(issues),
        "issues": issues
    }