import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Loader2,
  PlayCircle,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./VideoPlayer";
import { RoadmapTaskItem } from "./RoadmapTaskItem";
import { useEffect } from "react";

const parseDuration = (durationStr) => {
  if (!durationStr) return 0;
  // Format MM:SS or HH:MM:SS
  const parts = durationStr.toString().split(":").map(Number);

  if (parts.some(isNaN)) return 0;

  if (parts.length === 2) {
    return parts[0] + parts[1] / 60;
  }
  if (parts.length === 3) {
    return parts[0] * 60 + parts[1] + parts[2] / 60;
  }
  return 0;
};

export const Roadmap = ({
  roadmap,
  videoResources,
  loadingVideos,
  onStartLearning,
  roadmapId,
}) => {
  const { isLoaded } = useMemo(() => ({ isLoaded: !!roadmap }), [roadmap]);

  // Handle hash scrolling
  useEffect(() => {
    if (isLoaded && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Optional: Add highlight effect
          element.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(
            () =>
              element.classList.remove(
                "ring-2",
                "ring-primary",
                "ring-offset-2",
              ),
            2000,
          );
        }, 500);
      }
    }
  }, [isLoaded, window.location.hash]);
  // ... existing code ...

  // ... (inside return)

  // State to track expanded modules. Defaulting to ALL modules expanded.
  const [expandedModules, setExpandedModules] = useState([]);

  // Initialize expanded modules when roadmap loads
  useEffect(() => {
    if (roadmap?.modules) {
      setExpandedModules(roadmap.modules.map((_, i) => i));
    }
  }, [roadmap]);

  const toggleModule = (index) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const calculatedTotalHours = useMemo(() => {
    if (!roadmap) return 0;

    let totalMinutes = 0;
    roadmap.modules.forEach((module) => {
      module.tasks.forEach((task) => {
        const videoData = videoResources[task.title];
        if (videoData?.selected_video?.timestamp) {
          totalMinutes += parseDuration(videoData.selected_video.timestamp);
        } else {
          const est = parseInt(task.estimated_minutes || 0, 10);
          totalMinutes += isNaN(est) ? 0 : est;
        }
      });
    });

    return (totalMinutes / 60).toFixed(1);
  }, [roadmap, videoResources]);

  if (!roadmap) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Meta Info */}
      <Card className="border-border shadow-sm bg-card">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-primary mt-0.5 sm:mt-0" />
            <span className="leading-tight">
              Goal:{" "}
              <strong className="text-foreground">
                {roadmap.goal || roadmap.topic}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>
              Est. Time:{" "}
              <strong className="text-foreground">
                {calculatedTotalHours} Hours
              </strong>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <div className="space-y-6">
        {roadmap.modules.map((module, mIndex) => (
          <Card
            key={mIndex}
            id={`module-${mIndex}`}
            className="shadow-md dark:shadow-lg dark:shadow-primary/5 overflow-hidden border-border group bg-card transition-all scroll-mt-20"
          >
            <CardHeader
              className="bg-muted/50 border-b border-border p-5 cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={() => toggleModule(mIndex)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {mIndex + 1}
                    </span>
                    {module.module_title}
                  </CardTitle>
                  <CardDescription className="ml-11 text-muted-foreground">
                    Prereqs: {module.prerequisites.join(", ")}
                  </CardDescription>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                    expandedModules.includes(mIndex) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CardHeader>

            {expandedModules.includes(mIndex) && (
              <CardContent className="p-0 divide-y divide-border animate-accordion-down">
                {module.tasks.map((task, tIndex) => {
                  const taskRes = videoResources[task.title];
                  // const isLoading = loadingVideos[task.title]; // Unused variable warning if removed, checking usage below.
                  // Wait, `isLoading` is used in `RoadmapTaskItem`.
                  // Keeping `isLoading` calculation but removing the commented out hook block.

                  const isLoading = loadingVideos[task.title];
                  const displayTime = taskRes?.selected_video?.timestamp
                    ? `${taskRes.selected_video.timestamp}`
                    : `${task.estimated_minutes} min`;

                  return (
                    <RoadmapTaskItem
                      key={tIndex}
                      task={task}
                      mIndex={mIndex}
                      tIndex={tIndex}
                      videoResources={videoResources}
                      loadingVideos={loadingVideos}
                      roadmapId={roadmapId}
                    />
                  );
                })}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {onStartLearning && (
        <div className="flex justify-center pt-8 pb-8">
          <Button
            size="lg"
            onClick={onStartLearning}
            className="w-full md:w-auto px-12 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
          >
            Start Learning
            <PlayCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
