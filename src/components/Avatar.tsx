import { palette, font } from "../styles/theme";

interface AvatarProps {
  initials: string;
  size?: number;
}

export default function Avatar({ initials, size = 44 }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: palette.ink,
        color: palette.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font.body,
        fontWeight: 600,
        fontSize: size * 0.36,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
