import * as React from "react";
import { Command, MoreHorizontal, Plus } from "lucide-react";
import icon from "@/assets/icon.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/AuthContext";
import { useState, useEffect } from "react";
import {
  getUserRoadmaps,
  deleteRoadmap,
  renameRoadmap,
} from "@/features/roadmap";
import { RoadmapSummaryCard } from "../components/RoadmapSummaryCard";
import { RoadmapDetailView } from "../components/RoadmapDetailView";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRoadmapStore } from "@/features/roadmap/store/roadmapStore";
import { Map, List } from "lucide-react";

export function AppSidebar({ ...props }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roadmapIdFromUrl = searchParams.get("roadmapId");
  const { open } = useSidebar();

  const {
    activeRoadmapId,
    activeRoadmap,
    loadRoadmap,
    setActiveRoadmapId,
    userRoadmaps,
    fetchUserRoadmaps,
  } = useRoadmapStore();

  // Use auth user data if available, or defaults
  const userData = {
    name: user?.displayName || "User",
    email: user?.email || "",
    avatar: user?.photoURL || "",
  };

  // Fetch all user roadmaps for the list (using store action)
  useEffect(() => {
    fetchUserRoadmaps(user?.uid);
  }, [user, fetchUserRoadmaps]);

  // Sync URL with Store
  useEffect(() => {
    if (roadmapIdFromUrl && roadmapIdFromUrl !== activeRoadmapId) {
      loadRoadmap(roadmapIdFromUrl);
    }
  }, [roadmapIdFromUrl, activeRoadmapId, loadRoadmap]);

  const handleRoadmapClick = (id) => {
    navigate(`/orchestrator?roadmapId=${id}`);
  };

  const handleDeleteRoadmap = async (id) => {
    if (window.confirm("Are you sure you want to delete this journey?")) {
      try {
        if (id.startsWith("local_")) {
          const { deleteLocalRoadmap } =
            await import("@/features/roadmap/services/localRoadmapService");
          deleteLocalRoadmap(id);
        } else {
          await deleteRoadmap(id);
        }

        // Refresh list
        fetchUserRoadmaps(user?.uid);

        // If deleted was active, clear selection
        if (activeRoadmapId === id) {
          setActiveRoadmapId(null);
          navigate("/orchestrator");
        }
      } catch (error) {
        console.error("Failed to delete roadmap:", error);
      }
    }
  };

  const handleRenameRoadmap = async (id, newTopic) => {
    try {
      if (id.startsWith("local_")) {
        const { renameLocalRoadmap } =
          await import("@/features/roadmap/services/localRoadmapService");
        renameLocalRoadmap(id, newTopic);
      } else {
        await renameRoadmap(id, newTopic);
      }

      // Refresh list
      fetchUserRoadmaps(user?.uid);

      // If renamed was active, reload it to update UI
      if (activeRoadmapId === id) {
        loadRoadmap(id);
      }
    } catch (error) {
      console.error("Failed to rename roadmap:", error);
    }
  };
  const handleLogout = async () => {
    if (user) {
      await logout();
    }
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="min-w-0">
              <a
                href="/orchestrator"
                className="flex items-center gap-2 min-w-0"
              >
                <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-full bg-white text-sidebar-primary-foreground overflow-hidden border border-white/20 p-1">
                  <img
                    src={icon}
                    alt="PathAI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* min-w-0 is critical here for the grid child */}
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-semibold">PathAI</span>
                  <span className="truncate text-xs">Orchestrator</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-x-hidden">
        {open ? (
          <>
            <SidebarGroup className="p-2 pb-0 min-w-0">
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                My Journeys
              </SidebarGroupLabel>
              <SidebarMenu className="gap-1 min-w-0">
                {userRoadmaps.map((roadmap) => (
                  <RoadmapSummaryCard
                    key={roadmap.id}
                    roadmap={roadmap}
                    isSelected={activeRoadmapId === roadmap.id}
                    onClick={() => handleRoadmapClick(roadmap.id)}
                    onDelete={handleDeleteRoadmap}
                    onRename={handleRenameRoadmap}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <div className="p-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 border border-dashed border-sidebar-border/50 min-w-0 overflow-hidden"
                onClick={() => {
                  loadRoadmap(null);
                  navigate("/orchestrator");
                }}
              >
                <Plus className="w-3 h-3 shrink-0" />
                <span className="text-xs truncate">Add New</span>
              </Button>
            </div>
            <SidebarSeparator className="my-2 bg-sidebar-border/50 border-b border-sidebar-border/50 shadow-sm" />
            {/* This container forces the DetailView to shrink */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate shrink-0">
                Current Roadmap Details
              </div>
              <div className="flex-1 min-h-0 w-full overflow-hidden">
                {activeRoadmap && <RoadmapDetailView roadmap={activeRoadmap} />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 p-2 mt-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={() => {
                loadRoadmap(null);
                navigate("/orchestrator");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <SidebarSeparator className="w-8 mx-auto bg-sidebar-border/50" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              title="My Journeys"
            >
              <Map className="h-4 w-4" />
            </Button>
            {activeRoadmap && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
                title="Current Details"
              >
                <List className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="min-w-0 border-t border-sidebar-border/50 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="min-w-0 hover:bg-sidebar-accent/50 data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="h-8 w-8 shrink-0 rounded-full border border-sidebar-border">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* min-w-0 allows the email to truncate properly */}
                  <div className="grid flex-1 text-left text-sm leading-tight min-w-0 ml-1">
                    <span className="truncate font-semibold uppercase">
                      {userData.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userData.email}
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4 shrink-0 transition-transform group-data-[state=open]/menu-button:rotate-90" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userData.name}
                      </span>
                      <span className="truncate text-xs">{userData.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
