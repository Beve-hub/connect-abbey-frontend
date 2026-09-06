import { useState } from "react";
import NotchCard from "../components/NotchCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { font, palette } from "../styles/theme";
import { CURRENT_USER } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ProfileView() {
  // Name/email come from the authenticated session (see AuthContext).
  // jobTitle/bio aren't part of the auth response — those live on the
  // separate Profile model (see profile.routes.ts) — so they're mocked
  // here as locally editable fields, seeded from CURRENT_USER.
  const { user } = useAuth();
  const [bio, setBio] = useState(CURRENT_USER.bio);

  if (!user) return null;

  return (
    <div>
      <SectionHeading eyebrow="How others see you" title="Your profile" />
      <NotchCard style={{ maxWidth: 480 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 18 }}>
          <Avatar initials={initialsFromName(user.name)} size={56} />
          <div>
            <div style={{ fontFamily: font.display, fontSize: 22, color: palette.ink, fontWeight: 500 }}>
              {user.name}
            </div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: palette.rust }}>
              {CURRENT_USER.jobTitle}
            </div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, marginTop: 2 }}>
              {user.email}
            </div>
          </div>
        </div>

        <label style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, display: "block", marginBottom: 4 }}>
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            fontFamily: font.body,
            fontSize: 13.5,
            color: palette.inkSoft,
            background: palette.cream,
            border: `1px solid ${palette.cardShadow}`,
            borderRadius: 3,
            padding: "10px 12px",
            resize: "none",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />
        <Button variant="primary">Save changes</Button>
      </NotchCard>
    </div>
  );
}
