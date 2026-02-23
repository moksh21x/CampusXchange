import { mockEvents } from "../data/mockEvents";
import EventCard from "../components/EventCard";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";

const categories = [
  { icon: "💻", label: "Tech", color: "bg-blue-50 text-blue-600 hover:bg-blue-100", border: "border-blue-100" },
  { icon: "🎵", label: "Music", color: "bg-purple-50 text-purple-600 hover:bg-purple-100", border: "border-purple-100" },
  { icon: "💼", label: "Business", color: "bg-amber-50 text-amber-600 hover:bg-amber-100", border: "border-amber-100" },
  { icon: "🎨", label: "Art", color: "bg-pink-50 text-pink-600 hover:bg-pink-100", border: "border-pink-100" },
  { icon: "🧘", label: "Wellness", color: "bg-green-50 text-green-600 hover:bg-green-100", border: "border-green-100" },
  { icon: "🍜", label: "Food", color: "bg-orange-50 text-orange-600 hover:bg-orange-100", border: "border-orange-100" },
  { icon: "😂", label: "Entertainment", color: "bg-red-50 text-red-600 hover:bg-red-100", border: "border-red-100" },
  { icon: "🏃", label: "Sports", color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100", border: "border-cyan-100" },
];

export default function Home() {
  const trending = mockEvents.slice(0, 6);

  return (
    <div>
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wider mb-1">Browse By Category</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What are you into?</h2>
            </div>
            <Link to="/events" className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
              All categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={`/events?category=${cat.label}`}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${cat.border} ${cat.color} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-semibold text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wider mb-1">🔥 Right Now</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trending Events</h2>
            </div>
            <Link to="/events" className="flex items-center gap-1 text-sm font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((event, i) => (
              <EventCard key={event.id} event={event} featured={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Feature Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wider mb-3">Why AroundU</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything you need to enjoy events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Discover Locally",
                desc: "Find events happening within your city or neighborhood with precise location filtering.",
                gradient: "from-[#FF6B6B]/10 to-[#FF8E8E]/5",
                accent: "text-[#FF6B6B]",
              },
              {
                icon: "⚡",
                title: "Instant Booking",
                desc: "Book your spot in seconds. Get digital tickets delivered straight to your inbox.",
                gradient: "from-[#8B5CF6]/10 to-[#A78BFA]/5",
                accent: "text-[#8B5CF6]",
              },
              {
                icon: "🧑‍💼",
                title: "Easy Organizing",
                desc: "Create and manage your events effortlessly. Track bookings, revenue, and attendees.",
                gradient: "from-[#3B82F6]/10 to-[#60A5FA]/5",
                accent: "text-[#3B82F6]",
              },
            ].map((f) => (
              <div key={f.title} className={`relative bg-gradient-to-br ${f.gradient} rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className={`text-lg font-bold ${f.accent} mb-3`}>{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
