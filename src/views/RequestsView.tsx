import { useState } from "react";
import NotchCard from "../components/NotchCard";
import RequestRow from "../components/RequestRow";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { font, palette } from "../styles/theme";
import { PENDING_REQUESTS, SENT_REQUESTS } from "../data/mockData";

export default function RequestsView() {
  // Local-only state standing in for a future PATCH /connections/:id call.
  const [pending, setPending] = useState(PENDING_REQUESTS);
  const [sent] = useState(SENT_REQUESTS);

  const respond = (connectionId: string) => {
    setPending((prev) => prev.filter((r) => r.connectionId !== connectionId));
  };

  return (
    <div>
      <SectionHeading eyebrow="Awaiting a decision" title="Requests" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <NotchCard style={{ padding: "22px 22px 8px" }}>
          <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: palette.ink, marginBottom: 6 }}>
            Incoming ({pending.length})
          </div>

          {pending.length === 0 ? (
            <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded, padding: "14px 0" }}>
              Nothing waiting on you right now.
            </p>
          ) : (
            pending.map((request) => (
              <RequestRow
                key={request.connectionId}
                user={request.user}
                meta={`Requested ${request.requestedAt}`}
                actions={
                  <>
                    <Button variant="success" onClick={() => respond(request.connectionId)}>
                      Accept
                    </Button>
                    <Button variant="danger" onClick={() => respond(request.connectionId)}>
                      Decline
                    </Button>
                  </>
                }
              />
            ))
          )}
        </NotchCard>

        <NotchCard style={{ padding: "22px 22px 8px" }}>
          <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: palette.ink, marginBottom: 6 }}>
            Sent ({sent.length})
          </div>

          {sent.map((request) => (
            <RequestRow
              key={request.connectionId}
              user={request.user}
              meta={`Sent ${request.requestedAt}`}
              actions={
                <span style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded, fontStyle: "italic" }}>
                  Waiting for reply
                </span>
              }
            />
          ))}
        </NotchCard>
      </div>
    </div>
  );
}
