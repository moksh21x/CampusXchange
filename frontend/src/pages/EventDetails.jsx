import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockEvents, categoryColors } from "../data/mockEvents";

const mockReviews = [
  { id: 1, name: "Priya Sharma", avatar: "PS", rating: 5, comment: "Absolutely incredible experience! The event was perfectly organized, the venue was stunning, and the energy was electric. Highly recommend.", date: "2 weeks ago" },
  { id: 2, name: "Arjun Mehta", avatar: "AM", rating: 4, comment: "Great event overall. The keynote sessions were very insightful. Only small feedback: parking was a bit chaotic. Would definitely attend again.", date: "1 month ago" },
  { id: 3, name: "Kavya Nair", avatar: "KN", rating: 5, comment: "This event changed my perspective! Met amazing people, learned so much, and had the best time. Worth every rupee.", date: "1 month ago" },
];

function StarRating({ rating, size = "md" }) {
  const s = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${s} ${star <= rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);
  const [tickets, setTickets] = useState(1);

  const event = mockEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-500 mb-6">The event you're looking for doesn't exist.</p>
          <Link to="/events" className="px-6 py-3 bg-[#FF6B6B] text-white rounded-xl font-medium">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const colorClass = categoryColors[event.category] || "bg-gray-100 text-gray-700";
  const related = mockEvents.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Banner */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-black/50 transition-colors border border-white/10"
        >
          ← Back
        </button>
        <div className="absolute bottom-6 left-6">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${colorClass} mb-3`}>
            {event.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white max-w-2xl leading-tight">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Meta info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "🗓️", label: "Date & Time", value: `${new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} at ${event.time}` },
                  { icon: "📍", label: "Location", value: event.location },
                  { icon: "👤", label: "Organizer", value: event.organizer },
                  { icon: "👥", label: "Attendees", value: `${event.attendees.toLocaleString()} registered` },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-gray-800 font-medium text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {event.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(event.rating)} size="lg" />
                  <span className="font-bold text-gray-900 text-lg">{event.rating}</span>
                  <span className="text-gray-400 text-sm">({event.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-5">
                {mockReviews.map((review) => (
                  <div key={review.id} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                        <span className="text-gray-400 text-xs">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-3xl font-black text-gray-900">
                      {event.price === 0 ? "Free" : `₹${event.price.toLocaleString()}`}
                    </p>
                    {event.price > 0 && <p className="text-gray-400 text-sm">per ticket</p>}
                  </div>
                  <div className="text-right">
                    <StarRating rating={Math.round(event.rating)} />
                    <p className="text-xs text-gray-400 mt-0.5">{event.reviews} reviews</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5 mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Tickets</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTickets(Math.max(1, tickets - 1))}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900">{tickets}</span>
                    <button
                      onClick={() => setTickets(Math.min(10, tickets + 1))}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {event.price > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>₹{event.price.toLocaleString()} × {tickets}</span>
                      <span>₹{(event.price * tickets).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Platform fee</span>
                      <span>₹{Math.round(event.price * tickets * 0.05).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{Math.round(event.price * tickets * 1.05).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {booked ? (
                  <div className="text-center py-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="font-bold text-green-700">Booking Confirmed!</p>
                    <p className="text-green-600 text-sm mt-1">Check your dashboard for details</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setBooked(true)}
                    className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#FF6B6B]/25 hover:-translate-y-0.5 transition-all duration-200 text-base"
                  >
                    {event.price === 0 ? "Register for Free" : "Book Now"}
                  </button>
                )}

                <p className="text-center text-gray-400 text-xs mt-3">
                  No credit card required · Free cancellation
                </p>
              </div>

              {/* Share */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-700 mb-3">Share This Event</p>
                <div className="flex gap-2">
                  {["X", "FB", "WA", "LI"].map((s) => (
                    <button key={s} className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-600 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More {event.category} Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((e) => (
                <Link key={e.id} to={`/events/${e.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <img src={e.image} alt={e.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-[#FF6B6B] transition-colors line-clamp-1">{e.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{e.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
