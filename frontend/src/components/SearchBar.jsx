import { FiX } from "react-icons/fi";

function SearchBar({ value, onChange, onReset }) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-lg items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-2 pr-20 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:pr-10"
          />

          {value && (
            <button
              onClick={onReset}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              type="button"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
