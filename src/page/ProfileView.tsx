import { Outlet, useNavigate } from "react-router-dom";
import NotchCard from "../components/NotchCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { font, palette } from "../styles/theme";
import { useMyProfile } from "../hooks/useProfile";
import { toPersonSummary } from "../types/connection.types";

export default function ProfileView() {
  const { data, isLoading, isError } = useMyProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div>
        <SectionHeading eyebrow="How others see you" title="Your profile" />
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
          Loading profile…
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <SectionHeading eyebrow="How others see you" title="Your profile" />
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
          Couldn't load your profile. Try refreshing.
        </p>
      </div>
    );
  }

  const user = data.user;
  const summary = toPersonSummary(user);

  return (
    <div>
      <SectionHeading eyebrow="How others see you" title="Your profile" />
      <NotchCard style={{ maxWidth: 480 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 22 }}>
          <Avatar initials={summary.initials} size={56} />
          <div>
            <div style={{ fontFamily: font.display, fontSize: 22, color: palette.ink, fontWeight: 500 }}>
              {user.name}
            </div>
            
          </div>
        </div>

        <div style={{ marginBottom: 22, background: palette.cream, padding: 12, borderRadius: 3 }}>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, marginBottom: 4 }}>
            Full Name
          </div>
          <div style={{ fontFamily: font.body, fontSize: 13.5, lineHeight: 1.5, color: palette.inkSoft }}>
            {user.name}
          </div>
        </div>
        <div style={{ marginBottom: 22, background: palette.cream, padding: 12, borderRadius: 3 }}>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, marginBottom: 4 }}>
            Email
          </div>
          <div style={{ fontFamily: font.body, fontSize: 13.5, lineHeight: 1.5, color: palette.inkSoft }}>
            {user.email}
          </div>
        </div>
        <div style={{ marginBottom: 22, background: palette.cream, padding: 12, borderRadius: 3 }}>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, marginBottom: 4 }}>
           Job Title
          </div>
          <div style={{ fontFamily: font.body, fontSize: 13.5, lineHeight: 1.5, color: palette.inkSoft }}>
            {user.profile?.jobTitle || "No job title set"}
          </div>
        </div>
        <div style={{ marginBottom: 22, background: palette.cream, padding: 12, borderRadius: 3 }}>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, marginBottom: 4 }}>
            Bio
          </div>
          <div style={{ fontFamily: font.body, fontSize: 13.5, lineHeight: 1.5, color: palette.inkSoft }}>
            {user.profile?.bio || "No bio yet."}
          </div>
        </div>
        

        <Button variant="primary" onClick={() => navigate("edit")}>
          Update profile
        </Button>
      </NotchCard>

      {/* Renders EditProfileModal when the URL is /dashboard/profile/edit */}
      <Outlet />
    </div>
  );
}