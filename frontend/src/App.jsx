import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NoteEditorPage from "./pages/NoteEditorPage";
import Overview from "./pages/Overview";
import NoteOverviewPage from "./pages/NoteOverviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
// import DashboardLayout from "./layouts/DashboardLayout";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen text-black">
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="overview" element={<Overview />} />
          <Route path="notes/new" element={<NoteEditorPage />} />
          <Route path="notes/:id/edit" element={<NoteEditorPage />} />
          <Route path="notes/:id/overview" element={<NoteOverviewPage />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
