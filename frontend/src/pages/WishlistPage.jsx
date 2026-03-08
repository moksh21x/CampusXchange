import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { dummyProducts } from "../data/dummyProducts";
import { currentUser } from "../data/dummyUsers";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState(currentUser.wishlistIds);

  const wishlistProducts = dummyProducts.filter((p) => wishlistIds.includes(p.id));

  const removeFromWishlist = (id) => {
    setWishlistIds((prev) => prev.filter((wid) => wid !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f0f13]">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-pink-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">♥</span>
            <h1 className="text-3xl font-black text-white">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Wishlist</span>
            </h1>
          </div>
          <p className="text-white/40">
            {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">💔</div>
            <h2 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Start exploring the marketplace and save items you love. They'll appear here!
            </p>
            <Link
              to="/home"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-purple-500/25 text-sm"
            >
              Explore Marketplace →
            </Link>
          </div>
        ) : (
          <>
            {/* Summary row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20">
                  <p className="text-3xl font-black text-white">
                    ₹{wishlistProducts.reduce((s, p) => s + p.price, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-white/40 mt-1">Total if you buy everything</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-3xl font-black text-emerald-400">
                    ₹{wishlistProducts
                      .filter((p) => p.originalPrice > 0)
                      .reduce((s, p) => s + (p.originalPrice - p.price), 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-xs text-white/40 mt-1">Total savings vs original</p>
                </div>
              </div>
              <button
                onClick={() => setWishlistIds([])}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20"
              >
                Clear all
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard
                    product={{ ...product, wishlist: true }}
                    onWishlistToggle={(id, val) => { if (!val) removeFromWishlist(id); }}
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm shadow-lg shadow-pink-500/40 hover:scale-110 transition-transform"
                  >
                    ♥
                  </button>
                </div>
              ))}
            </div>

            {/* Browse more */}
            <div className="mt-12 text-center">
              <p className="text-white/40 mb-4 text-sm">Want to find more great deals?</p>
              <Link
                to="/home"
                className="inline-block px-8 py-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-semibold transition-all hover:scale-105 text-sm"
              >
                Continue Browsing →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
