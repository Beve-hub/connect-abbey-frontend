// src/api/auth.api.ts
import axiosInstance from "./axiosInstance";
import type { LoginPayload, SignupPayload, User } from "../types/auth.types";

export async function signupRequest(payload: SignupPayload): Promise<{ user: User }> {
  const { data } = await axiosInstance.post<{ user: User }>("/auth/signup", payload);
  return data;
}

export async function loginRequest(payload: LoginPayload): Promise<{ user: User }> {
  const { data } = await axiosInstance.post<{ user: User }>("/auth/login", payload);
  return data;
}

export async function logoutRequest(): Promise<{ message: string }> {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
}

export async function fetchMe(): Promise<{ user: User }> {
  const { data } = await axiosInstance.get<{ user: User }>("/auth/me");
  return data;
}