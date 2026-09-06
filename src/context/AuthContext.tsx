import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { AuthSession, AuthUser, LoginCredentials, SignupCredentials } from "../types";
import { MOCK_ACCOUNTS } from "../data/mockData";

// ---------------------------------------------------------------------------
// This is a FRONTEND-ONLY MOCK of auth.controller.ts. There is no network
// call anywhere in this file. It exists so the UI can be built and tested
// against the exact response shapes and error messages the real API returns
// ({ user, accessToken, refreshToken } / the same 401 & 409 messages), so
// swapping in real `fetch("/auth/login", ...)` calls later needs no other
// changes to the app.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "abbey.mock-session";
const MOCK_DB_KEY = "abbey.mock-users";

interface MockStoredUser extends AuthUser {
  password: string;
}

function readMockUsers(): MockStoredUser[] {
  try {
    const raw = localStorage.getItem(MOCK_DB_KEY);
    if (!raw) return seedMockUsers();
    return JSON.parse(raw) as MockStoredUser[];
  } catch {
    return seedMockUsers();
  }
}

function seedMockUsers(): MockStoredUser[] {
  // Seeded from the single shared MOCK_ACCOUNTS list in data/mockData.ts,
  // so the credentials shown in the UI hint always match what actually works.
  const seeded: MockStoredUser[] = MOCK_ACCOUNTS.map((account) => ({ ...account }));
  localStorage.setItem(MOCK_DB_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeMockUsers(users: MockStoredUser[]) {
  localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
}

function fakeToken(prefix: string, userId: string) {
  return `${prefix}.${userId}.${Math.random().toString(36).slice(2)}`;
}

// Simulates request latency so loading states are real to build against.
function delay<T>(value: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isHydrated: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore a previous mock session on load, the same way the real app
  // would rehydrate from a stored accessToken/refreshToken pair.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw) as AuthSession;
        setUser(session.user);
      }
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistSession = (session: AuthSession) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session.user);
  };

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const users = readMockUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      // Same generic message the real API returns for both "no such user"
      // and "wrong password", so the UI never leaks which one it was.
      if (!found || found.password !== password) {
        await delay(null, 300);
        throw new Error("Invalid email or password");
      }

      const session: AuthSession = {
        user: { id: found.id, email: found.email, name: found.name },
        accessToken: fakeToken("access", found.id),
        refreshToken: fakeToken("refresh", found.id),
      };
      await delay(session);
      persistSession(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const signup = useCallback(async ({ email, password, name }: SignupCredentials) => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const users = readMockUsers();
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (existing) {
        await delay(null, 300);
        // Matches the backend's exact 409 conflict message.
        throw new Error(
          "We couldn't create your account with those details. If you already have an account, try logging in instead."
        );
      }

      const newUser: MockStoredUser = { id: `u-${Date.now()}`, email, name, password };
      writeMockUsers([...users, newUser]);

      const session: AuthSession = {
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
        accessToken: fakeToken("access", newUser.id),
        refreshToken: fakeToken("refresh", newUser.id),
      };
      await delay(session);
      persistSession(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, isAuthenticating, isHydrated, error, login, signup, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
