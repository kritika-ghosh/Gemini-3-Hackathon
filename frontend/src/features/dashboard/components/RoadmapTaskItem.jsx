import React from "react";
import { Loader2, CheckCircle2, Circle } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";
import { useProgress } from "@/features/dashboard/hooks/useProgress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const RoadmapTaskItem = ({
  task,
  mIndex,
  tIndex,
  videoResources,
  loadingVideos,
  roadmapId,
}) => {
  // Only use progress hook if we have a valid roadmapId
  const { completedTasks, toggleTask } = roadmapId
    ? useProgress(roadmapId)
    : { completedTasks: [], toggleTask: () => {} };

  const isCompleted = completedTasks.includes(task.title);

  const taskRes = videoResources[task.title];
  const isLoading = loadingVideos[task.title];
  const displayTime = taskRes?.selected_video?.timestamp
    ? `${taskRes.selected_video.timestamp}`
    : `${task.estimated_minutes} min`;

  const handleToggle = () => {
    if (roadmapId) {
      toggleTask(task.title);
    }
  };

  return (
    <div
      id={`task-${mIndex}-${tIndex}`}
      className={cn(
        "p-4 md:p-6 hover:bg-muted/30 transition-colors md:ml-11 border-b md:border-b-0 md:border-l-2 border-border last:border-b-0 scroll-mt-24 group/task",
        isCompleted && "bg-muted/10",
      )}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="w-full">
          {/* Header Stack: Title and Time */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-between">
            <div className="flex items-center gap-2">
              <h4
                className={cn(
                  "font-semibold text-foreground text-base md:text-lg flex items-center gap-2",
                  isCompleted && "text-muted-foreground line-through",
                )}
              >
                <span className="text-primary font-mono text-sm">
                  {mIndex + 1}.{tIndex + 1}
                </span>
                {task.title}
              </h4>
              <span className="w-fit text-[10px] font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full border border-border">
                {displayTime}
              </span>
            </div>

            {/* Mark as Done Button */}
            {roadmapId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className={cn(
                  "h-7 gap-1.5 text-xs text-muted-foreground hover:text-primary",
                  isCompleted && "text-primary hover:text-primary/80",
                )}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" />
                    Mark as Done
                  </>
                )}
              </Button>
            )}
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

                <VideoPlayer
                  videoUrl={taskRes.selected_video.url}
                  title={taskRes.selected_video.title}
                />

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
};
