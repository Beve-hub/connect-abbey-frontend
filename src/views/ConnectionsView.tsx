import NotchCard from "../components/NotchCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { font, palette } from "../styles/theme";
import { CONNECTIONS } from "../data/mockData";

export default function ConnectionsView() {
  return (
    <div>
      <SectionHeading eyebrow="Your rolodex" title="Connections" count={CONNECTIONS.length} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {CONNECTIONS.map((connection) => (
          <NotchCard
            key={connection.connectionId}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Avatar initials={connection.user.initials} />
              <div>
                <div style={{ fontFamily: font.display, fontSize: 18, color: palette.ink }}>
                  {connection.user.name}
                </div>
                <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded }}>
                  {connection.user.jobTitle} · {connection.connectedSince}
                </div>
              </div>
            </div>
            <Button variant="ghost">Message</Button>
          </NotchCard>
        ))}
      </div>
    </div>
  );
}
