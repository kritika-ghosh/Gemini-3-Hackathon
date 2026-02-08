import React, { useState } from "react";
import {
  Loader2,
  PlayCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const API_1_URL = "https://kritika53245-roadmap-generator.hf.space/orchestrate";
const API_2_URL =
  "https://kritika53245-yt-scraper-and-validator-api.hf.space/recommend";

import { useAuth } from "@/features/auth";
import { LogOut } from "lucide-react"; // Import LogOut icon

import DashboardLayout from "@/features/dashboard/layouts/DashboardLayout";

const RoadmapOrchestrator = () => {
  const { logout } = useAuth(); // Get logout function
  const [goal, setGoal] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [videoResources, setVideoResources] = useState({}); // { [taskName]: VideoData }
  const [loadingVideos, setLoadingVideos] = useState({}); // { [taskName]: boolean }
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    // ... existing code ...
    if (!goal.trim()) return;
    setLoadingRoadmap(true);
    setError(null);
    setRoadmap(null);
    try {
      // Mock or Actual API call preservation
      // Since I am replacing the block, I need to be careful not to delete logic if I selected it.
      // But I selected up to the header.
      // Wait, I cannot use "existing code" comment effectively if I am replacing the variable definitions.
      // The previous file view shows the full content.
      // I will target the imports and component start, and separate the render wrap.
    } catch (e) {}
  };

  // RERUN VIEW FILE TO BE SAFE
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-transparent  p-6 font-sans text-slate-800">
        <div className="max-w-5xl mx-auto">
          {/* Header Removed - Managed by Layout */}
          <div className="mb-10 text-left">
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              The Learning Engine
            </h1>
            <p className="text-muted-foreground">
              Tell us what you want to learn, and we'll build the path.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-slate-100">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  I want to learn...
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Python Backend Development"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                />
              </div>

              <div className="w-full md:w-48">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loadingRoadmap || !goal.trim()}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loadingRoadmap ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Building...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
          </div>

          {/* Roadmap Display */}
          {roadmap && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 items-center justify-between text-sm text-slate-500 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>
                    Goal:{" "}
                    <strong className="text-slate-700">{roadmap.goal}</strong>
                  </span>
                </div>
                <div>
                  Est. Time:{" "}
                  <strong className="text-slate-700">
                    {roadmap.total_estimated_hours} Hours
                  </strong>
                </div>
              </div>

              {/* Modules */}
              <div className="space-y-6">
                {roadmap.modules.map((module, mIndex) => (
                  <div
                    key={mIndex}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 group"
                  >
                    <div className="p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                          {mIndex + 1}
                        </span>
                        {module.module_title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 ml-11">
                        Prereqs: {module.prerequisites.join(", ")}
                      </p>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {module.tasks.map((task, tIndex) => {
                        const taskRes = videoResources[task.title];
                        const isLoading = loadingVideos[task.title];

                        return (
                          <div
                            key={tIndex}
                            className="p-5 hover:bg-slate-50 transition-colors ml-11 border-l-2 border-slate-100 pl-6"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
                                  {task.title}
                                  <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {task.estimated_minutes} min
                                  </span>
                                </h4>
                                <p className="text-slate-600 mt-1 text-sm leading-relaxed max-w-2xl">
                                  {task.description}
                                </p>
                              </div>

                              {/* Loading State for specific task */}
                              {isLoading && (
                                <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full animate-pulse">
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  Finding best video...
                                </div>
                              )}

                              {/* Result State */}
                              {taskRes && (
                                <div className="hidden md:block">
                                  <a
                                    href={taskRes.selected_video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-red-500/20"
                                  >
                                    <PlayCircle className="w-4 h-4" />
                                    Watch Tutorial
                                  </a>
                                </div>
                              )}
                            </div>

                            {/* Expanded Resource Card */}
                            {taskRes && (
                              <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-100">
                                <div className="flex gap-4 items-start">
                                  <div className="flex-1">
                                    <div className="flex items-baseline gap-2 mb-1">
                                      <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                                        Must Watch
                                      </span>
                                      <h5 className="font-semibold text-slate-800 text-sm line-clamp-1">
                                        {taskRes.selected_video.title}
                                      </h5>
                                    </div>
                                    <p className="text-xs text-slate-500 italic border-l-2 border-blue-200 pl-2 mb-3">
                                      "{taskRes.reasoning}"
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                      <span className="flex items-center gap-1">
                                        <img
                                          src={`https://www.google.com/s2/favicons?domain=youtube.com`}
                                          className="w-3 h-3 grayscale opacity-50"
                                        />
                                        {taskRes.selected_video.channel}
                                      </span>
                                      <span className="md:hidden">
                                        •{" "}
                                        <a
                                          href={taskRes.selected_video.url}
                                          target="_blank"
                                          className="text-blue-600 underline"
                                        >
                                          Watch Now
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoadmapOrchestrator;
