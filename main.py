import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# 2. Local Imports (Imported after environment is ready)
from agents import ArchitectAgent, LibrarianAgent, MultimodalSpecialist
from schemas import CurriculumSkeleton

app = FastAPI(
    title="The Learning Engine",
    description="Agentic Curriculum Orchestration powered by Gemini 3"
)

# 3. Initialize Agent Modules
# Each agent is a discrete step in our orchestrated pipeline
architect = ArchitectAgent()
librarian = LibrarianAgent()
multimodal = MultimodalSpecialist()

# 4. Request/Response Models
class GoalRequest(BaseModel):
    goal: str
    difficulty: str = "Beginner"

# 5. API Endpoints
@app.get("/health")
def check_engine():
    return {"status": "Operational", "engine": "Gemini 3 Pro"}

@app.post("/orchestrate")
async def start_learning_journey(request: GoalRequest):
    """
    Step 1: The Architect reasons about the curriculum skeleton.
    """
    try:
        # Architect uses its internal reasoning loop to identify prerequisites
        skeleton_json = architect.generate_skeleton(request.goal)
        return json.loads(skeleton_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Architect Error: {str(e)}")

@app.post("/enrich-task")
async def enrich_task_with_grounding(task_title: str, video_url: str = None):
    """
    Step 2 & 3: Librarian finds resources and Multimodal specialist extracts moments.
    """
    # Librarian grounds the task in current 2026 web data
    resources = await librarian.find_resources(task_title, {"format": "all"})
    
    # If a video exists, extract surgical learning moments
    video_insights = None
    if video_url:
        video_insights = multimodal.extract_learning_moments(video_url, task_title)
        
    return {
        "task": task_title,
        "grounded_resources": resources,
        "video_nav_points": video_insights
    }

@app.post("/recalibrate")
async def handle_feedback(module_id: str, feedback: str):
    """
    Triggers the Adaptive Learning Loop when a module is 'Too Hard'.
    """
    # Logic to regenerate only the specific module without breaking progress
    return {"status": "Recalibrating...", "module": module_id}

# Run with: uvicorn main:app --reload