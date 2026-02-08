import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const RoadmapDetailView = ({ roadmap }) => {

  if (!roadmap) {
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        Select a roadmap to view details
      </div>
    );
  }

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // src/features/dashboard/components/RoadmapDetailView.jsx
    return (
      <div className="flex flex-col h-full w-full overflow-hidden min-w-0">
        <div className="px-4 py-2 border-b border-sidebar-border shrink-0 min-w-0">
          <h3 className="font-semibold truncate text-sm">
            {roadmap.topic}
          </h3>
        </div>

        <ScrollArea className="flex-1 w-full overflow-x-hidden">
          <div className="p-2 space-y-4 w-full min-w-0">
            {roadmap.content.modules.map((module, mIndex) => (
              <div key={mIndex} className="space-y-1 w-full min-w-0">
                <button
                  onClick={() => scrollToId(`module-${mIndex}`)}
                  className="w-full text-left px-2 py-1.5 rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors overflow-hidden min-w-0"
                >
                  <div className="text-xs font-semibold text-sidebar-foreground truncate">
                    Module {mIndex + 1}: {module.module_title}
                  </div>
                </button>

                <div className="pl-2 space-y-0.5 border-l border-sidebar-border/50 ml-2 min-w-0">
                  {module.tasks.map((task, tIndex) => (
                    <button
                      key={tIndex}
                      onClick={() => scrollToId(`task-${mIndex}-${tIndex}`)}
                      className="flex w-full items-center gap-2 px-2 py-1 text-left transition-colors rounded-md hover:bg-sidebar-accent/30 group min-w-0"
                    >
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0 min-w-[24px]">
                        {mIndex + 1}.{tIndex + 1}
                      </span>
                      <span className="text-xs leading-normal truncate text-muted-foreground flex-1 min-w-0 group-hover:text-primary transition-colors">
                        {task.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };
