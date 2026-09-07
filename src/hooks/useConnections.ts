import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import {
  fetchConnections,
  fetchPendingRequests,
  fetchSentRequests,
  sendConnectionRequest,
  respondToConnectionRequest,
  removeConnection,
} from "../api/connections.api";
import type { ConnectionActionType } from "../types/connection.types";

export function useConnections() {
  return useQuery({
    queryKey: queryKeys.connections.list,
    queryFn: fetchConnections,
  });
}

export function usePendingRequests() {
  return useQuery({
    queryKey: queryKeys.connections.pending,
    queryFn: fetchPendingRequests,
  });
}

export function useSentRequests() {
  return useQuery({
    queryKey: queryKeys.connections.sent,
    queryFn: fetchSentRequests,
  });
}

export function useSendConnectionRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addresseeId: string) => sendConnectionRequest(addresseeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.connections.sent });
      queryClient.invalidateQueries({ queryKey: ["users", "discover"] }); // matches all search/page variants
    },
  });
}

export function useRespondToRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      connectionId,
      action,
    }: {
      connectionId: string;
      action: ConnectionActionType;
    }) => respondToConnectionRequest(connectionId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.connections.pending });
      queryClient.invalidateQueries({ queryKey: queryKeys.connections.list });
      queryClient.invalidateQueries({ queryKey: ["users", "discover"] });
    },
  });
}

export function useRemoveConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connectionId: string) => removeConnection(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.connections.list });
      queryClient.invalidateQueries({ queryKey: ["users", "discover"] });
    },
  });
}