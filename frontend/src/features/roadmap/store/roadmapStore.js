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
      let roadmap;
      if (id.startsWith('local_')) {
          const { getLocalRoadmapById } = await import('@/features/roadmap/services/localRoadmapService');
          roadmap = getLocalRoadmapById(id);
      } else {
          roadmap = await getRoadmapById(id);
      }
      set({ activeRoadmap: roadmap, isLoading: false });
    } catch (error) {
      console.error("Failed to load roadmap:", error);
      set({ error: error.message, isLoading: false, activeRoadmap: null });
    }
  },
  
  // Set active roadmap directly (e.g. after generation)
  setActiveRoadmap: (roadmap) => {
      set({ activeRoadmap: roadmap, activeRoadmapId: roadmap?.id || null });
  },

  // Fetch all roadmaps for a user (and local ones)
  fetchUserRoadmaps: async (userId) => {
    try {
        let allRoadmaps = [];
        
        // 1. Always fetch local roadmaps
        const { getLocalRoadmaps } = await import('@/features/roadmap/services/localRoadmapService');
        const localRoadmaps = getLocalRoadmaps();
        allRoadmaps = [...localRoadmaps];

        // 2. Fetch remote roadmaps if userId exists
        if (userId) {
            const { getUserRoadmaps } = await import('@/features/roadmap/services/roadmapService'); 
            const remoteRoadmaps = await getUserRoadmaps(userId);
            allRoadmaps = [...allRoadmaps, ...remoteRoadmaps];
        }

        set({ userRoadmaps: allRoadmaps });
    } catch (error) {
        console.error("Failed to fetch roadmaps:", error);
    }
  }
}));
