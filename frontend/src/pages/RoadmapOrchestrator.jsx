import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRoadmapStore } from "@/features/roadmap/store/roadmapStore";
import DashboardLayout from "@/features/dashboard/layouts/DashboardLayout";
import { Generate } from "@/features/dashboard/components/Generate";
import { Roadmap } from "@/features/dashboard/components/Roadmap";
import { useRoadmapGenerator } from "@/features/dashboard/hooks/useRoadmapGenerator";
import { useAuth } from "@/features/auth/AuthContext";
import { Loader2 } from "lucide-react";

const RoadmapOrchestrator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const roadmapId = searchParams.get("roadmapId");

  const [isSaving, setIsSaving] = useState(false);

  // Lifted state for roadmap generation
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");

  const {
    roadmap: generatedRoadmap,
    loadingRoadmap,
    error,
    videoResources: generatedVideoResources,
    loadingVideos,
    generateRoadmap,
    resetRoadmap,
  } = useRoadmapGenerator();

  const {
    activeRoadmap,
    isLoading: isLoadingActive,
    loadRoadmap,
    setActiveRoadmap,
    fetchUserRoadmaps, // Added
  } = useRoadmapStore();

  // Effect: Load roadmap from URL; Reset if no ID (Add New)
  useEffect(() => {
    if (roadmapId && (!activeRoadmap || activeRoadmap.id !== roadmapId)) {
      loadRoadmap(roadmapId);
      resetRoadmap(); // Clear any generated state when switching to saved
    } else if (!roadmapId) {
      if (activeRoadmap) {
        loadRoadmap(null);
      }
    }
  }, [roadmapId, activeRoadmap, loadRoadmap]);

  const displayRoadmap = roadmapId ? activeRoadmap : generatedRoadmap;

  const displayVideoResources = roadmapId
    ? activeRoadmap?.content?.videoResources || {}
    : generatedVideoResources;

  const handleStartLearning = async () => {
    if (!generatedRoadmap) return;

    setIsSaving(true);
    try {
      const roadmapTitle =
        goal ||
        topic ||
        generatedRoadmap.goal ||
        generatedRoadmap.topic ||
        "Custom Roadmap";

      const roadmapData = {
        topic: roadmapTitle,
        goal: goal || generatedRoadmap.goal,
        difficulty: difficulty || generatedRoadmap.difficulty || "Beginner",
        content: {
          modules: generatedRoadmap.modules,
          videoResources: generatedVideoResources,
        },
      };

      let savedId;

      if (user) {
        // Save to Firebase
        const { saveRoadmap: firebaseSave } =
          await import("@/features/roadmap");
        savedId = await firebaseSave({ ...roadmapData, userId: user.uid });
        fetchUserRoadmaps(user.uid); // Update the sidebar list immediately
      } else {
        // Save to LocalStorage
        const { saveLocalRoadmap } =
          await import("@/features/roadmap/services/localRoadmapService");
        savedId = saveLocalRoadmap(roadmapData);
        fetchUserRoadmaps(null); // Update the sidebar list immediately
      }

      // Update store and URL
      loadRoadmap(savedId); // Reload to ensure store has full saved object
      navigate(`/orchestrator?roadmapId=${savedId}`);
    } catch (err) {
      console.error("Failed to save roadmap:", err);
    } finally {
      setIsSaving(false);
      resetRoadmap();
    }
  };

  if (isLoadingActive) {
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading roadmap...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-transparent p-6 font-sans text-slate-800">
        <div className="max-w-5xl mx-auto">
          {/* Show Generator ONLY if no roadmap is selected AND no roadmap is generated */}
          {!displayRoadmap && (
            <>
              <div className="mb-4">
                <h1 className="text-3xl font-extrabold text-center font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-primary py-2">
                  What do you want to learn?
                </h1>
              </div>

              <Generate
                topic={topic}
                setTopic={setTopic}
                goal={goal}
                setGoal={setGoal}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                onGenerate={generateRoadmap}
                loading={loadingRoadmap}
              />
            </>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-10 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Roadmap Display */}
          {displayRoadmap ? (
            <Roadmap
              roadmap={
                roadmapId
                  ? {
                      ...displayRoadmap.content,
                      topic: displayRoadmap.topic,
                      goal: displayRoadmap.goal,
                    }
                  : displayRoadmap
              } // Saved roadmap has content wrapper
              videoResources={displayVideoResources}
              loadingVideos={loadingVideos}
              onStartLearning={!roadmapId ? handleStartLearning : undefined} // Only show button if not saved yet
              roadmapId={roadmapId || activeRoadmap?.id}
            />
          ) : null}

          {/* Saving Overlay */}
          {isSaving && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-lg font-medium text-foreground">
                  Saving your journey...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoadmapOrchestrator;
