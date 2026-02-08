import React from "react";
import { AppSidebar } from "./AppSidebar";
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

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();

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
                  <BreadcrumbLink href="#">Orchestrator</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.photoURL}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback>
                      {user?.displayName?.substring(0, 2) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end" forceMount>
                <div className="grid gap-4">
                  <div className="font-medium leading-none">
                    {user?.displayName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-10 dark:opacity-5">
            <DotGrid
              dotSize={5}
              gap={20}
              baseColor="#95959fff"
              activeColor="#7C3AED"
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
