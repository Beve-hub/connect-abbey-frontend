import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { palette } from "../styles/theme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}

export default function Modal({ isOpen, onClose, children, maxWidth = 480 }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 18, 16, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth,
          maxHeight: "88vh",
          overflowY: "auto",
          background: palette.card,
          borderRadius: 4,
          boxShadow: `4px 6px 0 ${palette.cardShadow}`,
          border: `1px solid ${palette.cardShadow}`,
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}