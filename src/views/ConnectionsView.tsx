import NotchCard from "../components/NotchCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { font, palette } from "../styles/theme";
import { useConnections, useRemoveConnection } from "../hooks/useConnections";
import { toPersonSummary } from "../types/connection.types";

export default function ConnectionsView() {
  const { data, isLoading, isError } = useConnections();
  const removeConnection = useRemoveConnection();

  const connections = data?.connections ?? [];

  return (
    <div>
      <SectionHeading eyebrow="Your rolodex" title="Connections" count={connections.length} />

      {isLoading && (
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
          Loading connections…
        </p>
      )}

      {isError && (
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
          Couldn't load your connections. Try refreshing.
        </p>
      )}

      {!isLoading && !isError && connections.length === 0 && (
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
          No connections yet — head to Discover to find people.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {connections.map((connection) => {
          const summary = toPersonSummary(connection.user);
          return (
            <NotchCard
              key={connection.connectionId}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar initials={summary.initials} />
                <div>
                  <div style={{ fontFamily: font.display, fontSize: 18, color: palette.ink }}>
                    {summary.name}
                  </div>
                  <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded }}>
                    {summary.jobTitle || "—"} ·{" "}
                    {new Date(connection.connectedSince).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                disabled={removeConnection.isPending}
                onClick={() => removeConnection.mutate(connection.connectionId)}
              >
                Remove
              </Button>
            </NotchCard>
          );
        })}
      </div>
    </div>
  );
}