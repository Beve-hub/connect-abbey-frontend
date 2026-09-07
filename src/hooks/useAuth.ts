import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, loginRequest, logoutRequest, signupRequest } from "../api/auth.api";
import { queryKeys } from "../api/queryKeys";
import type { LoginPayload, SignupPayload, User } from "../types/auth.types";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignupPayload) => signupRequest(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, { user: data.user });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, { user: data.user });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutRequest(),
    onSettled: () => {
     queryClient.clear();
     queryClient.setQueryData<{ user: User | null }>(queryKeys.auth.me, {
        user: null,
      });
    },
  });
}