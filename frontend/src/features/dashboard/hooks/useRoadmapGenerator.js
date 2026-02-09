import { useState, useCallback } from "react";

const API_1_URL = import.meta.env.VITE_ROADMAP_API_URL;
const API_2_URL = import.meta.env.VITE_VIDEO_API_URL;

export const useRoadmapGenerator = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [error, setError] = useState(null);
  const [videoResources, setVideoResources] = useState({});
  const [loadingVideos, setLoadingVideos] = useState({});

  const fetchVideoForTask = useCallback(async (taskTitle, goal, difficulty) => {
    setLoadingVideos((prev) => ({ ...prev, [taskTitle]: true }));
    try {
      const response = await fetch(API_2_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: taskTitle, goal, difficulty }),
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         console.error(`Failed to fetch video for ${taskTitle}:`, response.status, errorData);
         return; // Don't set video resources if failed
      }

      const data = await response.json();
      setVideoResources((prev) => ({ ...prev, [taskTitle]: data }));
    } catch (err) {
      console.error(`Failed to fetch video for ${taskTitle}`, err);
    } finally {
      setLoadingVideos((prev) => ({ ...prev, [taskTitle]: false }));
    }
  }, []);

  const generateRoadmap = async (topic, goal, difficulty) => {
    if (!topic.trim() || !goal.trim()) return;
    setLoadingRoadmap(true);
    setError(null);
    setRoadmap(null);
    setVideoResources({});
    setLoadingVideos({});

    const combinedGoal = `${topic}${goal ? ` - ${goal}` : ""}`;
    console.log("Generating roadmap with payload:", { goal: combinedGoal, level: difficulty });

    try {
      const response = await fetch(API_1_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Fixed: Use 'difficulty' instead of 'level' based on previous debugging
        body: JSON.stringify({ goal: combinedGoal, difficulty }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Roadmap generation failed:", response.status, errorData);
        throw new Error(`Failed to generate roadmap: ${response.status} ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log("Roadmap generation success:", data);
      
      const roadmapData = data.roadmap || data;
      setRoadmap(roadmapData);

      if (roadmapData?.modules) {
        const allTasks = roadmapData.modules.flatMap((m) => m.tasks || []);
        allTasks.forEach((task) => {
          fetchVideoForTask(task.title, combinedGoal, difficulty);
        });
      }
    } catch (err) {
      console.error("Error in generateRoadmap:", err);
      setError(err.message);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const resetRoadmap = () => {
    setRoadmap(null);
    setVideoResources({});
    setLoadingVideos({});
    setError(null);
    setLoadingRoadmap(false);
  };

  return {
    roadmap,
    loadingRoadmap,
    error,
    videoResources,
    loadingVideos,
    generateRoadmap,
    resetRoadmap,
  };
};
