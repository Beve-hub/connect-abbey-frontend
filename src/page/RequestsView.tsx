import NotchCard from "../components/NotchCard";
import RequestRow from "../components/RequestRow";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { font, palette } from "../styles/theme";
import { toPersonSummary } from "../types/connection.types";
import {
  usePendingRequests,
  useSentRequests,
  useRespondToRequest,
} from "../hooks/useConnections";

export default function RequestsView() {
  const { data: pendingData, isLoading: pendingLoading } = usePendingRequests();
  const { data: sentData, isLoading: sentLoading } = useSentRequests();
  const respond = useRespondToRequest();

  const pending = pendingData?.requests ?? [];
  const sent = sentData?.requests ?? [];

  return (
    <div>
      <SectionHeading eyebrow="Awaiting a decision" title="Requests" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <NotchCard style={{ padding: "22px 22px 8px" }}>
          <div
            style={{
              fontFamily: font.body,
              fontSize: 13,
              fontWeight: 600,
              color: palette.ink,
              marginBottom: 6,
            }}
          >
            Incoming ({pending.length})
          </div>

          {pendingLoading ? (
            <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded, padding: "14px 0" }}>
              Loading…
            </p>
          ) : pending.length === 0 ? (
            <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded, padding: "14px 0" }}>
              Nothing waiting on you right now.
            </p>
          ) : (
            pending.map((request) => (
              <RequestRow
                key={request.connectionId}
                user={toPersonSummary(request.user)}
                meta={`Requested ${new Date(request.requestedAt).toLocaleDateString()}`}
                actions={
                  <>
                    <Button
                      variant="success"
                      disabled={respond.isPending}
                      onClick={() =>
                        respond.mutate({ connectionId: request.connectionId, action: "ACCEPT" })
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      disabled={respond.isPending}
                      onClick={() =>
                        respond.mutate({ connectionId: request.connectionId, action: "REJECT" })
                      }
                    >
                      Decline
                    </Button>
                  </>
                }
              />
            ))
          )}
        </NotchCard>

        <NotchCard style={{ padding: "22px 22px 8px" }}>
          <div
            style={{
              fontFamily: font.body,
              fontSize: 13,
              fontWeight: 600,
              color: palette.ink,
              marginBottom: 6,
            }}
          >
            Sent ({sent.length})
          </div>

          {sentLoading ? (
            <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded, padding: "14px 0" }}>
              Loading…
            </p>
          ) : sent.length === 0 ? (
            <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded, padding: "14px 0" }}>
              No pending outgoing requests.
            </p>
          ) : (
            sent.map((request) => (
              <RequestRow
                key={request.connectionId}
                user={toPersonSummary(request.user)}
                meta={`Sent ${new Date(request.requestedAt).toLocaleDateString()}`}
                actions={
                  <span
                    style={{
                      fontFamily: font.body,
                      fontSize: 12.5,
                      color: palette.faded,
                      fontStyle: "italic",
                    }}
                  >
                    Waiting for reply
                  </span>
                }
              />
            ))
          )}
        </NotchCard>
      </div>
    </div>
  );
}