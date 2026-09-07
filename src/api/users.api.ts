import axiosInstance from "./axiosInstance";
import type { DiscoverUsersResponse } from "../types/user.types";
export async function fetchUsers(search: string, page: number) {
  const { data } = await axiosInstance.get<DiscoverUsersResponse>("/users", {
    params: {
      ...(search ? { search } : {}),
      page,
    },
  });
  return data;
}