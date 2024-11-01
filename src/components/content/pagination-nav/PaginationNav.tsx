import Button from "@/components/inputs/button";
import { cn } from "@/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (newPage: number) => void;
  className?: string;
}
export function PaginationNav({
  currentPage,
  totalPages,
  onChange,
  className,
}: Readonly<PaginationProps>) {
  const pages = new Array(3)
    .fill(1)
    .map((_, i) => currentPage + i - 1)
    .filter((p) => p >= 1)
    .filter((p) => p <= totalPages);
  return (
    <div className={cn("flex gap-1 justify-center", className)}>
      {currentPage > 2 && (
        <Button type="button" onClick={() => onChange(1)}>
          {"<<"}
        </Button>
      )}

      {currentPage !== 1 && (
        <Button type="button" onClick={() => onChange(currentPage - 1)}>
          {"<"}
        </Button>
      )}
      {pages.map((page) => (
        <Button
          key={page}
          type={"button"}
          disabled={page === currentPage}
          onClick={() => onChange(page)}
        >
          {page}
        </Button>
      ))}
      {totalPages - currentPage > 0 && (
        <Button type="button" onClick={() => onChange(currentPage + 1)}>
          {">"}
        </Button>
      )}
      {totalPages - currentPage > 1 && (
        <Button type="button" onClick={() => onChange(totalPages)}>
          {">>"}
        </Button>
      )}
    </div>
  );
}
