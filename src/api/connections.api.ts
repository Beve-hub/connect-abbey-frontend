import axiosInstance from "./axiosInstance";
import type {
  Connection,
  PendingRequest,
  SentRequest,
  ConnectionActionType,
} from "../types/connection.types";

export async function sendConnectionRequest(addresseeId: string) {
  const { data } = await axiosInstance.post("/connections", { addresseeId });
  return data as { connection: Connection };
}

export async function respondToConnectionRequest(
  connectionId: string,
  action: ConnectionActionType
) {
  const { data } = await axiosInstance.patch(`/connections/${connectionId}`, { action });
  return data as { connection: Connection };
}

export async function removeConnection(connectionId: string): Promise<void> {
  await axiosInstance.delete(`/connections/${connectionId}`);
}

export async function fetchConnections() {
  const { data } = await axiosInstance.get("/connections");
  return data as { connections: Connection[] };
}

export async function fetchPendingRequests() {
  const { data } = await axiosInstance.get("/connections/pending");
  return data as { requests: PendingRequest[] };
}

export async function fetchSentRequests() {
  const { data } = await axiosInstance.get("/connections/sent");
  return data as { requests: SentRequest[] };
}