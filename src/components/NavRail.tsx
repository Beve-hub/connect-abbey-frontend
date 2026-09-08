import { useLocation, useNavigate } from "react-router-dom";
import { palette, font } from "../styles/theme";
import { NAV_ITEMS } from "../data/mockData";
import Avatar from "./Avatar";
import type { AuthUser } from "../types";
import Logo from "../assets/Code_Generated_Image.png";
import { FiLogOut, FiX } from "react-icons/fi";
import { useIsMobile } from "../hooks/useIsMobile";

interface NavRailProps {
  user: AuthUser;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function NavRail({ user, onLogout, isOpen, onClose }: NavRailProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40,
          }}
        />
      )}

      <div
        style={{
          width: 200,
          flexShrink: 0,
          background: palette.white,
          padding: "36px 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          ...(isMobile
            ? {
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 50,
                height: "100vh",
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.25s ease",
                boxShadow: isOpen ? "2px 0 12px rgba(0,0,0,0.15)" : "none",
              }
            : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              marginBottom: 24,
              position: "relative",
            }}
          >
            {isMobile && (
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  position: "absolute",
                  right: 12,
                  top: 0,
                  fontSize: 20,
                  color: palette.black,
                  display: "flex",
                }}
              >
                <FiX />
              </button>
            )}
            <img src={Logo} alt="Abbey logo" style={{ width: 60 }} />
            <p
              style={{
                fontFamily: font.body,
                fontSize: 20,
                color: palette.black,
                margin: 0,
              }}
            >
              Connect Abbey
            </p>
          </div>

          {NAV_ITEMS.map((item) => {
            // matches /dashboard/discover, /dashboard/profile/edit, etc.
            const active = location.pathname.startsWith(`/dashboard/${item.key}`);
            return (
              <button
                key={item.key}
                onClick={() => {
                  navigate(`/dashboard/${item.key}`);
                  if (isMobile) onClose();
                }}
                style={{
                  textAlign: "left",
                  padding: "13px 24px",
                  background: active ? palette.inkSoft : "transparent",
                  color: active ? palette.white : palette.black,
                  border: "none",
                  borderRadius: active ? "40px" : 0,
                  fontFamily: font.body,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            padding: "16px",
            background: palette.inkSoft,
            borderRadius: "10px",
            margin: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <Avatar initials={initialsFromName(user.name)} size={32} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 600,
                  color: palette.cream,
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  fontFamily: font.body,
                  fontSize: 11,
                  color: palette.faded,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              all: "unset",
              cursor: "pointer",
              fontFamily: font.body,
              fontSize: 12.5,
              color: palette.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 6,
              marginTop: 4,
              borderTop: `1px solid ${palette.cardShadow}`,
              width: "100%",
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            Log out
            <FiLogOut />
          </button>
        </div>
      </div>
    </>
  );
}