import { useState } from "react";
import NotchCard from "../components/NotchCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import Pagination from "../components/Pagination";
import { palette, font } from "../styles/theme";
import { FiSearch } from "react-icons/fi";
import { useDiscoverUsers } from "../hooks/useUsers";
import {
  useConnections,
  useSendConnectionRequest,
} from "../hooks/useConnections";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useIsMobile } from "../hooks/useIsMobile";
import { toPersonSummary } from "../types/connection.types";
import type { DiscoverUser } from "../types/user.types";
import PersonDetailModal from "../components/PersonDetailModal";

function statusLabel(status: DiscoverUser["connectionStatus"]) {
  switch (status) {
    case "ACCEPTED":
      return "Already connected";
    case "PENDING_SENT":
      return "Request sent";
    case "PENDING_RECEIVED":
      return "Check your requests";
    default:
      return null;
  }
}

export default function DiscoverView() {
   const isMobile = useIsMobile();
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // moved up, order-independent anyway
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const { data, isLoading, isError, isFetching } = useDiscoverUsers(debouncedSearch, page);
  const sendRequest = useSendConnectionRequest();
  const { data: connectionsData, isLoading: connectionsLoading } = useConnections();

  const people = data?.users ?? [];              // <-- must exist before the line below
  const pagination = data?.pagination;
  const knownConnections = connectionsData?.connections ?? [];
  const selectedFallback = people.find((p) => p.id === selectedUserId); // <-- now safe

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "7fr 3fr",
        gap: isMobile ? 32 : 28,
        alignItems: "start",
      }}
    >
      {/* Left: main discovery grid — 70% */}
      <div>
        <SectionHeading
          eyebrow="Card catalog"
          title="People to meet"
          count={pagination ? `${pagination.totalCount} profiles` : undefined}
        />

        <div style={{ position: "relative", marginBottom: 22, maxWidth: 360 }}>
          <FiSearch
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: palette.faded,
            }}
          />
          <input
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name…"
            style={{
              width: "100%",
              fontFamily: font.body,
              fontSize: 13.5,
              color: palette.ink,
              background: palette.white,
              border: `1px solid ${palette.cardShadow}`,
              borderRadius: 3,
              padding: "9px 12px 9px 34px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {isLoading && (
          <p
            style={{
              fontFamily: font.body,
              fontSize: 13,
              color: palette.faded,
            }}
          >
            Loading people…
          </p>
        )}

        {isError && (
          <p
            style={{
              fontFamily: font.body,
              fontSize: 13,
              color: palette.faded,
            }}
          >
            Couldn't load people. Try again.
          </p>
        )}

        {!isLoading && !isError && people.length === 0 && (
          <p
            style={{
              fontFamily: font.body,
              fontSize: 13,
              color: palette.faded,
            }}
          >
            {debouncedSearch
              ? `No one matches "${debouncedSearch}".`
              : "No one to discover yet."}
          </p>
        )}

        <div
          style={{
            display: "grid",
            // minmax tuned so at least 3 columns fit across the 70% column
            // on a typical desktop width; wraps to fewer on narrower screens.
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: 18,
            opacity: isFetching ? 0.6 : 1,
            transition: "opacity 120ms ease",
          }}
        >
          {people.map((person) => {
            const summary = toPersonSummary(person);
            const isSending =
              sendRequest.isPending && sendRequest.variables === person.id;
            const label = statusLabel(person.connectionStatus);

            return (
              <NotchCard
                key={person.id}
                onClick={() => setSelectedUserId(person.id)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <Avatar initials={summary.initials} />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: font.display,
                        fontSize: 18,
                        color: palette.ink,
                        fontWeight: 500,
                      }}
                    >
                      {summary.name}
                    </div>
                    <div
                      style={{
                        fontFamily: font.body,
                        fontSize: 12.5,
                        color: palette.rust,
                        marginTop: 1,
                      }}
                    >
                      {summary.jobTitle}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: font.body,
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: palette.inkSoft,
                    margin: "14px 0 18px",
                  }}
                >
                  {person.profile?.bio ?? ""}
                </p>

                {label ? (
                  <div
                    style={{
                      fontFamily: font.body,
                      fontSize: 12.5,
                      color: palette.faded,
                      fontStyle: "italic",
                    }}
                  >
                    {label}
                  </div>
                ) : (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="primary"
                      disabled={isSending}
                      onClick={() => sendRequest.mutate(person.id)}
                    >
                      {isSending ? "Sending…" : "Connect"}
                    </Button>
                  </div>
                )}
              </NotchCard>
            );
          })}
        </div>

        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onPageChange={setPage}
          />
        )}
        <PersonDetailModal
  userId={selectedUserId}
  fallback={selectedFallback}
  onClose={() => setSelectedUserId(null)}
/>
      </div>

      {/* Right: people you already know — 30% */}
      <div>
        <div
          style={{
            fontFamily: font.body,
            fontSize: 13,
            fontWeight: 600,
            color: palette.ink,
            marginBottom: 14,
          }}
        >
          People you know ({knownConnections.length})
        </div>

        {connectionsLoading && (
          <p
            style={{
              fontFamily: font.body,
              fontSize: 12.5,
              color: palette.faded,
            }}
          >
            Loading…
          </p>
        )}

        {!connectionsLoading && knownConnections.length === 0 && (
          <p
            style={{
              fontFamily: font.body,
              fontSize: 12.5,
              color: palette.faded,
            }}
          >
            You haven't connected with anyone yet.
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxHeight: isMobile ? "none" : 560,
            overflowY: isMobile ? "visible" : "auto",
          }}
        >
          {knownConnections.map((connection) => {
            const summary = toPersonSummary(connection.user);
            return (
              <NotchCard
                key={connection.connectionId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                }}
              >
                <Avatar initials={summary.initials} size={36} />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: font.body,
                      fontSize: 13.5,
                      color: palette.ink,
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {summary.name}
                  </div>
                  <div
                    style={{
                      fontFamily: font.body,
                      fontSize: 11.5,
                      color: palette.faded,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {summary.jobTitle || "—"}
                  </div>
                </div>
              </NotchCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
