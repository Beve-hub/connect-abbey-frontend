import { createContext, useContext } from "react";
import { AxiosError } from "axios";
import type { AuthUser } from "../types";
import type { LoginPayload, SignupPayload } from "../types/auth.types";

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isHydrated: boolean;
  error: string | null;
  login: (credentials: LoginPayload) => Promise<void>;
  signup: (credentials: SignupPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as { error?: unknown } | undefined;
    if (typeof data?.error === "string") return data.error;
  }
  return "Something went wrong";
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}