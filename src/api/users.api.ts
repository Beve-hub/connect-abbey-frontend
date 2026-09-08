import axiosInstance from "./axiosInstance";
import type { DiscoverUsersResponse, UserDetailResponse } from "../types/user.types";
export async function fetchUsers(search: string, page: number) {
  const { data } = await axiosInstance.get<DiscoverUsersResponse>("/users", {
    params: {
      ...(search ? { search } : {}),
      page,
    },
  });
  return data;
}

export async function fetchUserById(id: string) {
  const { data } = await axiosInstance.get<UserDetailResponse>(`/users/${id}`);
  return data;
}