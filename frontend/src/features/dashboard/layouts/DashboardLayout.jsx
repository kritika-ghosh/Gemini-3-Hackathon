import React, { useEffect, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { useRoadmapStore } from "@/features/roadmap/store/roadmapStore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/shared/components/ModeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";
import DotGrid from "@/shared/backgrounds/DotGrid";
import { useTheme } from "@/shared/components/ThemeContext";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const { activeRoadmap } = useRoadmapStore();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      if (theme === "dark") return true;
      if (theme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };
    setIsDark(checkTheme());
  }, [theme]);

  const dotBaseColor = isDark ? "#E5E7EB" : "#95959fff"; // Optimized for visibility
  const dotActiveColor = isDark ? "#A78BFA" : "#7C3AED";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/orchestrator">
                    Orchestrator
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {activeRoadmap?.topic && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="truncate max-w-[200px]">
                        {activeRoadmap.topic}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
            <DotGrid
              dotSize={5}
              gap={20}
              baseColor={dotBaseColor}
              activeColor={dotActiveColor}
              proximity={100}
              shockRadius={100}
              shockStrength={2}
              resistance={1200}
              returnDuration={2}
            />
          </div>
          <div className="relative z-10">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
