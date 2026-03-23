import React from "react";

function NoDataFound({
  title = "No notes found",
  subtitle = "Try creating a new note or adjusting your search.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* Icon */}
      <div className="mb-3 text-4xl">🗒️</div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>

      {/* Subtitle */}
      <p className="mt-1 text-sm text-gray-500 max-w-sm">{subtitle}</p>
    </div>
  );
}

export default NoDataFound;
