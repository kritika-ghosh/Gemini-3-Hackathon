import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const EmailAuthForm = ({ view, setView }) => {
  // view and setView are now props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (view === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (view === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (name) {
          await updateProfile(userCredential.user, {
            displayName: name,
          });
        }
      } else if (view === "forgot_password") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent! Check your inbox.");
        setLoading(false);
        return; // Don't redirect or change view immediately
      }
    } catch (err) {
      console.error(err);
      let errorMessage = err.message;
      if (err.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      }
      setError(errorMessage);
    } finally {
      if (view !== "forgot_password") {
        setLoading(false);
      }
    }
  };

  const toggleView = (newView) => {
    setView(newView);
    setError(null);
    setMessage(null);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {view === "signup" && (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="bg-background/50 border-input"
            />
          </div>
        )}

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-background/50 border-input"
          />
        </div>

        {view !== "forgot_password" && (
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-background/50 border-input"
            />
          </div>
        )}

        {view === "signup" && (
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-background/50 border-input"
            />
          </div>
        )}

        {view === "login" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => toggleView("forgot_password")}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md border border-destructive/20">
            {error}
          </p>
        )}

        {message && (
          <p className="text-sm text-green-600 bg-green-500/10 p-2 rounded-md border border-green-500/20">
            {message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {view === "login"
            ? "Sign In"
            : view === "signup"
              ? "Create Account"
              : "Reset Password"}
        </Button>
      </form>

      <div className="text-center space-y-2">
        {view === "login" && (
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => toggleView("signup")}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        )}

        {view === "signup" && (
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => toggleView("login")}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        )}

        {view === "forgot_password" && (
          <button
            onClick={() => toggleView("login")}
            className="text-sm text-primary hover:underline font-medium"
          >
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
};
