import { useState, type FormEvent } from "react";
import { useSignup } from "../../hooks/useAuth";
import {
  validateSignupForm,
  type FieldErrors,
} from "../../utils/authValidation";
import { font, palette } from "../../styles/theme";
import TextField from "../../components/TextField";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../../components/Button";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const signup = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errors = validateSignupForm(email, password, name);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    signup.mutate({ name, email, password });
  }

  const formError = signup.isError
    ? (() => {
        const error = signup.error as {
          response?: { data?: { error?: unknown } };
        };
        const message = error.response?.data?.error;
        return typeof message === "string"
          ? message
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
        Create your account
      </div>
      <div
        style={{
          fontFamily: font.body,
          fontSize: 13,
          color: palette.faded,
          marginBottom: 20,
        }}
      >
        Takes less than a minute.
      </div>

      <form onSubmit={handleSubmit}>
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
          disabled={signup.isPending}
          style={{ width: "100%" }}
        >
          {signup.isPending ? "Please wait…" : "Sign up"}
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
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          style={{
            all: "unset",
            cursor: "pointer",
            color: palette.rust,
            fontWeight: 600,
          }}
        >
          Log in
        </button>
      </div>
    </>
  );
}
