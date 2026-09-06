// Design tokens for Abbey's "card catalog" visual identity.
// Keep every color/font reference here so the palette can change in one place.

export const palette = {
  primary: "#091F5C", // deep navy — brand color, page background, nav rail
  secondary: "#334DAF",
  soft: "#ecedf3",
  white: "#FFFFFF", // white — text on dark backgrounds, card surfaces
  black: "#000000", // black — text on light backgrounds
  ink: "#091F5C", // page/background navy (was near-black ink)
  inkSoft: "#1E2A55", // body text color on light card surfaces
  card: "#FFFFFF", // card surface (was warm cream)
  cardShadow: "#D7DEEE", // card border/shadow (cool blue-gray, was tan)
  rust: "#334DAF", // primary action color / CTA buttons (was terracotta)
  moss: "#2F9E6B", // success state — accept, connected
  clay: "#D64550", // danger state — decline, error
  faded: "#7C88A6", // muted secondary text (was warm gray)
  cream: "#F4F6FB", // light text on navy backgrounds (was warm cream)
} as const;

export const font = {
  display: "'Fraunces', serif",
  body: "'IBM Plex Sans', sans-serif",
} as const;

export type Palette = typeof palette;
export type Font = typeof font;
