import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

export default function PaginationPage({ totalPages, page, setPage }) {
  return (
    <div className="mt-6 flex justify-center items-center gap-3">
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-emerald-900/20"
          >
            <ArrowLeftToLine />
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              onClick={() => setPage(i + 1)}
              variant={page === i + 1 ? "default" : "outline"}
              className={`${
                page === i + 1
                  ? "bg-green-600 hover:bg-green-500 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  : "border-gray-300 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-emerald-900/20"
              }`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-emerald-900/20"
          >
            <ArrowRightToLine />
          </Button>
        </div>
      )}
    </div>
  );
}
