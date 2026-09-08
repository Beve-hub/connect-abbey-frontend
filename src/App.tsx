import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthView from "./page/AuthView";
import DiscoverView from "./page/DiscoverView";
import RequestsView from "./page/RequestsView";
import ConnectionsView from "./page/ConnectionsView";
import ProfileView from "./page/ProfileView";
import ProfileEditRoute from './page/ProfileEditRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <AuthView />
              </AuthLayout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="discover" replace />} />
            <Route path="discover" element={<DiscoverView />} />
            <Route path="requests" element={<RequestsView />} />
            <Route path="connections" element={<ConnectionsView />} />
            <Route path="profile" element={<ProfileView />}>
              <Route path="edit" element={<ProfileEditRoute />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}