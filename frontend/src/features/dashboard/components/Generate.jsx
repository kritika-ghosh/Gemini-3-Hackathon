import React from "react";
import { Loader2, Sparkles, ChevronDown, FlaskConical } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Generate = ({
  topic,
  setTopic,
  goal,
  setGoal,
  difficulty,
  setDifficulty,
  onGenerate,
  loading,
}) => {
  const handleGenerateClick = () => {
    onGenerate(topic, goal, difficulty);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl dark:shadow-2xl dark:shadow-primary/10 border-border bg-card text-card-foreground mb-10 transition-all">
      <CardHeader>
        <CardTitle>Create Your Roadmap</CardTitle>
        <CardDescription className="text-muted-foreground">
          Define your learning path with specific topics and goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            Topic
          </label>
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. State Management"
            onKeyDown={(e) => e.key === "Enter" && handleGenerateClick()}
            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            Goal / Context
          </label>
          <Input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. React"
            onKeyDown={(e) => e.key === "Enter" && handleGenerateClick()}
            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="w-full md:w-48 space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            Difficulty
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-background border-input hover:bg-accent hover:text-accent-foreground"
              >
                {difficulty}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[200px] bg-popover border-border text-popover-foreground"
            >
              <DropdownMenuItem
                onClick={() => setDifficulty("Beginner")}
                className="focus:bg-accent focus:text-accent-foreground"
              >
                Beginner
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDifficulty("Intermediate")}
                className="focus:bg-accent focus:text-accent-foreground"
              >
                Intermediate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDifficulty("Advanced")}
                className="focus:bg-accent focus:text-accent-foreground"
              >
                Advanced
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={handleGenerateClick}
            disabled={loading || !topic.trim() || !goal.trim()}
            className="flex-1 md:flex-initial bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Building...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
