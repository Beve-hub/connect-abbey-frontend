
import { useState } from "react";
import NotchCard from "../components/NotchCard";
import { palette } from "../styles/theme";
import type { AuthFormMode } from "../types";
import LoginForm from "./authform/LoginForm";
import SignupForm from "./authform/SignupForm";

export default function AuthView() {
  const [mode, setMode] = useState<AuthFormMode>("login");

  return (
    <div
      style={{
        background: palette.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <NotchCard>
          {mode === "login" ? (
            <LoginForm onSwitchToSignup={() => setMode("signup")} />
          ) : (
            <SignupForm onSwitchToLogin={() => setMode("login")} />
          )}
        </NotchCard>

        
      </div>
    </div>
  );
}