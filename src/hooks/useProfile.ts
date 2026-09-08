import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyProfile, updateMyProfile, type UpdateProfilePayload } from "../api/profile.api";
import { queryKeys } from "../api/queryKeys";

export function useMyProfile() {
  return useQuery({
    queryKey: queryKeys.profile.mine,
    queryFn: fetchMyProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMyProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile.mine, data);
      queryClient.setQueryData(queryKeys.auth.me, data); // keeps name in the nav/sidebar in sync too
    },
  });
}