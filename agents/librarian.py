import httpx
import os
from google import genai
from google.genai import types

class LibrarianAgent:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-3-pro"
        # System instruction enforces 'Grounded' philosophy [cite: 9]
        self.system_instruction = (
            "You are the Librarian Agent. Your job is to find high-quality, "
            "current (2026) learning resources for specific tasks. "
            "You MUST use the Google Search tool to verify information."
        )

    async def find_resources(self, task_title: str, preferences: dict):
        """
        Performs live search grounding based on task and user constraints[cite: 20, 21].
        """
        # Dynamic query constrained by user preferences (cost, duration) [cite: 21]
        search_query = f"Best learning resources for {task_title}. Format: {preferences.get('format', 'any')}."
        
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=search_query,
            config=types.GenerateContentConfig(
                system_instruction=self.system_instruction,
                # Enable Google Search Grounding 
                tools=[types.Tool(google_search=types.GoogleSearchRetrieval())],
                response_mime_type="application/json"
            )
        )
        
        # Extract URLs and validate them before returning 
        raw_resources = response.parsed # Assuming Gemini returns a list of links
        validated_resources = await self.validate_links(raw_resources)
        return validated_resources

    async def validate_links(self, resources: list):
        """
        Performs HTTP HEAD requests to eliminate dead resources.
        """
        valid_list = []
        async with httpx.AsyncClient() as client:
            for res in resources:
                try:
                    # HEAD request is faster than GET as it doesn't download the body 
                    resp = await client.head(res['url'], timeout=5.0)
                    if resp.status_code == 200:
                        valid_list.append(res)
                except Exception:
                    continue # Skip dead or timed-out links
        return valid_list