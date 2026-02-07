import { useAuth } from "@/features/auth/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContainer,
  GoogleAuthButton,
  EmailAuthForm,
} from "@/features/auth";
import {
  BookOpen,
  Sun,
  Moon,
  Sparkles,
  ChevronDown,
  Zap,
  Star,
  Menu,
  X,
  Network,
  LayoutDashboard,
  Search,
  PlayCircle,
  Sidebar as SidebarIcon,
  LineChart,
  Brain,
  ScanSearch,
  CheckCircle,
  BadgeCheck,
  Grid3x3,
  Video,
  Crosshair,
  Github,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/features/theme";
import FeatureCard from "@/shared/components/FeatureCard";
import CountUp from "@/shared/components/CountUp";
import Footer from "@/shared/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DotGrid from "@/shared/backgrounds/DotGrid";

const StatCard = ({
  icon: Icon,
  number,
  suffix = "",
  label,
  context,
  delay,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  let targetNumber = 0;
  let displaySuffix = suffix;

  if (typeof number === "string") {
    if (number.includes("+")) displaySuffix = "+";
    if (number.includes("%")) displaySuffix = "%";
    targetNumber = parseInt(number.replace(/[^0-9]/g, ""), 10);
  } else {
    targetNumber = number;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`group relative flex flex-col items-center justify-center p-8 bg-transparent rounded-2xl border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 ${className}`}
    >
      <div className="mb-4 p-3 rounded-full bg-primary/10">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      <div className="flex items-baseline gap-1">
        <motion.span
          className="text-5xl md:text-6xl font-bold text-primary"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <CountUp
            from={0}
            to={targetNumber}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
          />
        </motion.span>
        <span className="text-3xl md:text-4xl font-bold text-primary/80">
          {displaySuffix}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{label}</h3>
      <p className="mt-2 text-sm text-center text-muted-foreground font-medium">
        {context}
      </p>
    </motion.div>
  );
};

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      title: "Turn any ambition into an actionable path.",
      subtext:
        "Transform vague goals into professional-grade curricula. The Orchestrator API handles the nesting, so you can focus on the learning.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Mock Roadmap Tree */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30"></div>
          <div className="flex flex-col items-center gap-4 relative z-10 w-full max-w-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <Network className="w-6 h-6" />
              </div>
            </div>
            <div className="h-8 w-0.5 bg-border/50"></div>
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm">
                  <div className="w-4 h-4 bg-primary/40 rounded-full"></div>
                </div>
                <div className="h-2 w-16 bg-muted rounded"></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm">
                  <div className="w-4 h-4 bg-primary/40 rounded-full"></div>
                </div>
                <div className="h-2 w-16 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "No more tutorial hell.",
      subtext:
        "AI-validated YouTube resources for every task. Gemini 1.5 Flash filters the fluff to pick the best teacher for you.",
      visual: (
        <div className="relative w-full h-full flex flex-col gap-4 p-4 overflow-hidden">
          {/* Mock Gemini Validation UI */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-semibold text-foreground">
              Gemini Validation
            </span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  i === 1
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card/50 border-white/5"
                } backdrop-blur-sm transition-all`}
              >
                <div className="w-12 h-8 bg-black/20 rounded flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 opacity-50" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 w-3/4 bg-foreground/20 rounded"></div>
                  <div className="h-2 w-1/2 bg-foreground/10 rounded"></div>
                </div>
                {i === 1 && (
                  <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    98%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Your learning, centralized.",
      subtext:
        "A professional, collapsible workspace inspired by top-tier AI agents. Save, track, and master your path in one place.",
      visual: (
        <div className="relative w-full h-full bg-card/50 backdrop-blur-sm border border-border rounded-xl flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/4 h-full border-r border-border bg-muted/30 p-3 flex flex-col gap-3">
            <div className="w-6 h-6 rounded bg-primary/20"></div>
            <div className="space-y-2 mt-4">
              <div className="h-2 w-full bg-foreground/10 rounded"></div>
              <div className="h-2 w-3/4 bg-foreground/10 rounded"></div>
              <div className="h-2 w-5/6 bg-foreground/10 rounded"></div>
            </div>
          </div>
          {/* Dashboard */}
          <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-foreground/20 rounded"></div>
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-foreground/10"></div>
                <div className="w-4 h-4 rounded-full bg-foreground/10"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="aspect-square rounded border border-border bg-card"></div>
              <div className="aspect-square rounded border border-border bg-card"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState("login");
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/orchestrator");
    }
  }, [user, loading, navigate]);

  const toggleAuth = () => {
    setShowAuth(!showAuth);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="font-display bg-transparent text-foreground transition-colors duration-300 min-h-screen w-full overflow-x-hidden relative">
      <div className="fixed inset-0 z-[-1] opacity-30 dark:opacity-5 pointer-events-none">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#a1a1aa"
          activeColor="#a1a1aa"
          proximity={120}
          shockRadius={200}
          shockStrength={2}
          resistance={1200}
          returnDuration={2}
        />
      </div>
      {/* Auth Modal Overlay */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md bg-card rounded-xl shadow-2xl p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 z-10"
              onClick={() => setShowAuth(false)}
            >
              ✕
            </Button>
            <AuthContainer
              title={
                authView === "login"
                  ? "Welcome Back"
                  : authView === "signup"
                    ? "Create Account"
                    : "Reset Password"
              }
              description={
                authView === "login"
                  ? "Sign in to continue your journey"
                  : authView === "signup"
                    ? "Join us and start your learning path"
                    : "Enter your email to receive a reset link"
              }
            >
              <div className="mt-4 space-y-4">
                {authView !== "forgot_password" && (
                  <>
                    <GoogleAuthButton />
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-full border-t border-border"></div>
                      <span className="relative bg-card px-3 text-sm text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </>
                )}
                <EmailAuthForm view={authView} setView={setAuthView} />
              </div>
            </AuthContainer>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-6 md:px-20 lg:px-40 relative z-40">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            PathAI
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            Product
          </a>
          <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            Curricula
          </a>
          <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            Pricing
          </a>
          <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            Resources
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleAuth}
            className="flex bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200">
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <a
              className="hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </a>
            <a
              className="hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Curricula
            </a>
            <a
              className="hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              className="hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </a>
            <hr className="border-border" />
            <button
              onClick={toggleAuth}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-bold shadow-lg"
            >
              Sign In
            </button>
          </nav>
        </div>
      )}

      {/* Main Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 lg:px-40 py-12 lg:py-18 gap-16 relative z-10">
        {/* Hero Text Content */}
        <div className="flex flex-col items-start gap-8 max-w-[640px] z-10">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
              AI-Powered Learning Orchestrator
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-primary py-2">
              Turn Any Goal Into A Learning Journey
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-[540px]">
              Transform your professional or personal aspirations into a
              step-by-step curriculum. Guided by AI, curated for you.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={toggleAuth}
              className="flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-[#7c3aed] text-white font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              Start Learning for Free
            </button>
            <button className="flex items-center gap-2 px-6 py-4 rounded-full bg-transparent text-foreground font-bold text-lg hover:bg-foreground/5 transition-all">
              <span>See How It Works</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 pt-4 border-t border-border w-full mt-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary fill-current" />
              <p className="text-sm font-semibold text-foreground/80">
                Powered by Gemini AI
              </p>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-current"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Visual Asset / Mockup */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center">
          {/* Glowing Background Element */}
          <div className="absolute -z-10 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-[100px] rounded-full"></div>

          {/* Product Mockup Container */}
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-[600px] rounded-xl border border-primary/20 bg-card p-4 shadow-2xl overflow-hidden group">
            {/* Glow Border Effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-primary/30 opacity-100 group-hover:border-primary/60 transition-colors pointer-events-none"></div>

            {/* Simulating a Learning Roadmap UI */}
            <div className="w-full h-full rounded-lg bg-muted flex flex-col p-6 gap-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-32 bg-primary/20 rounded-full"></div>
                  <div className="h-2 w-20 bg-foreground/10 rounded-full"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
              </div>

              {/* Roadmap Nodes */}
              <div className="flex flex-col gap-8 relative py-4">
                {/* Connection Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent"></div>

                {/* Node 1 */}
                <div className="flex gap-4 items-start relative z-10">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/40">
                    1
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 w-3/4 bg-foreground/10 rounded-md"></div>
                    <div className="h-3 w-full bg-foreground/5 rounded-sm"></div>
                  </div>
                </div>

                {/* Node 2 (Active/Glowing) */}
                <div className="flex gap-4 items-start relative z-10">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold ring-4 ring-primary/20 animate-pulse">
                    2
                  </div>
                  <div className="flex flex-col gap-2 flex-1 p-3 rounded-lg bg-card shadow-sm border border-primary/10">
                    <div className="h-4 w-1/2 bg-primary/20 rounded-md"></div>
                    <div className="flex gap-2">
                      <div className="h-10 w-16 bg-foreground/5 rounded-md"></div>
                      <div className="h-10 w-full bg-foreground/5 rounded-md"></div>
                    </div>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex gap-4 items-start relative z-10 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold text-muted-foreground">
                    3
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 w-2/3 bg-foreground/5 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="py-18 px-6 md:px-20 lg:px-40 bg-muted/30 text-foreground overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              The Core
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground via-30% to-primary py-2 mb-6">
              Features That Matter
            </h2>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our engine uses multi-stage AI to process educational goals into
              high-quality, validated learning paths.
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col gap-24 lg:gap-32">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              subtext={feature.subtext}
              visual={feature.visual}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-transparent border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              The Process
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground via-30% to-primary py-2">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Our engine uses multi-stage AI to process educational goals into
              high-quality, validated learning paths.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 md:mt-24">
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 01: The Architect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-sm">
                <Brain className="w-10 h-10" />
              </div>

              {/* Connector Line 1 (Desktop) */}
              <div className="absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] hidden md:block -z-10">
                <div className="h-[2px] w-full bg-primary opacity-50"></div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground">
                01 The Architect
              </h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-[250px] leading-relaxed">
                AI logic & structured JSON curricula generation
              </p>

              <div className="w-full max-w-[320px] rounded-xl border border-border bg-card/50 p-4 text-left shadow-sm backdrop-blur-sm group-hover:border-primary/30 transition-colors">
                <div className="flex gap-1.5 mb-3">
                  <div className="h-2 w-2 rounded-full bg-red-400"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
                <div className="font-mono text-[10px] space-y-1 text-muted-foreground">
                  <p className="text-primary">"curriculum": &#123;</p>
                  <p className="pl-3">
                    <span className="text-foreground">"title"</span>: "Quantum
                    Physics",
                  </p>
                  <p className="pl-3">
                    <span className="text-foreground">"modules"</span>: [
                  </p>
                  <p className="pl-6 text-indigo-400">
                    &#123;"id": 102, "depth": 0.9&#125;,
                  </p>
                  <p className="pl-3">]</p>
                  <p className="text-primary">&#125;</p>
                </div>
              </div>
            </motion.div>

            {/* Step 02: The Scout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-sm">
                <ScanSearch className="w-10 h-10" />
              </div>

              {/* Connector Line 2 (Desktop) */}
              <div className="absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] hidden md:block -z-10">
                <div className="h-[2px] w-full bg-primary opacity-50"></div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground">
                02 The Scout
              </h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-[250px] leading-relaxed">
                Massive search & multi-source video retrieval
              </p>

              <div className="grid w-full max-w-[320px] grid-cols-3 gap-2 p-2 rounded-xl border border-border bg-card/50 shadow-sm group-hover:border-primary/30 transition-colors">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`aspect-video rounded flex items-center justify-center ${i === 2 || i === 5 ? "bg-primary/10 ring-1 ring-primary/20" : "bg-muted/50"}`}
                  >
                    <PlayCircle
                      className={`w-3 h-3 ${i === 2 || i === 5 ? "text-primary" : "text-muted-foreground/30"}`}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Step 03: The Validator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Fixed Icon Color Mismatch (Was solid bg-primary) */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground">
                03 The Validator
              </h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-[250px] leading-relaxed">
                Content validation & automated quality selection
              </p>

              <div className="w-full max-w-[320px] rounded-xl border border-border bg-card/50 p-3 shadow-sm overflow-hidden group-hover:border-primary/30 transition-all">
                <div className="relative h-24 w-full overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                    <span className="font-medium">Best Match Found</span>
                    <span className="rounded bg-primary px-1 font-bold">
                      98% Fit
                    </span>
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <BadgeCheck className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-left">
                  <div className="h-2 w-3/4 rounded bg-muted-foreground/20"></div>
                  <div className="h-2 w-1/2 rounded bg-muted-foreground/20"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 w-full bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Impact
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground via-30% to-primary py-2 mb-6">
              The Numbers Tell The Story
            </h2>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              We process thousands of resources daily so you don't have to.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Grid3x3,
                number: "500+",
                label: "Skills Mapped",
                context: "From Python to pottery",
              },
              {
                icon: Video,
                number: "10,000+",
                label: "Resources Curated",
                context: "Only the best make the cut",
              },
              {
                icon: Crosshair,
                number: "87%",
                label: "Relevance Score",
                context: "AI validation accuracy",
              },
              {
                icon: Zap,
                number: 8,
                suffix: "sec",
                label: "Average Generation",
                context: "Faster than searching",
              },
            ].map((stat, index) => (
              <StatCard
                className="bg-background/50 dark:bg-background/50"
                key={index}
                icon={stat.icon}
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                context={stat.context}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 lg:px-40 py-24 md:py-32 text-center flex flex-col items-center gap-12 bg-transparent dark:bg-transparent border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 relative z-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest self-center">
            Get Started
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground via-30% to-primary py-2 max-w-3xl mx-auto">
            Ready to specificy your{" "}
            <span className="text-primary">future?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners building their own paths with the power
            of artificial intelligence.
          </p>
        </motion.div>

        <motion.button
          onClick={toggleAuth}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold text-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          Start Your Journey Now
        </motion.button>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
