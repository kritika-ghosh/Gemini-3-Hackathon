import { useAuth } from "@/features/auth/context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContainer,
  GoogleAuthButton,
  EmailAuthForm,
} from "@/features/auth";
import { Sparkles } from "lucide-react";

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/orchestrator");
    }
  }, [user, loading, navigate]);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-foreground font-sans">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Learning</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 leading-tight">
            Master Any Skill with AI
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Generate personalized learning roadmaps, curated video tutorials,
            and interactive guides in seconds. Your journey to mastery starts
            here.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                    alt="user"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground self-center">
              Join 10,000+ learners
            </p>
          </div>
        </div>

        {/* Auth Section */}
        <div className="flex justify-center">
          <AuthContainer
            title="Welcome Back"
            description="Enter your details to access your roadmaps"
          >
            <GoogleAuthButton />

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute w-full border-t border-border"></div>
              <span className="relative bg-card px-3 text-sm text-muted-foreground">
                Or continue with email
              </span>
            </div>

            <EmailAuthForm />
          </AuthContainer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
