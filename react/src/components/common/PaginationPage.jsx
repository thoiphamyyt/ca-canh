import { Button } from "@/components/ui/button";

export default function PaginationPage({ totalPages, page, setPage }) {
  return (
    <div className="mt-6 flex justify-center items-center gap-3">
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              onClick={() => setPage(i + 1)}
              variant={page === i + 1 ? "default" : "outline"}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
