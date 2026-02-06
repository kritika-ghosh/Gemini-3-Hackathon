import os
import json
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv, find_dotenv
from google import genai
from google.genai import types

# 1. Load Environment
load_dotenv(find_dotenv())

# 2. Schemas
class Task(BaseModel):
    title: str = Field(..., description="Action-oriented title (e.g., 'Setup Java Environment')")
    description: str = Field(..., description="A brief pedagogical explanation of what to do.")
    estimated_minutes: int = Field(..., description="Time-respectful estimate for this task.")

class Module(BaseModel):
    module_title: str = Field(..., description="The name of the learning module.")
    prerequisites: List[str] = Field(..., description="Concepts the user must know before starting.")
    tasks: List[Task]

class CurriculumSkeleton(BaseModel):
    goal: str
    difficulty_level: Literal["Beginner", "Intermediate", "Advanced"] = Field(
        ..., 
        description="The target difficulty. MUST match the user's requested level."
    )
    total_estimated_hours: float
    modules: List[Module]

# 3. Agents
class ArchitectAgent:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            print("Warning: GEMINI_API_KEY not set")
        
        self.client = genai.Client(api_key=self.api_key)
        # CHANGED to 1.5-flash for stability (avoid Quota errors)
        self.model_id = "gemini-3-flash-preview" 
        self.system_instruction = "You are the Architect Agent, an expert curriculum designer."

    def generate_skeleton(self, user_goal: str, difficulty: str):
        prompt = (
            f"Generate a {difficulty.upper()} level curriculum for {user_goal}. "
            f"Ensure the topics, complexity, and prerequisites are appropriate for "
            f"someone at the {difficulty} stage."
        )

        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=self.system_instruction,
                    temperature=0.1,
                    response_mime_type="application/json",
                    response_schema=CurriculumSkeleton
                )
            )
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API Error: {str(e)}")

# Placeholders
class LibrarianAgent:
    pass

class MultimodalSpecialist:
    pass

# 4. FastAPI Application Setup
app = FastAPI(
    title="The Learning Engine",
    description="Agentic Curriculum Orchestration powered by Gemini"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5. Initialize Agents
# We initialize inside the startup event or lazily to handle env vars safely
architect = ArchitectAgent()
librarian = LibrarianAgent()
multimodal = MultimodalSpecialist()

# 6. Request/Response Models
class GoalRequest(BaseModel):
    goal: str
    difficulty: str

# 7. API Endpoints
@app.get("/")
def home():
    return {"status": "Operational", "engine": "Gemini Architect Agent"}

@app.post("/orchestrate")
async def start_learning_journey(request: GoalRequest):
    """
    Step 1: The Architect reasons about the curriculum skeleton.
    """
    try:
        # Architect uses its internal reasoning loop
        skeleton_json = architect.generate_skeleton(request.goal, request.difficulty)
        return json.loads(skeleton_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Architect Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)