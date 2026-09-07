import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers } from "../api/users.api";
import { queryKeys } from "../api/queryKeys";

export function useDiscoverUsers(search: string, page: number) {
  return useQuery({
    queryKey: queryKeys.users.discover(search, page),
    queryFn: () => fetchUsers(search, page),
    placeholderData: keepPreviousData,
  });
}