const LOCAL_STORAGE_KEY = "guest_roadmaps";

export const getLocalRoadmaps = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getLocalRoadmapById = (id) => {
  const roadmaps = getLocalRoadmaps();
  return roadmaps.find((r) => r.id === id);
};

export const saveLocalRoadmap = (roadmapData) => {
  const roadmaps = getLocalRoadmaps();
  const newId = `local_${Date.now()}`;
  const newRoadmap = {
    ...roadmapData,
    id: newId,
    createdAt: new Date().toISOString(),
    isLocal: true,
  };
  
  roadmaps.unshift(newRoadmap);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roadmaps));
  return newId;
};

export const deleteLocalRoadmap = (id) => {
  const roadmaps = getLocalRoadmaps();
  const filtered = roadmaps.filter((r) => r.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
};

export const renameLocalRoadmap = (id, newTopic) => {
  const roadmaps = getLocalRoadmaps();
  const index = roadmaps.findIndex((r) => r.id === id);
  if (index !== -1) {
    roadmaps[index].topic = newTopic;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roadmaps));
  }
};
