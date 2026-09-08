import { useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "./Modal";
import Button from "./Button";
import { font, palette } from "../styles/theme";
import { useUpdateProfile } from "../hooks/useProfile";
import type { User } from "../types/auth.types";

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const fieldStyle = {
  width: "100%",
  fontFamily: font.body,
  fontSize: 13.5,
  color: palette.inkSoft,
  background: palette.cream,
  border: `1px solid ${palette.cardShadow}`,
  borderRadius: 3,
  padding: "9px 12px",
  boxSizing: "border-box" as const,
};

export default function EditProfileModal({ user, isOpen, onClose }: EditProfileModalProps) {
  const [name, setName] = useState(user.name ?? "");
  const [jobTitle, setJobTitle] = useState(user.profile?.jobTitle ?? "");
  const [bio, setBio] = useState(user.profile?.bio ?? "");

  const updateProfile = useUpdateProfile();

  const handleSubmit = () => {
    updateProfile.mutate(
      { name, jobTitle, bio },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={440}>
      <div style={{ padding: "24px 26px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <div style={{ fontFamily: font.display, fontSize: 20, color: palette.ink }}>
            Update profile
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              color: palette.faded,
              fontSize: 18,
            }}
          >
            <FiX />
          </button>
        </div>

        <label
          style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, display: "block", marginBottom: 4 }}
        >
          Name
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ ...fieldStyle, marginBottom: 14 }} />

        <label
          style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, display: "block", marginBottom: 4 }}
        >
          Job title
        </label>
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={{ ...fieldStyle, marginBottom: 14 }}
        />

        <label
          style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, display: "block", marginBottom: 4 }}
        >
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          style={{ ...fieldStyle, resize: "none", marginBottom: 18 }}
        />

        {updateProfile.isError && (
          <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.clay, marginBottom: 12 }}>
            Couldn't save your changes. Try again.
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button variant="ghost" onClick={onClose} disabled={updateProfile.isPending}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}