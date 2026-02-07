import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoadmapOrchestrator from "./pages/RoadmapOrchestrator";
import { AuthGuard } from "@/shared/components/AuthGuard";
import { AuthProvider } from "@/features/auth/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route element={<AuthGuard />}>
            <Route path="/orchestrator" element={<RoadmapOrchestrator />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
