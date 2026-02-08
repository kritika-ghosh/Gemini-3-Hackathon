import React from "react";
import DashboardLayout from "@/features/dashboard/layouts/DashboardLayout";
import { Generate } from "@/features/dashboard/components/Generate";
import { Roadmap } from "@/features/dashboard/components/Roadmap";
import { useRoadmapGenerator } from "@/features/dashboard/hooks/useRoadmapGenerator";

const RoadmapOrchestrator = () => {
  const {
    roadmap,
    loadingRoadmap,
    error,
    videoResources,
    loadingVideos,
    generateRoadmap,
    generateMockRoadmap,
  } = useRoadmapGenerator();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-transparent p-6 font-sans text-slate-800">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-extrabold text-center font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-primary py-2">
              What do you want to learn?
            </h1>
          </div>

          {/* Input Section */}
          <Generate
            onGenerate={generateRoadmap}
            onGenerateMock={generateMockRoadmap}
            loading={loadingRoadmap}
          />

          {/* Error Display */}
          {error && (
            <div className="mb-10 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Roadmap Display */}
          <Roadmap
            roadmap={roadmap}
            videoResources={videoResources}
            loadingVideos={loadingVideos}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoadmapOrchestrator;
