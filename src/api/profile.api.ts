import axiosInstance from "./axiosInstance";
import type { User } from "../types/auth.types";

export interface UpdateProfilePayload {
  name?: string;
  jobTitle?: string;
  bio?: string;
  avatarUrl?: string | null;
}

export async function fetchMyProfile(): Promise<{ user: User }> {
  const { data } = await axiosInstance.get<{ user: User }>("/profile");
  return data;
}

export async function updateMyProfile(payload: UpdateProfilePayload): Promise<{ user: User }> {
  const { data } = await axiosInstance.put<{ user: User }>("/profile", payload);
  return data;
}