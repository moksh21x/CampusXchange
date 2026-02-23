import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { mockEvents } from "../data/mockEvents";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

const ITEMS_PER_PAGE = 6;

function applyFilters(events, filters, query) {
  let result = [...events];

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.category && filters.category !== "All") {
    result = result.filter((e) => e.category === filters.category);
  }

  switch (filters.priceRange) {
    case "free":
      result = result.filter((e) => e.price === 0);
      break;
    case "under500":
      result = result.filter((e) => e.price > 0 && e.price < 500);
      break;
    case "under2000":
      result = result.filter((e) => e.price >= 500 && e.price <= 2000);
      break;
    case "premium":
      result = result.filter((e) => e.price > 2000);
      break;
    default:
      break;
  }

  switch (filters.dateSort) {
    case "popular":
      result.sort((a, b) => b.attendees - a.attendees);
      break;
    case "priceLow":
      result.sort((a, b) => a.price - b.price);
      break;
    case "priceHigh":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return result;
}

export default function Events() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    priceRange: "all",
    dateSort: "soonest",
  });
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filtered = applyFilters(mockEvents, filters, query);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filters, query]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Explore Events</h1>
          <p className="text-gray-500 mb-6">
            {filtered.length} events found{query ? ` for "${query}"` : ""}
          </p>
          <div className="max-w-xl">
            <SearchBar
              onSearch={(q) => setQuery(q)}
              initialValue={query}
              placeholder="Search by name, location, category…"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {(filters.category !== "All" || filters.priceRange !== "all") && (
              <span className="w-2 h-2 bg-[#FF6B6B] rounded-full" />
            )}
          </button>
          {showMobileFilter && (
            <div className="mt-3">
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filter (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>
          </div>

          {/* Events Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setQuery(""); setFilters({ category: "All", priceRange: "all", dateSort: "soonest" }); }}
                  className="px-6 py-3 bg-[#FF6B6B] text-white rounded-xl font-medium hover:bg-[#E85555] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          p === page
                            ? "bg-[#FF6B6B] text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
