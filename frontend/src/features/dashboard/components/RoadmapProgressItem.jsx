import React, { useMemo } from "react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight, CheckCircle2, Circle, Trophy } from "lucide-react";
import { useProgress } from "@/features/dashboard/hooks/useProgress";
import { Progress } from "@/components/ui/progress";

export const RoadmapProgressItem = ({ roadmap }) => {
  const { completedTasks, toggleTask, loading } = useProgress(roadmap.id);

  // Flatten tasks to count total
  const allTasks = useMemo(() => {
    return roadmap.content.modules.flatMap((m) =>
      m.tasks.map((t) => ({ ...t, moduleId: m.id })),
    );
  }, [roadmap]);

  const totalTasks = allTasks.length;
  const completedCount = completedTasks.length;
  const progressPercent =
    totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <Collapsible asChild className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={roadmap.topic}>
            {progressPercent === 100 ? (
              <Trophy className="text-yellow-500" />
            ) : (
              <div className="relative flex items-center justify-center w-4 h-4">
                <span className="absolute text-[8px] font-bold">
                  {Math.round(progressPercent)}%
                </span>
              </div>
            )}
            <span className="font-medium truncate">{roadmap.topic}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            <Progress
              value={progressPercent}
              className="h-1.5 bg-sidebar-border"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>
                {completedCount} / {totalTasks} tasks
              </span>
            </div>
          </div>
          <SidebarMenuSub>
            {roadmap.content.modules.map((module) => (
              <div key={module.module_title} className="mb-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-1 block">
                  {module.module_title}
                </span>
                {module.tasks.map((task) => {
                  const isCompleted = completedTasks.includes(task.title); 

                  return (
                    <SidebarMenuSubItem key={task.title}>
                      <SidebarMenuSubButton
                        onClick={() => toggleTask(task.title)}
                        className="cursor-pointer group/task"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 transition-all" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground shrink-0 group-hover/task:text-primary transition-all" />
                        )}
                        <span
                          className={`truncate ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                        >
                          {task.title}
                        </span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </div>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
