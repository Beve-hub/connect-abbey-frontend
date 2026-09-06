import type { ReactNode } from "react";
import Avatar from "./Avatar";
import { palette, font } from "../styles/theme";
import type { PersonSummary } from "../types";

interface RequestRowProps {
  user: PersonSummary;
  meta: string;
  actions: ReactNode;
}

export default function RequestRow({ user, meta, actions }: RequestRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 4px",
        borderBottom: `1px solid ${palette.cardShadow}`,
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        <Avatar initials={user.initials} size={40} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: font.display, fontSize: 16.5, color: palette.ink }}>{user.name}</div>
          <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded }}>
            {user.jobTitle} · {meta}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>{actions}</div>
    </div>
  );
}
