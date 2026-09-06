import { palette, font } from "../styles/theme";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  count?: string | number;
}

export default function SectionHeading({ eyebrow, title, count }: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ fontFamily: font.body, fontSize: 12.5, color: palette.faded, marginBottom: 4 }}>
        {eyebrow}
      </div>
      <h1
        style={{
          fontFamily: font.display,
          fontWeight: 500,
          fontSize: 30,
          color: palette.ink,
          margin: 0,
          display: "flex",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        {title}
        {count !== undefined && (
          <span style={{ fontSize: 16, color: palette.faded, fontFamily: font.body }}>{count}</span>
        )}
      </h1>
    </div>
  );
}
