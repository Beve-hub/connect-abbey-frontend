// PublicOnlyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import LoadingScreen from "../components/LoadingScreen";

export default function PublicOnlyRoute() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}