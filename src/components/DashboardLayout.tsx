import { useState } from "react";
import { Outlet } from "react-router-dom";
import { palette, font } from "../styles/theme";
import NavRail from "./NavRail";
import { useIsMobile } from "../hooks/useIsMobile";
import { FiMenu } from "react-icons/fi";
import Logo from "../assets/Code_Generated_Image.png";
import { useAuth } from "../context/auth-context";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <div style={{ background: palette.soft }}>
      <div style={{ display: "flex", margin: "0 auto", minHeight: "100vh" }}>
        <NavRail
          user={user}
          onLogout={logout}
          isOpen={isMobile ? sidebarOpen : true}
          onClose={() => setSidebarOpen(false)}
          
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          {isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px",
                background: palette.white,
                borderBottom: `1px solid ${palette.cardShadow}`,
              }}
            >
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  fontSize: 22,
                  color: palette.black,
                }}
              >
                <FiMenu />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img src={Logo} alt="Abbey logo" style={{ width: 60 }} />
                <span style={{ fontFamily: font.body, fontSize: 16 }}>
                  Connect Abbey
                </span>
              </div>
            </div>
          )}
          <div style={{ padding: isMobile ? "20px 16px" : "40px 44px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
