import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
      {/* 
          Note: The standard shadcn toggle usually uses a dropdown or conditional rendering.
          Here we simplify to a direct toggle button that swaps icons based on state.
          However, since we are adding classes to root, we can just check 'dark' class presence 
          or rely on the state. For better visual feedback we often overlay them.
      */}
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
