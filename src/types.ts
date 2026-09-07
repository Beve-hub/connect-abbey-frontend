
export interface PersonSummary {
  name: string;
  jobTitle: string;
  initials: string;
}

export interface Profile extends PersonSummary {
  id: string;
  bio: string;
}

export interface PendingRequest {
  connectionId: string;
  requestedAt: string;
  user: PersonSummary;
}

export interface SentRequest {
  connectionId: string;
  requestedAt: string;
  user: PersonSummary;
}

export interface Connection {
  connectionId: string;
  connectedSince: string;
  user: PersonSummary;
}

export interface CurrentUser extends PersonSummary {
  bio: string;
}

export type TabKey = "discover" | "requests" | "connections" | "profile";

export interface NavItem {
  key: TabKey;
  label: string;
}

export type ButtonVariant = "primary" | "ghost" | "danger" | "success";


export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string; 
  name: string;
}

export type AuthFormMode = "login" | "signup";


