import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import LoginPage    from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage     from "../pages/HomePage";
import TransferPage from "../pages/TransferPage";
import ProfilePage  from "../pages/ProfilePage";
import HistoryPage from "../pages/HistoryPage";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuthContext();

  if (loading) return null;

  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuthContext();

  if (loading) return null;

  return !token ? children : <Navigate to="/home" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Protected */}
      <Route path="/home"     element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/transfer" element={<ProtectedRoute><TransferPage /></ProtectedRoute>} />
      <Route path="/history"  element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
      <Route path="/profile"  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;