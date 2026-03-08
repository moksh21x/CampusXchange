import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onWishlistToggle }) {
  const [wishlisted, setWishlisted] = useState(product.wishlist || false);

  const handleWishlist = (e) => {
    e.preventDefault();
    const next = !wishlisted;
    setWishlisted(next);
    if (onWishlistToggle) onWishlistToggle(product.id, next);
  };

  const discount = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const conditionColors = {
    "Like New": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Good: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Fair: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Discount badge */}
          {discount && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold shadow-lg">
              -{discount}%
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              wishlisted
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40"
                : "bg-black/40 backdrop-blur-sm text-white/70 hover:bg-pink-500/20 hover:text-pink-400"
            }`}
          >
            {wishlisted ? "♥" : "♡"}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Condition */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              {product.category}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${conditionColors[product.condition] || conditionColors["Good"]}`}>
              {product.condition}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-white text-sm leading-tight mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-white">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > 0 && (
              <span className="text-xs text-white/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Seller */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={product.sellerAvatar} alt={product.seller} className="w-6 h-6 rounded-full bg-white/10" />
              <span className="text-xs text-white/60 truncate max-w-[100px]">{product.seller}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs text-white/60">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
