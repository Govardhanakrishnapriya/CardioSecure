
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Prediction from "./pages/Prediction";
import Models from "./pages/Models";
import Explainability from "./pages/Explainability";
import FederatedLearning from "./pages/FederatedLearning";
import Privacy from "./pages/Privacy";
import History from "./pages/History";
import About from "./pages/About";
import Settings from "./pages/Settings";
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-3 text-slate-500">
          This page is being built.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>

      {/* Public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      {/* Other pages */}
      <Route
  path="/prediction"
  element={
    <ProtectedRoute>
      <Prediction />
    </ProtectedRoute>
  }
/>

      <Route
  path="/explainability"
  element={
    <ProtectedRoute>
      <Explainability />
    </ProtectedRoute>
  }
/>

<Route
  path="/models"
  element={
    <ProtectedRoute>
      <Models />
    </ProtectedRoute>
  }
/>

<Route
  path="/federated-learning"
  element={
    <ProtectedRoute>
      <FederatedLearning />
    </ProtectedRoute>
  }
/>

<Route
  path="/privacy"
  element={
    <ProtectedRoute>
      <Privacy />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

<Route
  path="/about"
  element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}