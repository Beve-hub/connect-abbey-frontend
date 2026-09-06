import AuthView from "./views/AuthView";
import { palette } from "./styles/theme";
import { useAuth } from "./context/AuthContext";
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";



export default function App() {
  const { isAuthenticated, isHydrated} = useAuth();

  if (!isHydrated) {
    return <div style={{ minHeight: "100vh", background: palette.ink }} />;
  }

  if (!isAuthenticated ) {
  return (
   <AuthLayout>
        <AuthView />
      </AuthLayout>
  );
   }

   return <DashboardLayout />;
}
