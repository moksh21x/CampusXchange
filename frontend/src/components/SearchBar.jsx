import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch, placeholder = "Search events, venues, artists…", initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/events?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-[#FF6B6B]/30 focus-within:border-[#FF6B6B]/50 transition-all duration-200">
        <div className="pl-2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm py-2 px-2"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); if (onSearch) onSearch(""); }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] hover:from-[#E85555] hover:to-[#FF6B6B] text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-md whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  );
}
