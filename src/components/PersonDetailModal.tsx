// src/components/PersonDetailModal.tsx
import Modal from "./Modal";
import Avatar from "./Avatar";
import Button from "./Button";
import { font, palette } from "../styles/theme";
import { useUserDetail } from "../hooks/useUsers";
import { useSendConnectionRequest } from "../hooks/useConnections";
import { toPersonSummary } from "../types/connection.types";
import type { DiscoverUser } from "../types/user.types";
import { FiX } from "react-icons/fi";

interface PersonDetailModalProps {
  userId: string | null;
  fallback?: DiscoverUser;
  onClose: () => void;
}

function statusLabel(status?: DiscoverUser["connectionStatus"]) {
  switch (status) {
    case "ACCEPTED":
      return "Already connected";
    case "PENDING_SENT":
      return "Request sent";
    case "PENDING_RECEIVED":
      return "Check your requests";
    default:
      return null;
  }
}

export default function PersonDetailModal({ userId, fallback, onClose }: PersonDetailModalProps) {
  const { data, isLoading } = useUserDetail(userId);
  const sendRequest = useSendConnectionRequest();

  const isOpen = !!userId;
  if (!isOpen) return null;

  const person = data?.user ?? fallback;
  const summary = person ? toPersonSummary(person) : null;
  const label = statusLabel(fallback?.connectionStatus);
  const isSending = sendRequest.isPending && sendRequest.variables === userId;
  const joinedAt = person && "createdAt" in person ? person.createdAt : undefined;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={440}>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          all: "unset",
          position: "absolute",
          top: 14,
          right: 14,
          cursor: "pointer",
          fontSize: 18,
          color: palette.faded,
        }}
      >
        <FiX />
      </button>

      <div style={{ padding: "28px 26px 24px" }}>
        {isLoading && !fallback ? (
          <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>Loading…</p>
        ) : person && summary ? (
          <>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
              <Avatar initials={summary.initials} size={56} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: font.display, fontSize: 22, color: palette.ink, fontWeight: 500 }}>
                  {summary.name}
                </div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: palette.rust, marginTop: 2 }}>
                  {summary.jobTitle || "—"}
                </div>
                {joinedAt && (
                  <div style={{ fontFamily: font.body, fontSize: 11.5, color: palette.faded, marginTop: 4 }}>
                    Joined {new Date(joinedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: font.body, fontSize: 12, color: palette.faded, marginBottom: 6 }}>
                About
              </div>
              <p style={{ fontFamily: font.body, fontSize: 13.5, lineHeight: 1.6, color: palette.inkSoft, margin: 0 }}>
                {person.profile?.bio || "This person hasn't written a bio yet."}
              </p>
            </div>

            {label ? (
              <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded, fontStyle: "italic" }}>
                {label}
              </div>
            ) : (
              <Button
                variant="primary"
                disabled={isSending}
                onClick={() => userId && sendRequest.mutate(userId)}
              >
                {isSending ? "Sending…" : "Connect"}
              </Button>
            )}
          </>
        ) : (
          <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
            Couldn't load this profile.
          </p>
        )}
      </div>
    </Modal>
  );
}