import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import ReviewCard from "../components/ReviewCard";
import { dummyProducts } from "../data/dummyProducts";
import { reviews } from "../data/dummyUsers";

const features = [
  {
    icon: "🛍️",
    title: "Buy from Students",
    description: "Find affordable textbooks, calculators, laptops, and gadgets listed by fellow students at your campus.",
    gradient: "from-purple-600/20 to-purple-600/5",
    border: "border-purple-500/20",
    tag: "Marketplace",
  },
  {
    icon: "💸",
    title: "Sell Easily",
    description: "List your item in under 2 minutes. Reach hundreds of students on your campus instantly.",
    gradient: "from-pink-600/20 to-pink-600/5",
    border: "border-pink-500/20",
    tag: "Fast Listing",
  },
  {
    icon: "♻️",
    title: "Affordable & Sustainable",
    description: "Why buy new when you can buy smart? Save money and reduce waste by giving items a second life.",
    gradient: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
    tag: "Eco Friendly",
  },
];

export default function LandingPage() {
  const previewProducts = dummyProducts.slice(0, 6);

  return (
    <div className="bg-[#0f0f13]">
      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">Why CampusXchange?</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Built for students, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">by students.</span></h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Everything you need to buy smarter and sell faster, all in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${f.gradient} border ${f.border} hover:scale-[1.02] transition-all duration-300 group overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="text-4xl mb-4">{f.icon}</div>
                <span className="inline-block text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">{f.tag}</span>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">Live Listings</span>
              <h2 className="text-4xl font-black text-white">Trending on Campus</h2>
            </div>
            <Link to="/home" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              View all <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder Mission */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-sm font-medium text-white/60 mb-10">
            🎓 Our Mission
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
            We built CampusXchange because <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">students deserve better.</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            During our college years, we spent thousands buying new textbooks that we used for one semester and never opened again. We watched students toss out perfectly good calculators and gadgets at the end of every year.
          </p>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">
            CampusXchange is our answer — a trusted, simple, campus-first marketplace where every student can save money, earn money, and contribute to a more sustainable campus culture.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=founder1" alt="Founder" className="w-12 h-12 rounded-full ring-2 ring-purple-500/40" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Aryan Kapoor</p>
                <p className="text-white/40 text-xs">Co-Founder, IIT Delhi '23</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=founder2" alt="Founder" className="w-12 h-12 rounded-full ring-2 ring-pink-500/40" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Shreya Nanda</p>
                <p className="text-white/40 text-xs">Co-Founder, NIT Trichy '23</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4 px-3 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">Student Reviews</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Students love it. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Here's why.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl shadow-purple-900/50">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Ready to start saving?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">Join thousands of students on your campus. Sign up free and start buying or selling today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-xl text-sm"
              >
                Create Free Account
              </Link>
              <Link
                to="/home"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-200 hover:scale-105 text-sm"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
