import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoadmapOrchestrator from "./pages/RoadmapOrchestrator";
import { AuthGuard, AuthProvider } from "@/features/auth";
import { ThemeProvider } from "@/shared/components/ThemeContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/orchestrator" element={<RoadmapOrchestrator />} />

            {/* Protected Routes (Placeholders) */}
            <Route element={<AuthGuard />}>
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
