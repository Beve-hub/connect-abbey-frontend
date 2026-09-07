export type ConnectionStatus = "NONE" | "PENDING_SENT" | "PENDING_RECEIVED" | "ACCEPTED";

export interface DiscoverUser {
  id: string;
  name: string;
  profile?: {
    jobTitle?: string | null;
    bio?: string | null;
  } | null;
  connectionStatus: ConnectionStatus;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface DiscoverUsersResponse {
  users: DiscoverUser[];
  pagination: Pagination;
}