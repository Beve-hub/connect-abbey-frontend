import type { ChangeEvent } from "react";
import { palette, font } from "../styles/theme";

interface TextFieldProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

export default function TextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: TextFieldProps) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, display: "block", marginBottom: 5 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={{
          width: "100%",
          fontFamily: font.body,
          fontSize: 14,
          color: palette.ink,
          background: palette.cream,
          border: `1px solid ${error ? palette.clay : palette.cardShadow}`,
          borderRadius: 3,
          padding: "10px 12px",
          boxSizing: "border-box",
        }}
      />
      {error && (
        <div style={{ fontFamily: font.body, fontSize: 12, color: palette.clay, marginTop: 5 }}>{error}</div>
      )}
    </div>
  );
}
