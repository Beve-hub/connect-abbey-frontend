import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUserById, fetchUsers } from "../api/users.api";
import { queryKeys } from "../api/queryKeys";

export function useDiscoverUsers(search: string, page: number) {
  return useQuery({
    queryKey: queryKeys.users.discover(search, page),
    queryFn: () => fetchUsers(search, page),
    placeholderData: keepPreviousData,
  });
}

export function useUserDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.users.detail(id ?? ""),
    queryFn: () => fetchUserById(id as string),
    enabled: !!id,
  });
}