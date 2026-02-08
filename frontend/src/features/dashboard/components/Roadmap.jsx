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

const parseDuration = (durationStr) => {
  if (!durationStr) return 0;
  // Format MM:SS or HH:MM:SS
  const parts = durationStr.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] + parts[1] / 60;
  }
  if (parts.length === 3) {
    return parts[0] * 60 + parts[1] + parts[2] / 60;
  }
  return 0;
};

export const Roadmap = ({ roadmap, videoResources, loadingVideos }) => {
  // State to track expanded modules. Defaulting to the first module expanded.
  const [expandedModules, setExpandedModules] = useState([0]);

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
          totalMinutes += task.estimated_minutes || 0;
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
              Goal: <strong className="text-foreground">{roadmap.goal}</strong>
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
            className="shadow-md dark:shadow-lg dark:shadow-primary/5 overflow-hidden border-border group bg-card transition-all"
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
                  const isLoading = loadingVideos[task.title];
                  const displayTime = taskRes?.selected_video?.timestamp
                    ? `${taskRes.selected_video.timestamp}`
                    : `${task.estimated_minutes} min`;

                  return (
                    <div
                      key={tIndex}
                      className="p-4 md:p-6 hover:bg-muted/30 transition-colors md:ml-11 border-b md:border-b-0 md:border-l-2 border-border last:border-b-0"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="w-full">
                          {/* Header Stack: Title and Time */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground text-base md:text-lg flex items-center gap-2">
                              <span className="text-primary font-mono text-sm">
                                {mIndex + 1}.{tIndex + 1}
                              </span>
                              {task.title}
                            </h4>
                            <span className="w-fit text-[10px] font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full border border-border">
                              {displayTime}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground text-sm leading-relaxed md:ml-7 max-w-2xl">
                            {task.description}
                          </p>

                          {/* Loading State for specific task */}
                          {isLoading && (
                            <div className="mt-2 md:ml-7 flex items-center gap-2 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full animate-pulse w-fit">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Finding best video...
                            </div>
                          )}

                          {/* Expanded Resource Card with Inline Video */}
                          {taskRes && (
                            <div className="mt-4 md:ml-7 bg-muted/20 rounded-xl p-3 md:p-5 border border-border/50">
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <span className="w-fit text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded">
                                    Must Watch
                                  </span>
                                  <h5 className="font-medium text-foreground text-sm line-clamp-1">
                                    {taskRes.selected_video.title}
                                  </h5>
                                </div>

                                <div className="aspect-video w-full overflow-hidden rounded-lg">
                                  <VideoPlayer
                                    videoUrl={taskRes.selected_video.url}
                                    title={taskRes.selected_video.title}
                                  />
                                </div>

                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                  <img
                                    src={`https://www.google.com/s2/favicons?domain=youtube.com`}
                                    className="w-3 h-3 grayscale"
                                    alt="YouTube Favicon"
                                  />
                                  {taskRes.selected_video.channel}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
