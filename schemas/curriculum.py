from pydantic import BaseModel, Field
from typing import List

class Task(BaseModel):
    """The smallest unit of learning, mapping to a specific actionable step."""
    title: str = Field(..., description="Action-oriented title (e.g., 'Setup Java Environment')")
    description: str = Field(..., description="A brief pedagogical explanation of what to do.")
    estimated_minutes: int = Field(..., description="Time-respectful estimate for this task.")

class Module(BaseModel):
    """A collection of tasks centered around a specific sub-topic."""
    module_title: str = Field(..., description="The name of the learning module.")
    prerequisites: List[str] = Field(
        ..., 
        description="Concepts the user must know before starting this specific module."
    )
    tasks: List[Task] = Field(..., description="The sequence of tasks within this module.")

class CurriculumSkeleton(BaseModel):
    """The full orchestrated roadmap produced by the Architect Agent."""
    goal: str = Field(..., description="The original user learning goal.")
    difficulty_level: str = Field(..., description="Calculated difficulty (Beginner, Intermediate, Advanced).")
    total_estimated_hours: float
    modules: List[Module] = Field(..., description="The structured list of learning modules.")