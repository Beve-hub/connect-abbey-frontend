// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import LoadingScreen from "../components/LoadingScreen";

export default function ProtectedRoute() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) return <LoadingScreen label="Loading" />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}