
---

# 🚀 The Learning Engine

**The Learning Engine** is an AI-powered educational orchestrator that transforms abstract learning goals into structured, multimodal curricula. Powered by **Gemini 3 Flash**, it leverages a multi-agent system to design custom learning routes, validate resources, and extract surgical "learning moments" from video content.

---

## 🌟 Key Features

* **Architect Agent**: Uses "Thinking" capabilities to deconstruct high-level goals into logical, sequential modules.
* **Librarian Agent**: Automatically performs sanity checks (HTTP 200) on all external links before they reach the user.
* **Multimodal Specialist**: Analyzes educational videos to provide direct navigation to key timestamps.
* **Adaptive Feedback**: Recalibrates individual learning tasks in real-time based on student progress and difficulty ratings.

---

## 🛠️ Technical Stack

* **Framework**: FastAPI (Python 3.12+)
* **Core AI**: Gemini 3 Flash Preview (Google Gen AI SDK)
* **Validation**: Pydantic (JSON Schema Enforcement)
* **Utilities**: `httpx` (Async Link Validation), `python-dotenv` (Secrets Management)

---

## 🏗️ Project Structure

```text
.
├── agents/               # Multi-agent logic (Architect, Librarian, etc.)
│   ├── __init__.py       # Package exports for clean imports
│   └── architect.py      # Curriculum reasoning logic
├── schemas/              # Pydantic models for JSON enforcement
│   ├── __init__.py
│   └── curriculum.py     # Schema for Gemini 3 structured output
├── utils/                # Helper functions
│   └── validator.py      # Async link sanity checks
├── main.py               # FastAPI Orchestrator (Entry Point)
└── .env                  # Local API keys (Ignored by Git)

```

---

## ⚙️ Setup & Installation

### 1. Environment Variables

This project uses **GitHub Secrets** for production and a local `.env` for development.

**Local Setup:**
Create a `.env` file in the root directory:

```text
GEMINI_API_KEY=your_actual_api_key_here

```

**GitHub Secrets:**
If deploying via GitHub Actions, add `GEMINI_API_KEY` under **Settings > Secrets and variables > Actions**.

### 2. Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn google-genai python-dotenv httpx

```

### 3. Run the Engine

```bash
uvicorn main:app --reload

```

---

## 🔒 Security

* **Secrets**: API keys are managed exclusively via environment variables.
* **Git**: The `.env` file is listed in `.gitignore` to prevent accidental exposure.
* **Validation**: The system uses a **Lazy Client** pattern, ensuring the Gemini client only initializes after environment variables are confirmed.

---
