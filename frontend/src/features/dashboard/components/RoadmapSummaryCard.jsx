import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/features/dashboard/hooks/useProgress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export const RoadmapSummaryCard = ({
  roadmap,
  isSelected,
  onClick,
  onRename,
  onDelete,
}) => {
  const { completedTasks } = useProgress(roadmap.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(roadmap.topic);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const progressPercent = useMemo(() => {
    if (!roadmap?.content?.modules) return 0;
    const allTasks = roadmap.content.modules.flatMap((m) => m.tasks);
    const totalTasks = allTasks.length;
    return totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
  }, [roadmap, completedTasks]);

  const handleRenameSubmit = (e) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRename(roadmap.id, editTitle);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditTitle(roadmap.topic);
  };

  if (isEditing) {
    return (
      <SidebarMenuItem>
        <div className="flex items-center gap-1 p-2 w-full">
          <Input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="h-7 text-xs px-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRenameSubmit(e);
              if (e.key === "Escape") handleCancelEdit(e);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={handleRenameSubmit}
            className="text-green-500 hover:bg-green-100 p-1 rounded"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancelEdit}
            className="text-red-500 hover:bg-red-100 p-1 rounded"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        onClick={onClick}
        isActive={isSelected}
        className="flex flex-col items-start gap-2 p-3 h-auto transition-all border border-border hover:bg-sidebar-accent/50 data-[active=true]:bg-sidebar-accent data-[active=true]:border-sidebar-border group/item"
      >
        <div className="flex w-full justify-between items-center gap-2">
          <span className="font-semibold truncate text-sm flex-1 min-w-0">
            {roadmap.topic}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-1.5 w-full bg-black/5 dark:bg-white/10 group-data-[active=true]/item:bg-black/10 dark:group-data-[active=true]/item:bg-black/40"
        />
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            showOnHover
            className="data-[state=open]:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <Pencil className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDelete(roadmap.id);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
