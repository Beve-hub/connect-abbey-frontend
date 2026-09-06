import { useState } from "react";
import NotchCard from "../components/NotchCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { palette, font } from "../styles/theme";
import { PEOPLE } from "../data/mockData";

export default function DiscoverView() {
  // Local-only state standing in for a future POST /connections call.
  const [sentTo, setSentTo] = useState<Record<string, boolean>>({});

  return (
    <div>
      <SectionHeading eyebrow="Card catalog" title="People to meet" count={`${PEOPLE.length} profiles`} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {PEOPLE.map((person) => (
          <NotchCard key={person.id}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Avatar initials={person.initials} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: font.display, fontSize: 18, color: palette.ink, fontWeight: 500 }}>
                  {person.name}
                </div>
                <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.rust, marginTop: 1 }}>
                  {person.jobTitle}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: font.body, fontSize: 13.5, lineHeight: 1.5, color: palette.inkSoft, margin: "14px 0 18px" }}>
              {person.bio}
            </p>

            {sentTo[person.id] ? (
              <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded, fontStyle: "italic" }}>
                Request sent
              </div>
            ) : (
              <Button variant="primary" onClick={() => setSentTo((prev) => ({ ...prev, [person.id]: true }))}>
                Connect
              </Button>
            )}
          </NotchCard>
        ))}
      </div>
    </div>
  );
}
