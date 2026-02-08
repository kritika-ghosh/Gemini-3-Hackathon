import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { 
  doc, 
  onSnapshot, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp 
} from "firebase/firestore";
import { useAuth } from "@/features/auth/AuthContext";

/**
 * Hook to manage real-time progress for a specific roadmap.
 * @param {string} roadmapId - The ID of the roadmap to track
 * @returns {Object} { completedTasks, toggleTask, loading }
 */
export const useProgress = (roadmapId) => {
  const { user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive the progress document ID: {userId}_{roadmapId}
  const progressId = user && roadmapId ? `${user.uid}_${roadmapId}` : null;

  useEffect(() => {
    if (!progressId) {
      setLoading(false);
      return;
    }

    const progressRef = doc(db, "progress", progressId);

    // Real-time listener
    const unsubscribe = onSnapshot(progressRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompletedTasks(data.completedTasks || []);
      } else {
        // Handle case where progress doc might not exist yet (optional)
        setCompletedTasks([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error listening to progress:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [progressId]);

  const toggleTask = async (taskId) => {
    if (!progressId) return;

    const progressRef = doc(db, "progress", progressId);
    const isCompleted = completedTasks.includes(taskId);

    try {
      await updateDoc(progressRef, {
        completedTasks: isCompleted ? arrayRemove(taskId) : arrayUnion(taskId),
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return { completedTasks, toggleTask, loading };
};
