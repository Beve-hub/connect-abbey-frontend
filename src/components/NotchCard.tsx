// src/components/NotchCard.tsx
import type { CSSProperties, ReactNode, MouseEventHandler } from "react";
import { palette } from "../styles/theme";

interface NotchCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function NotchCard({ children, style, className = "", onClick }: NotchCardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: "relative",
        background: palette.card,
        borderRadius: 4,
        boxShadow: `4px 6px 0 ${palette.cardShadow}`,
        border: `1px solid ${palette.cardShadow}`,
        padding: "22px 24px 20px",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -2,
          left: 0,
          width: 200,
          height: 7,
          background: palette.ink,
          borderRadius: "0 0 6px 0px",
        }}
      />
      {children}
    </div>
  );
}