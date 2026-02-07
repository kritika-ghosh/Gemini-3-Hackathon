import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // For login
import { getFirestore } from "firebase/firestore"; // For saving roadmaps

const firebaseConfig = {
  apiKey: "AIzaSyD0DZB-LMW80Lf-OrgGZytZ_wT1xap4A00",
  authDomain: "pathai-051606.firebaseapp.com",
  projectId: "pathai-051606",
  storageBucket: "pathai-051606.firebasestorage.app",
  messagingSenderId: "203629100084",
  appId: "1:203629100084:web:9b2f582483fcef88d55e61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);