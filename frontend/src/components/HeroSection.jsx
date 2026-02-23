import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const floatingBadges = [
  { emoji: "🎵", label: "Music Festival", top: "20%", left: "5%", delay: "0s" },
  { emoji: "💼", label: "Startup Summit", top: "60%", right: "5%", delay: "0.3s" },
  { emoji: "🎨", label: "Art Expo", top: "80%", left: "8%", delay: "0.6s" },
  { emoji: "💻", label: "Hackathon", top: "25%", right: "8%", delay: "0.9s" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F9FAFB]">
      {/* Background blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-[#3B82F6]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating badges */}
      {floatingBadges.map((b, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 animate-bounce"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            animationDuration: "3s",
            animationDelay: b.delay,
          }}
        >
          <span className="text-xl">{b.emoji}</span>
          <span className="text-xs font-semibold text-gray-700">{b.label}</span>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-[#FF6B6B]/10 text-[#FF6B6B] px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-[#FF6B6B]/20">
            <span className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse" />
            200+ Live Events Near You
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] mb-6 tracking-tight">
            Discover What's{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6]">
                Happening
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C50 2 100 7 150 4.5C200 2 250 7 299 4.5" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>{" "}
            Around{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
              You
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            From underground concerts to tech conferences, wellness retreats to
            food carnivals — find your next experience right in your city.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar placeholder="Search events in Mumbai, Delhi, Bangalore…" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <span className="text-sm text-gray-400">Trending:</span>
            {["Music 🎵", "Tech 💻", "Food 🍜", "Wellness 🧘", "Free Events"].map((tag) => (
              <Link
                key={tag}
                to="/events"
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-[#FF6B6B]/40 hover:text-[#FF6B6B] transition-all duration-200 shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-xl hover:shadow-[#FF6B6B]/25 hover:-translate-y-0.5 transition-all duration-300 text-base"
            >
              Explore Events →
            </Link>
            <Link
              to="/organizer"
              className="px-8 py-4 rounded-2xl text-gray-700 font-semibold bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-base"
            >
              Host an Event
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-[#FF6B6B]", "bg-[#8B5CF6]", "bg-[#3B82F6]", "bg-amber-400"].map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>50,000+ happy attendees</span>
            </div>
            <span className="hidden sm:block text-gray-200">|</span>
            <div className="flex items-center gap-1">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-amber-400 text-base">{s}</span>
              ))}
              <span className="ml-1">4.9 average rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
