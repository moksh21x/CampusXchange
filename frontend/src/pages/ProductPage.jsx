import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { dummyProducts } from "../data/dummyProducts";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const product = dummyProducts.find((p) => p.id === parseInt(id));
  const [wishlisted, setWishlisted] = useState(product?.wishlist || false);
  const [contacted, setContacted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f13]">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-white mb-2">Product not found</h2>
          <Link to="/home" className="text-purple-400 hover:text-purple-300 text-sm">← Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = dummyProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const conditionColors = {
    "Like New": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Good: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Fair: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  const discount = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#0f0f13] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
          <Link to="/home" className="hover:text-white transition-colors">Marketplace</Link>
          <span>›</span>
          <span className="text-purple-400">{product.category}</span>
          <span>›</span>
          <span className="text-white/70 truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[4/3]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold shadow-lg">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category + Condition */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                {product.category}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${conditionColors[product.condition] || conditionColors["Good"]}`}>
                {product.condition}
              </span>
              <span className="text-xs text-white/40 ml-auto">Posted {product.postedDays}d ago</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-white/20"}`}>★</span>
                ))}
              </div>
              <span className="text-sm font-semibold text-white">{product.rating}</span>
              <span className="text-xs text-white/40">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-4xl font-black text-white">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > 0 && (
                <>
                  <span className="text-lg text-white/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-white/60 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Seller Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Seller</h3>
              <div className="flex items-center gap-3">
                <img
                  src={product.sellerAvatar}
                  alt={product.seller}
                  className="w-12 h-12 rounded-full ring-2 ring-purple-500/30"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">{product.seller}</p>
                  <p className="text-xs text-white/40">{product.college}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-white/60">{product.rating} · Trusted Seller</span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Online" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setContacted(true)}
                className={`flex-1 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-lg ${
                  contacted
                    ? "bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25"
                }`}
              >
                {contacted ? "✓ Message Sent!" : "💬 Contact Seller"}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 ${
                  wishlisted
                    ? "bg-pink-500/20 border-pink-500/40 text-pink-400 shadow-lg shadow-pink-500/20"
                    : "bg-white/5 border-white/15 text-white/50 hover:border-pink-500/30 hover:text-pink-400"
                }`}
              >
                {wishlisted ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">More in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{product.category}</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
