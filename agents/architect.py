import os
from google import genai
from google.genai import types
from schemas.curriculum import CurriculumSkeleton

class ArchitectAgent:
    def __init__(self):
        # MOVE CLIENT HERE: It now waits until main.py has loaded the .env
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-3-flash-preview"
        self.system_instruction = "You are the Architect Agent..."

    def generate_skeleton(self, user_goal: str):
        # Use self.client instead of a global client
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=user_goal,
            config=types.GenerateContentConfig(
                system_instruction=self.system_instruction,
                response_mime_type="application/json",
                response_schema=CurriculumSkeleton
            )
        )
        return response.text