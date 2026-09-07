import { useState, type ReactNode } from "react";
import { useMe, useLogin as useLoginMutation, useSignup as useSignupMutation, useLogout as useLogoutMutation } from "../hooks/useAuth";
import type { LoginPayload, SignupPayload } from "../types/auth.types";
import { AuthContext, extractErrorMessage } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isFetched } = useMe();
  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const logoutMutation = useLogoutMutation();
  const [error, setError] = useState<string | null>(null);

  const isHydrated = isFetched;
  const user = data?.user ?? null;

  const login = async (credentials: LoginPayload) => {
    setError(null);
    try {
      await loginMutation.mutateAsync(credentials);
    } catch (err) {
      setError(extractErrorMessage(err));
      throw err;
    }
  };

  const signup = async (credentials: SignupPayload) => {
    setError(null);
    try {
      await signupMutation.mutateAsync(credentials);
    } catch (err) {
      setError(extractErrorMessage(err));
      throw err;
    }
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthenticating: loginMutation.isPending || signupMutation.isPending,
        isHydrated,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}