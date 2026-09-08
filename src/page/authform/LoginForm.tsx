// src/components/LoginForm.tsx
import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/useAuth";
import {
  validateLoginForm,
  type FieldErrors,
} from "../../utils/authValidation";
import { font, palette } from "../../styles/theme";
import TextField from "../../components/TextField";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../../components/Button";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errors = validateLoginForm(email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    login.mutate({ email, password });
  }

  const formError = login.isError
    ? (() => {
        const error = login.error as unknown as {
          response?: { data?: { error?: unknown } };
        };
        return typeof error.response?.data?.error === "string"
          ? error.response.data.error
          : "Something went wrong. Try again.";
      })()
    : null;

  return (
    <>
      <div
        style={{
          fontFamily: font.display,
          fontSize: 20,
          color: palette.ink,
          marginBottom: 4,
        }}
      >
        Welcome back
      </div>
      <div
        style={{
          fontFamily: font.body,
          fontSize: 13,
          color: palette.faded,
          marginBottom: 20,
        }}
      >
        Log in to see your connections.
      </div>

      <form onSubmit={handleSubmit}>
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

        <div style={{ position: "relative" }}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(v) => {
              setPassword(v);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="••••••••"
            autoComplete="current-password"
            error={fieldErrors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              all: "unset",
              position: "absolute",
              right: 10,
              top: 34, // adjust to align with input row, below the label
              cursor: "pointer",
              color: palette.faded,
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
          </button>
        </div>

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

        <Button
          type="submit"
          variant="primary"
          disabled={login.isPending}
          style={{ width: "100%" }}
        >
          {login.isPending ? "Please wait…" : "Log in"}
        </Button>
      </form>

      <div
        style={{
          fontFamily: font.body,
          fontSize: 12.5,
          color: palette.faded,
          marginTop: 18,
          textAlign: "center",
        }}
      >
        New to Abbey?{" "}
        <button
          onClick={onSwitchToSignup}
          style={{
            all: "unset",
            cursor: "pointer",
            color: palette.rust,
            fontWeight: 600,
          }}
        >
          Sign up
        </button>
      </div>
    </>
  );
}
