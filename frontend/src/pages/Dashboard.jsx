import { useState } from "react";
import { Link } from "react-router-dom";
import { mockEvents, mockBookings, categoryColors } from "../data/mockEvents";

const user = {
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  avatar: "AM",
  joinDate: "January 2025",
};

export default function Dashboard() {
  const [bookings, setBookings] = useState(mockBookings);
  const [cancelId, setCancelId] = useState(null);

  const bookedEvents = bookings.map((b) => ({
    ...b,
    event: mockEvents.find((e) => e.id === b.eventId),
  })).filter((b) => b.event);

  const activeBookings = bookedEvents.filter((b) => b.status === "Confirmed");
  const pastBookings = bookedEvents.filter((b) => b.status === "Cancelled");

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
    setCancelId(null);
  };

  const stats = [
    { label: "Events Attended", value: activeBookings.length, icon: "🎟️", color: "from-[#FF6B6B] to-[#FF8E8E]" },
    { label: "Total Spent", value: `₹${bookedEvents.reduce((sum, b) => sum + b.paidAmount, 0).toLocaleString()}`, icon: "💳", color: "from-[#8B5CF6] to-[#A78BFA]" },
    { label: "Cities Explored", value: new Set(activeBookings.map((b) => b.event?.location.split(",").pop().trim())).size, icon: "🗺️", color: "from-[#3B82F6] to-[#60A5FA]" },
    { label: "Wishlist", value: 7, icon: "❤️", color: "from-amber-400 to-amber-300" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
              <p className="text-gray-500 text-sm">{user.email} · Member since {user.joinDate}</p>
            </div>
          </div>
          <Link
            to="/events"
            className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            + Explore Events
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-lg">Upcoming Events</h2>
                <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-600 rounded-full">
                  {activeBookings.length} confirmed
                </span>
              </div>

              {activeBookings.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="text-4xl mb-3">🎟️</div>
                  <p className="text-gray-500 text-sm">No upcoming bookings</p>
                  <Link to="/events" className="inline-block mt-4 px-4 py-2 bg-[#FF6B6B] text-white text-sm rounded-xl font-medium">
                    Browse Events
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="p-5 flex gap-4 hover:bg-gray-50 transition-colors group">
                      <Link to={`/events/${booking.event.id}`} className="flex-shrink-0">
                        <img
                          src={booking.event.image}
                          alt={booking.event.title}
                          className="w-20 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link to={`/events/${booking.event.id}`}>
                              <h3 className="font-semibold text-gray-900 text-sm hover:text-[#FF6B6B] transition-colors line-clamp-1">
                                {booking.event.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                              <span>🗓️ {new Date(booking.event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                              <span>📍 {booking.event.location.split(",")[0]}</span>
                              <span>🎟️ {booking.tickets} ticket{booking.tickets > 1 ? "s" : ""}</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${categoryColors[booking.event.category] || "bg-gray-100 text-gray-600"}`}>
                            {booking.event.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm font-bold text-gray-900">
                            {booking.paidAmount === 0 ? "Free" : `₹${booking.paidAmount.toLocaleString()}`}
                          </span>
                          <button
                            onClick={() => setCancelId(booking.id)}
                            className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors px-2 py-1 hover:bg-red-50 rounded-lg"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Booking History */}
            {pastBookings.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900 text-lg">Cancelled Bookings</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="p-5 flex gap-4 opacity-60">
                      <img src={booking.event.image} alt={booking.event.title} className="w-16 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-700 text-sm line-clamp-1">{booking.event.title}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                          <span>🗓️ {new Date(booking.event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                          <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full font-medium">Cancelled</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Name", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Member Since", value: user.joinDate },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-xl hover:border-[#FF6B6B]/30 hover:text-[#FF6B6B] transition-all">
                Edit Profile
              </button>
            </div>

            {/* Recommended */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recommended for You</h3>
              <div className="space-y-3">
                {mockEvents.slice(6, 9).map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className="flex gap-3 group">
                    <img src={event.image} alt={event.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#FF6B6B] transition-colors line-clamp-1">{event.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{event.price === 0 ? "Free" : `₹${event.price}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-3xl mb-4 text-center">⚠️</div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              This action cannot be undone. Your booking will be marked as cancelled.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-3 border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Keep It
              </button>
              <button
                onClick={() => handleCancel(cancelId)}
                className="flex-1 py-3 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
