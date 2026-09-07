import { font, palette } from "../styles/theme";
import Button from "./Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: 28,
      }}
    >
      <Button variant="ghost" disabled={!hasPreviousPage} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <span style={{ fontFamily: font.body, fontSize: 13, color: palette.faded }}>
        Page {page} of {totalPages}
      </span>
      <Button variant="ghost" disabled={!hasNextPage} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}