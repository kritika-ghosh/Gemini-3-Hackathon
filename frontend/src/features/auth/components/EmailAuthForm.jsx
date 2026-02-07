import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Loader2 } from "lucide-react";

export const EmailAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // We rely on LandingPage's useEffect to redirect, but for immediate feedback
  // or if wrapped differently, we can also trigger something here.
  // Given LandingPage logic, once auth state changes, it should redirect.

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md border border-destructive/20">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-primary"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </div>
    </div>
  );
};
