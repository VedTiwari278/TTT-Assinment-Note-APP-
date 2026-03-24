import Button from "./ui/Button";

function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
  isLoading = false,
}) {
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
        <Button
          onClick={onPrev}
          disabled={page <= 1 || isLoading}
          className="px-2.5 py-1 text-xs text-gray-600 hover:text-black disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          Prev
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={isLoading}
            className={`rounded-md px-2.5 py-1 text-xs transition sm:px-3 sm:text-sm
              ${
                p === page
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-black"
              }`}
          >
            {p}
          </Button>
        ))}

        <Button
          onClick={onNext}
          disabled={page >= totalPages || isLoading}
          className="px-2.5 py-1 text-xs text-gray-600 hover:text-black disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
