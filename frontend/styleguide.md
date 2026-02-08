# Frontend Architecture & Style Guide

## 1. Project Structure & Architecture

### Feature Isolation

- **Rule**: All logic, components, and state related to a specific business goal (e.g., `auth`, `dashboard`, `generator`) MUST live inside `src/features/[feature-name]/`.
- **Zero Cross-Imports**: A feature folder is a "silo." `src/features/auth` cannot import anything from `src/features/dashboard`.
- **Communication**: Inter-feature communication happens ONLY via `src/pages/` (orchestration layer) or the global Zustand store.

### Public API Pattern

- **Requirement**: Every feature folder MUST contain an `index.js` file.
- **Purpose**: This file acts as the "Gatekeeper." It only exports what is necessary for the rest of the app to function.
- **Convention**:
  - ✅ Correct: `import { AuthButton } from '@/features/auth';`
  - ❌ Forbidden: `import { AuthButton } from '@/features/auth/components/AuthButton.jsx';`

### Shared Components

- **Location**: Generic, business-agnostic UI (e.g., standard Buttons, Spinners, Cards) lives in `src/shared/components/`.

## 2. State Management Strategy

### Zustand (Dynamic State)

- **Use Case**: Complex, frequently updated, or nested data (e.g., Active Roadmap, Video Cache, User Profile).
- **Location**: `src/features/[feature]/stores/`.

### React Context (Static State)

- **Use Case**: Global, rarely-changing data like Theme (Dark/Light) or Current User Authentication state.
- **Location**: `src/context/` or `src/providers/`.

### Prop Drilling Limit

- **Rule**: If a value is needed more than **2 levels deep**, move it to a Zustand store or Context.

## 3. UI Style Guide & Theming

### Color Palette

#### Light Mode

| Token                | Hex Value | Description                  |
| :------------------- | :-------- | :--------------------------- |
| `background`         | `#f8f8fa` | Main app background          |
| `foreground`         | `#0f1729` | Primary text color           |
| `card`               | `#ffffff` | Card background              |
| `card-foreground`    | `#0f1729` | Text on cards                |
| `primary`            | `#3333dc` | Primary action color         |
| `primary-foreground` | `#ffffff` | Text on primary button/badge |
| `muted`              | `#f1f5f9` | Muted background             |
| `muted-foreground`   | `#64748b` | Muted text                   |
| `border`             | `#e2e8f0` | Border color                 |

#### Dark Mode

| Token                | Hex Value | Description                  |
| :------------------- | :-------- | :--------------------------- |
| `background`         | `#09090a` | Main app background          |
| `foreground`         | `#f8fafc` | Primary text color           |
| `card`               | `#18181b` | Card background              |
| `card-foreground`    | `#f8fafc` | Text on cards                |
| `primary`            | `#818cf8` | Primary action color         |
| `primary-foreground` | `#0f1729` | Text on primary button/badge |
| `muted`              | `#1e293b` | Muted background             |
| `muted-foreground`   | `#94a3b8` | Muted text                   |
| `border`             | `#27272a` | Border color                 |

### Component Library

- **Core**: Use **shadcn/ui** components.
- **Icons**: Use **Lucide React**.
- **Animation**: Use **Framer Motion** for smooth transitions.

## 4. Routing & Execution Flow

### Wiring Room (`App.jsx`)

- **Purpose**: High-level configuration only.
- **Content**: `BrowserRouter`, Global Providers (Theme, Auth), and Route definitions.
- **No Logic**: Do not include business logic or complex state here.

### Layout Orchestrators (`src/pages/`)

- **Role**: Pages arrange feature-level components on the screen.
- **Responsibility**: Fetch data if needed (or delegate to feature hooks), handle layout, and pass props to feature components.

### Auth Guard

- **Rule**: All routes except `/` (Landing/Home) and `/auth/*` (Login/Signup) must be wrapped in an authentication check (e.g., `<ProtectedRoute>`).

## 5. Code Quality Guardrails

### 🚨 Critical Rules

1.  **Refusal**: Developers (AI & Human) must deny any request that tries to put business logic inside generic `src/components/` or breaks feature isolation.
2.  **Refinement**: Before writing code, summarize the plan:
    > "I will create `[Component]` in `[Feature Folder]` and export it via `index.js`."

## 6. Strict Architectural Directive

### The "Source of Truth" Structure

```text
src/
├── components/ui/          <-- Atomic shadcn components (untouched)
├── config/                 <-- External configs (Firebase, API keys)
├── features/               <-- Business logic silos
│   ├── auth/               <-- Login, signup, user state
│   ├── dashboard/          <-- Sidebar tree logic, search
│   └── roadmap/            <-- Orchestrator API results & video data
├── hooks/                  <-- Global React hooks
├── lib/                    <-- Utils and shared helper functions
├── pages/                  <-- Layout orchestrators (the "routes")
└── shared/                 <-- Business-agnostic UI
    ├── components/         <-- GlassCard, Footer, mode-toggle
    └── layouts/            <-- AppLayout, SidebarWrapper
```

### AI Guardrail Rules

1.  **Feature Isolation**: If you create a component that depends on specific data (like a Roadmap or User), it MUST go into `src/features/[name]/components/`.
2.  **Shared logic**: Only put generic, "dumb" UI (cards, backgrounds, toggles) into `src/shared/`.
3.  **Public API**: You are forbidden from importing deep files. You MUST import from the feature's `index.js` (e.g., `import { useAuth } from '@/features/auth'`).
4.  **No Deep Nesting**: Do not create more than 3 levels of folders. If a folder has only one file, move that file up one level.
