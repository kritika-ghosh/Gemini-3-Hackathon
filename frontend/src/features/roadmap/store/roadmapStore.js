import { create } from 'zustand';
import { getRoadmapById } from '@/features/roadmap/services/roadmapService';

export const useRoadmapStore = create((set, get) => ({
  activeRoadmapId: null,
  activeRoadmap: null,
  userRoadmaps: [],
  isLoading: false,
  error: null,

  setActiveRoadmapId: (id) => set({ activeRoadmapId: id }),

  // Fetch and set active roadmap
  loadRoadmap: async (id) => {
    if (!id) {
        set({ activeRoadmapId: null, activeRoadmap: null });
        return;
    }

    set({ isLoading: true, error: null, activeRoadmapId: id });
    try {
      const roadmap = await getRoadmapById(id);
      set({ activeRoadmap: roadmap, isLoading: false });
    } catch (error) {
      console.error("Failed to load roadmap:", error);
      set({ error: error.message, isLoading: false, activeRoadmap: null });
    }
  },
  
  // Set active roadmap directly (e.g. after generation)
  setActiveRoadmap: (roadmap) => {
      set({ activeRoadmap: roadmap, activeRoadmapId: roadmap.id || null });
  },

  // Fetch all roadmaps for a user
  fetchUserRoadmaps: async (userId) => {
    if (!userId) return;
    try {
        // dynamic import to avoid circular dependency if service imports store
        const { getUserRoadmaps } = await import('@/features/roadmap/services/roadmapService'); 
        const roadmaps = await getUserRoadmaps(userId);
        set({ userRoadmaps: roadmaps });
    } catch (error) {
        console.error("Failed to fetch user roadmaps:", error);
    }
  }
}));
