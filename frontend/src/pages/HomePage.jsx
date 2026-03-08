import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { dummyProducts, categories } from "../data/dummyProducts";

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Top Rated"];
const conditions = ["All", "Like New", "Good", "Fair"];

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCondition, setActiveCondition] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [products, setProducts] = useState(dummyProducts);

  useEffect(() => {
    let filtered = [...dummyProducts];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (activeCondition !== "All") {
      filtered = filtered.filter((p) => p.condition === activeCondition);
    }

    if (sortBy === "Price: Low to High") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "Top Rated") filtered.sort((a, b) => b.rating - a.rating);
    else filtered.sort((a, b) => a.postedDays - b.postedDays);

    setProducts(filtered);
  }, [search, activeCategory, activeCondition, sortBy]);

  return (
    <div className="min-h-screen bg-[#0f0f13]">
      {/* Page Header */}
      <div className="relative pt-10 pb-10 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Marketplace</span>
          </h1>
          <p className="text-white/50 mb-8">Discover great deals from students at your campus</p>
          <SearchBar initialValue={search} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("All")}
            className={`shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 hover:scale-105 ${
              activeCategory === "All"
                ? "border-purple-500/60 bg-gradient-to-br from-purple-600/30 to-purple-600/10 text-white shadow-lg shadow-purple-500/20"
                : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            🌐 All
          </button>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              active={activeCategory === cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? "All" : cat.name)}
            />
          ))}
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 font-medium uppercase tracking-widest">Condition:</span>
            <div className="flex gap-2">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCondition(c)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all duration-200 ${
                    activeCondition === c
                      ? "bg-white text-gray-900 border-white"
                      : "bg-white/5 text-white/60 border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-white/40 font-medium uppercase tracking-widest">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500/50 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-white/40">
            {products.length} item{products.length !== 1 ? "s" : ""} found
            {search && <span> for "<span className="text-white/70">{search}</span>"</span>}
          </p>
          {(search || activeCategory !== "All" || activeCondition !== "All") && (
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setActiveCondition("All"); }}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
            <p className="text-white/50">Try a different search term or browse all categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
