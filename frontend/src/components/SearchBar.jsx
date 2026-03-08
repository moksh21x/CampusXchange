import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ placeholder = "Search books, gadgets, laptops...", initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/home?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-purple-400 transition-colors duration-200">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-32 py-4 bg-white/5 border border-white/15 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-sm"
      />
      <button
        type="submit"
        className="absolute right-2 inset-y-2 px-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/25"
      >
        Search
      </button>
    </form>
  );
}
