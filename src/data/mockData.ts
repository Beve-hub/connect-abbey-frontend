// Mock data only — nothing here calls the backend.
// Typed against src/types.ts, which mirrors the real API response shapes,
// so this can be swapped for real fetch results later with no type changes.

import type { Profile, PendingRequest, SentRequest, Connection, CurrentUser, NavItem } from "../types";

export const PEOPLE: Profile[] = [
  { id: "u1", name: "Adaeze Umeh", jobTitle: "Product Designer", bio: "Building calmer interfaces, one form at a time.", initials: "AU" },
  { id: "u2", name: "Tomiwa Bello", jobTitle: "Backend Engineer", bio: "Postgres, queues, and the occasional bad pun.", initials: "TB" },
  { id: "u3", name: "Grace Nwachukwu", jobTitle: "Product Manager", bio: "Ships small, ships often.", initials: "GN" },
  { id: "u4", name: "Femi Okonkwo", jobTitle: "Data Analyst", bio: "Turning spreadsheets into arguments people believe.", initials: "FO" },
];

export const PENDING_REQUESTS: PendingRequest[] = [
  {
    connectionId: "c1",
    requestedAt: "2 days ago",
    user: { name: "Bob Chukwu", jobTitle: "Frontend Engineer", initials: "BC" },
  },
];

export const SENT_REQUESTS: SentRequest[] = [
  {
    connectionId: "c2",
    requestedAt: "5 days ago",
    user: { name: "Ifeoma Ede", jobTitle: "UX Researcher", initials: "IE" },
  },
];

export const CONNECTIONS: Connection[] = [
  {
    connectionId: "c3",
    connectedSince: "Since Mar 2026",
    user: { name: "Chidi Anagor", jobTitle: "Engineering Manager", initials: "CA" },
  },
  {
    connectionId: "c4",
    connectedSince: "Since Jan 2026",
    user: { name: "Ngozi Eze", jobTitle: "Product Designer", initials: "NE" },
  },
];

// A tiny mock "database" so Login/Signup have something real to check against
// without calling the backend. Mirrors what a seeded users table would hold.
// NOTE: plaintext passwords only because this never leaves the browser mock —
// the real backend hashes with bcrypt (see auth.controller.ts).
export const MOCK_ACCOUNTS: Array<{ id: string; email: string; password: string; name: string }> = [
  { id: "u0", email: "victor@abbey.dev", password: "SuperSecret123!", name: "Victor" },
];

export const CURRENT_USER: CurrentUser = {
  name: "Victor",
  jobTitle: "Full-Stack Engineer",
  initials: "VC",
  bio: "Building Abbey's backend and the odd Postman collection along the way.",
};

export const NAV_ITEMS: NavItem[] = [
  { key: "discover", label: "Discover" },
  { key: "requests", label: "Requests" },
  { key: "connections", label: "Connections" },
  { key: "profile", label: "Profile" },
];