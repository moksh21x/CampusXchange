import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-16 sm:px-16 sm:py-20 text-center">
          {/* Animated blobs */}
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#FF6B6B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/10 backdrop-blur-sm">
              🚀 Start for free — no credit card required
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Host Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6]">
                Own Event?
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join 5,000+ organizers who use AroundU to create, promote, and
              manage events that leave lasting impressions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/organizer"
                className="px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-2xl hover:shadow-[#FF6B6B]/30 hover:-translate-y-0.5 transition-all duration-300 text-base"
              >
                Start Organizing →
              </Link>
              <Link
                to="/events"
                className="px-8 py-4 rounded-2xl text-white font-medium border border-white/20 hover:bg-white/10 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300 text-base"
              >
                Browse Events
              </Link>
            </div>

            {/* Feature pills */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {[
                "✓ Free to list",
                "✓ Real-time analytics",
                "✓ Easy ticket management",
                "✓ 24/7 support",
              ].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
