export interface ConnectionProfile {
  id: string;
  name: string;
  profile?: {
    jobTitle?: string | null;
    bio?: string | null;
  } | null;
}

export interface PersonSummary {
  name: string;
  jobTitle: string;
  initials: string;
}

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function toPersonSummary(profile: ConnectionProfile): PersonSummary {
  return {
    name: profile.name,
    jobTitle: profile.profile?.jobTitle ?? "",
    initials: initialsFromName(profile.name),
  };
}

export interface Connection {
  connectionId: string;
  connectedSince: string;
  user: ConnectionProfile;
}

export interface PendingRequest {
  connectionId: string;
  requestedAt: string;
  user: ConnectionProfile;
}

export interface SentRequest {
  connectionId: string;
  requestedAt: string;
  user: ConnectionProfile;
}

export type ConnectionActionType = "ACCEPT" | "REJECT";