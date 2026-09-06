import { useState, type FormEvent } from "react";
import NotchCard from "../components/NotchCard";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { useAuth } from "../context/AuthContext";
import { palette, font } from "../styles/theme";
import type { AuthFormMode } from "../types";
import { validateLoginForm, validateSignupForm, type FieldErrors } from "../utils/authValidation";

export default function AuthView() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<AuthFormMode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  function resetFields() {
    setName("");
    setEmail("");
    setPassword("");
    setFieldErrors({});
    setFormError(null);
  }

  function switchMode(next: AuthFormMode) {
    setMode(next);
    resetFields();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    // Same rules the backend's zod schemas enforce (see authValidation.ts) —
    // catch obviously-invalid input before it ever reaches login/signup.
    const errors = isSignup ? validateSignupForm(email, password, name) : validateLoginForm(email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      if (isSignup) {
        await signup({ name, email, password });
      } else {
        await login({ email, password });
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
          <div style={{ fontFamily: font.display, fontSize: 20, color: palette.ink, marginBottom: 4 }}>
            {isSignup ? "Create your account" : "Welcome back"}
          </div>
          <div style={{ fontFamily: font.body, fontSize: 13, color: palette.faded, marginBottom: 20 }}>
            {isSignup ? "Takes less than a minute." : "Log in to see your connections."}
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <TextField
                label="Name"
                value={name}
                onChange={(v) => {
                  setName(v);
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Ada Lovelace"
                autoComplete="name"
                error={fieldErrors.name}
              />
            )}
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(v) => {
                setEmail(v);
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@example.com"
              autoComplete="email"
              error={fieldErrors.email}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(v) => {
                setPassword(v);
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder={isSignup ? "At least 8 characters" : "••••••••"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              error={fieldErrors.password}
            />

            {formError && (
              <div
                style={{
                  fontFamily: font.body,
                  fontSize: 12.5,
                  color: palette.clay,
                  background: "rgba(181, 75, 60, 0.08)",
                  border: `1px solid ${palette.clay}`,
                  borderRadius: 3,
                  padding: "8px 10px",
                  marginBottom: 16,
                }}
              >
                {formError}
              </div>
            )}

            <Button type="submit" variant="primary" disabled={submitting} style={{ width: "100%" }}>
              {submitting ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
            </Button>
          </form>

          <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded, marginTop: 18, textAlign: "center" }}>
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("login")}
                  style={{ all: "unset", cursor: "pointer", color: palette.rust, fontWeight: 600 }}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                New to Abbey?{" "}
                <button
                  onClick={() => switchMode("signup")}
                  style={{ all: "unset", cursor: "pointer", color: palette.rust, fontWeight: 600 }}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </NotchCard>

        {mode === "login" && (
          <div style={{ fontFamily: font.body, fontSize: 11.5, color: palette.faded, marginTop: 14, textAlign: "center" }}>
            Try the seeded account: victor@abbey.dev / SuperSecret123!
          </div>
        )}
      </div>
    </div>
  );
}
