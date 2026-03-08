import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[#0f0f13]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-800/10 to-pink-800/10 rounded-full blur-3xl" />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-sm font-medium text-white/70 mb-8 hover:bg-white/10 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now live across 50+ campuses in India
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
          <span className="text-white">Buy. Sell. </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            Exchange.
          </span>
          <br />
          <span className="text-white">All Inside Your </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Campus.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed text-center">
          The student-first marketplace to buy affordable books, sell used gadgets, and connect with fellow students — no shipping, no hassle.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/home"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-base shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Explore Marketplace →
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-semibold text-base transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Sell an Item
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { value: "12,000+", label: "Active Students" },
            { value: "₹45 Lakhs", label: "Worth Exchanged" },
            { value: "50+", label: "Campuses" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-white/20 animate-bounce">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
