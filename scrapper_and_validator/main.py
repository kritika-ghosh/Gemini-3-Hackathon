import os
import json
import requests
from datetime import datetime
from typing import List

from dotenv import load_dotenv, find_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# 1. Load Environment
load_dotenv(find_dotenv())

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---

class SearchRequest(BaseModel):
    topic: str = Field(..., description="The specific concept, e.g., 'Variables'")
    goal: str = Field(..., description="The broader context/language, e.g., 'Python'")
    difficulty: str = Field(..., description="Target audience, e.g., 'Beginner'")

class VideoMetadata(BaseModel):
    video_id: str
    title: str
    channel: str
    url: str
    is_educational: bool
    timestamp: str

class BestVideoResponse(BaseModel):
    selected_video: VideoMetadata
    reasoning: str
    all_resources: List[VideoMetadata]

class AISelection(BaseModel):
    selected_video_id: str = Field(..., description="The ID of the single best video from the provided list.")
    reasoning: str = Field(..., description="A short explanation of why this video fits the goal and difficulty.")

# --- OFFICIAL YOUTUBE API SCRAPER ---

class YouTubeScraper:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY") 
        self.api_url = "https://www.googleapis.com/youtube/v3/search"

    def search_youtube(self, topic: str, goal: str, difficulty: str) -> List[dict]:
        if not self.api_key:
            raise Exception("API Key missing. Cannot contact YouTube.")

        query = f"{goal} {topic} {difficulty} tutorial"
        
        params = {
            'part': 'snippet',
            'q': query,
            'type': 'video',
            'maxResults': 10,
            'key': self.api_key,
            'relevanceLanguage': 'en'
        }

        # No try/except here effectively - let the error bubble up if API fails
        print(f"Calling YouTube API for: {query}")
        response = requests.get(self.api_url, params=params)
        response.raise_for_status() # This will raise an error if 403/404/500
        
        data = response.json()
        
        videos = []
        for item in data.get("items", []):
            video_id = item["id"]["videoId"]
            title = item["snippet"]["title"]
            channel = item["snippet"]["channelTitle"]
            
            videos.append({
                'video_id': video_id,
                'title': title,
                'channel': channel,
                'url': f'https://www.youtube.com/watch?v={video_id}',
                'is_educational': True,
                'timestamp': datetime.now().isoformat()
            })
            
        return videos

# --- AI LOGIC ---

def get_gemini_recommendation(videos: List[dict], topic: str, goal: str, difficulty: str):
    api_key = os.getenv("GEMINI_API_KEY")
    
    # Safety Check: If no API key, just return the first video
    if not api_key:
        return videos[0], "API Key missing. Returning top search result."

    client = genai.Client(api_key=api_key)

    prompt = f"""
    Context: The user wants to learn about "{topic}" in the context of "{goal}".
    Target Audience: {difficulty} level.
    
    Here is a list of videos:
    {json.dumps(videos, indent=2)}
    
    Task:
    1. Select the BEST video for this specific goal.
    2. Explain why.
    """

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.1,
                response_mime_type="application/json",
                response_schema=AISelection
            )
        )
        
        selection_data = json.loads(response.text)
        selected_id = selection_data.get("selected_video_id")
        reasoning = selection_data.get("reasoning")

        selected_video = next((v for v in videos if v['video_id'] == selected_id), videos[0])
        return selected_video, reasoning

    except Exception as e:
        print(f"Gemini Error: {e}")
        # FAIL-SAFE: If Gemini crashes, return the first video found
        return videos[0], "AI analysis unavailable. Displaying the top search result."

# --- ENDPOINTS ---

scraper = YouTubeScraper()

@app.post("/recommend", response_model=BestVideoResponse)
async def recommend_video(request: SearchRequest):
    try:
        # 1. Get Real Videos (or crash if API fails)
        videos = scraper.search_youtube(request.topic, request.goal, request.difficulty)
        
        if not videos:
             raise HTTPException(status_code=404, detail="YouTube API returned 0 results.")

        # 2. Analyze (safe against crashes)
        best_video, reasoning = get_gemini_recommendation(
            videos, request.topic, request.goal, request.difficulty
        )
        
        return {
            "selected_video": best_video,
            "reasoning": reasoning,
            "all_resources": videos
        }
        
    except Exception as e:
        # Pass the actual error message to the frontend
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)