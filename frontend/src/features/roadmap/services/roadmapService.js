import { db } from "@/config/firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore";

/**
 * Saves a generated roadmap and initializes progress tracking.
 * @param {Object} roadmapData - The roadmap data { userId, topic, goal, difficulty, content }
 * @returns {Promise<string>} - The ID of the saved roadmap
 */
export const saveRoadmap = async (roadmapData) => {
  try {
    const { userId, topic, goal, difficulty, content } = roadmapData;

    // 1. Save Roadmap to 'roadmaps' collection
    const roadmapsRef = collection(db, "roadmaps");
    const roadmapDoc = await addDoc(roadmapsRef, {
      userId,
      topic,
      goal,
      difficulty,
      content, // Full JSON content
      createdAt: serverTimestamp(),
    });

    const roadmapId = roadmapDoc.id;

    // 2. Initialize Progress in 'progress' collection
    // Key: {userId}_{roadmapId} for easy lookup
    const progressId = `${userId}_${roadmapId}`;
    const progressRef = doc(db, "progress", progressId);
    
    await setDoc(progressRef, {
      userId,
      roadmapId,
      completedTasks: [], // Start with 0 completed tasks
      lastUpdated: serverTimestamp(),
    });

    return roadmapId;
  } catch (error) {
    console.error("Error saving roadmap:", error);
    throw error;
  }
};

/**
 * Fetches all roadmaps for a specific user.
 * @param {string} userId 
 * @returns {Promise<Array>} Array of roadmap objects
 */
export const getUserRoadmaps = async (userId) => {
  try {
    const roadmapsRef = collection(db, "roadmaps");
    const q = query(roadmapsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching user roadmaps:", error);
    return [];
  }
};

/**
 * Fetches a single roadmap by ID.
 * @param {string} roadmapId 
 * @returns {Promise<Object>} Roadmap object or null
 */
export const getRoadmapById = async (roadmapId) => {
    try {
        const docRef = doc(db, "roadmaps", roadmapId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.warn("No such roadmap document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching roadmap:", error);
        throw error;
    }
}

/**
 * Deletes a roadmap by ID.
 * @param {string} roadmapId 
 */
export const deleteRoadmap = async (roadmapId) => {
    try {
        await deleteDoc(doc(db, "roadmaps", roadmapId));
    } catch (error) {
        console.error("Error deleting roadmap:", error);
        throw error;
    }
};

/**
 * Renames a roadmap.
 * @param {string} roadmapId 
 * @param {string} newTopic 
 */
export const renameRoadmap = async (roadmapId, newTopic) => {
    try {
        const roadmapRef = doc(db, "roadmaps", roadmapId);
        await updateDoc(roadmapRef, {
            topic: newTopic
        });
    } catch (error) {
        console.error("Error renaming roadmap:", error);
        throw error;
    }
};
