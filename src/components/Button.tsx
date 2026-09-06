import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { palette, font } from "../styles/theme";
import type { ButtonVariant } from "../types";

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: { background: palette.rust, color: palette.cream, border: `1px solid ${palette.rust}` },
  ghost: { background: "transparent", color: palette.ink, border: `1px solid ${palette.ink}` },
  danger: { background: "transparent", color: palette.clay, border: `1px solid ${palette.clay}` },
  success: { background: palette.moss, color: palette.cream, border: `1px solid ${palette.moss}` },
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  style?: CSSProperties;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  style,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: font.body,
        fontSize: 13.5,
        fontWeight: 500,
        padding: "8px 16px",
        borderRadius: 3,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.7 : 1,
        transition: "transform 120ms ease, opacity 120ms ease",
        ...VARIANTS[variant],
        ...style,
      }}
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
      }}
      onMouseUp={(e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}
