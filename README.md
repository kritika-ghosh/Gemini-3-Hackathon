
---

# 🚀 The Learning Engine

The Learning Engine is an AI-powered educational orchestrator that transforms abstract learning goals into structured, multimodal curricula. Powered by Gemini 3 Flash, it leverages a multi-agent system to design custom learning routes, validate resources, and extract surgical "learning moments" from video content.

---
# AI Learning Assistant APIs

This repository contains the backend logic for an AI-powered learning platform. It consists of two distinct FastAPI services powered by Google's Gemini 1.5 Flash.

## 1. YouTube Scraper & Validator API
**Purpose:** Finds, verifies, and curates the best video tutorials for a specific learning goal.

* **Endpoint:** `POST /recommend`
* **What it does:**
    1.  Searches YouTube via the official Data API for videos matching a specific **Topic** (e.g., "Variables"), **Context** (e.g., "Python"), and **Difficulty** (e.g., "Beginner").
    2.  Retrieves a list of relevant candidates.
    3.  Uses **Gemini AI** to analyze the titles and channels, filtering out irrelevant results.
    4.  Selects the single **best video resource** and provides a natural language explanation for why it was chosen.

## 2. Curriculum Orchestrator API
**Purpose:** Generates a structured, step-by-step learning roadmap.

* **Endpoint:** `POST /orchestrate`
* **What it does:**
    1.  Accepts a broad **Learning Goal** (e.g., "Learn React") and a **Difficulty Level**.
    2.  Uses an **"Architect Agent"** (powered by Gemini) to design a complete curriculum skeleton.
    3.  Outputs a structured JSON object containing:
        * **Modules:** Logical groupings of concepts.
        * **Tasks:** Action-oriented steps for the user to complete.
        * **Prerequisites:** Concepts needed before starting.
        * **Time Estimates:** Estimated hours/minutes for each section.
--- 
