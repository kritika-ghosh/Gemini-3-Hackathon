import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const GoogleAuthButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/orchestrator");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full relative"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="mr-2 h-4 w-4"
          />
        )}
        Continue with Google
      </Button>
      {error && <p className="text-xs text-destructive text-center">{error}</p>}
    </div>
  );
};
