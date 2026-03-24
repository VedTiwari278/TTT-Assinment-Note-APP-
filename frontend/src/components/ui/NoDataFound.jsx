function NoDataFound({
  title = "No notes found",
  subtitle = "Try creating a new note or adjusting your search.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
      <div className="mb-3 text-4xl" aria-hidden="true">???</div>
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      <p className="mt-1 max-w-sm px-3 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

export default NoDataFound;

