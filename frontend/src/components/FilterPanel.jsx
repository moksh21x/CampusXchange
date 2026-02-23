import { categories } from "../data/mockEvents";

export default function FilterPanel({ filters, onChange }) {
  const { category = "All", priceRange = "all", dateSort = "soonest" } = filters;

  const update = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6">
      <h3 className="font-semibold text-gray-900 text-base">Filters</h3>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => update("category", cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                category === cat
                  ? "bg-[#FF6B6B] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price</p>
        <div className="space-y-2">
          {[
            { val: "all", label: "All prices" },
            { val: "free", label: "Free" },
            { val: "under500", label: "Under ₹500" },
            { val: "under2000", label: "₹500 – ₹2,000" },
            { val: "premium", label: "₹2,000+" },
          ].map(({ val, label }) => (
            <label key={val} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  priceRange === val
                    ? "border-[#FF6B6B] bg-[#FF6B6B]"
                    : "border-gray-300 group-hover:border-gray-400"
                }`}
                onClick={() => update("priceRange", val)}
              >
                {priceRange === val && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sort By</p>
        <select
          value={dateSort}
          onChange={(e) => update("dateSort", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 focus:border-[#FF6B6B]/50 transition-all"
        >
          <option value="soonest">Soonest First</option>
          <option value="popular">Most Popular</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({ category: "All", priceRange: "all", dateSort: "soonest" })}
        className="w-full py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF6B6B] border border-gray-200 rounded-xl hover:border-[#FF6B6B]/30 transition-all duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
}
