import React from "react";
import { Sparkles, Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* COLUMN 1 - BRANDING */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              PathAI
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              AI-powered curriculum orchestration
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-card border border-border">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">
                Powered by Gemini 3 Flash
              </span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* COLUMN 2 - PRODUCT */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 - RESOURCES */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  GitHub Repo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Report Bug
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 - LEGAL */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
              Legal & Info
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  About This Project
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 The Learning Engine
          </p>

          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built for learners, by learners</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </div>

          <div className="px-3 py-1 rounded-full bg-muted/50 border-primary border/40 border">
            <span className="text-xs font-semibold text-primary">
              Hackathon Project 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
