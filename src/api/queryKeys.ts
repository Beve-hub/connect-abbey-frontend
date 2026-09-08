export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  profile: {
    mine: ["profile", "me"] as const,
    byId: (id: string) => ["profile", id] as const,
    search: (q: string) => ["profile", "search", q] as const,
  },
  connections: {
    list: ["connections"] as const,
    pending: ["connections", "pending"] as const,
    sent: ["connections", "sent"] as const,
  },
  users: {
    discover: (search: string, page: number) =>
      ["users", "discover", search, page] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
};
