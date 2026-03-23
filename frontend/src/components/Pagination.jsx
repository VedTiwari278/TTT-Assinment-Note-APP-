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
      <div className="flex items-center gap-1 text-sm">
        {/* Prev */}
        <Button
          onClick={onPrev}
          disabled={page <= 1 || isLoading}
          className="px-3 py-1 text-gray-600 hover:text-black disabled:opacity-40"
        >
          Prev
        </Button>

        {/* Numbers */}
        {pages.map((p) => (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={isLoading}
            className={`px-3 py-1 rounded-md transition
              ${
                p === page
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-black"
              }`}
          >
            {p}
          </Button>
        ))}

        {/* Next */}
        <Button
          onClick={onNext}
          disabled={page >= totalPages || isLoading}
          className="px-3 py-1 text-gray-600 hover:text-black disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
