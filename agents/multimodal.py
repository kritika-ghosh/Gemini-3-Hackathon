import os
from google import genai
from google.genai import types

class MultimodalSpecialist:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-3-pro"
        # System instruction focuses on surgical timestamp extraction
        self.system_instruction = (
            "You are the Multimodal Specialist for The Learning Engine. "
            "Your task is to analyze educational videos and extract precise "
            "timestamps (mm:ss) that align with specific learning tasks. "
            "Do not summarize the entire video; only provide the relevant moments."
        )

    def extract_learning_moments(self, video_url: str, task_description: str):
        """
        Uses Gemini 3's temporal understanding to find specific task coverage.
        """
        prompt = (
            f"Watch this video and find the exact timestamps where the following "
            f"task is covered: '{task_description}'. "
            "Return the start and end times in mm:ss format with a brief "
            "explanation of what is covered in that segment."
        )

        response = self.client.models.generate_content(
            model=self.model_id,
            contents=[
                # Gemini 3 Pro natively supports YouTube URLs for analysis
                types.Part.from_uri(file_uri=video_url, mime_type="video/mp4"),
                prompt
            ],
            config=types.GenerateContentConfig(
                system_instruction=self.system_instruction,
                # Enforce structured output for the Video Dashboard
                response_mime_type="application/json",
                # Use high thinking for precise temporal alignment
                thinking_config=types.ThinkingConfig(thinking_level="high")
            )
        )
        return response.text