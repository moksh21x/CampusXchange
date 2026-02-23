import { useState } from "react";
import { Link } from "react-router-dom";
import { mockEvents, categoryColors } from "../data/mockEvents";

const orgStats = [
  { label: "Total Events", value: 4, icon: "📅", color: "from-[#FF6B6B] to-[#FF8E8E]" },
  { label: "Total Bookings", value: 286, icon: "🎟️", color: "from-[#8B5CF6] to-[#A78BFA]" },
  { label: "Revenue (Mock)", value: "₹1.4L", icon: "💰", color: "from-[#3B82F6] to-[#60A5FA]" },
  { label: "Avg. Rating", value: "4.8", icon: "⭐", color: "from-amber-400 to-amber-300" },
];

const initialEvents = mockEvents.slice(0, 4).map((e, i) => ({
  ...e,
  bookings: [45, 120, 80, 41][i],
  revenue: [22455, 239880, 63920, 0][i],
  eventStatus: i < 3 ? "Active" : "Draft",
}));

export default function OrganizerDashboard() {
  const [events, setEvents] = useState(initialEvents);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", location: "", price: "", category: "Tech" });

  const handleCreate = (e) => {
    e.preventDefault();
    const newEvent = {
      ...form,
      id: Date.now(),
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      rating: 0,
      bookings: 0,
      revenue: 0,
      attendees: 0,
      eventStatus: "Draft",
      price: parseInt(form.price) || 0,
      organizer: "You",
      description: "New event description.",
      tags: [],
      time: "10:00 AM",
      reviews: 0,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setForm({ title: "", date: "", location: "", price: "", category: "Tech" });
    setShowCreate(false);
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDeleteId(null);
  };

  const toggleStatus = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, eventStatus: e.eventStatus === "Active" ? "Draft" : "Active" }
          : e
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your events and track performance</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#FF6B6B]/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {orgStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart (Visual Placeholder) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Revenue Overview</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">Last 6 months</span>
          </div>
          <div className="flex items-end gap-3 h-24">
            {[40, 65, 45, 80, 60, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-[#FF6B6B] to-[#8B5CF6] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-gray-400">
                  {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Your Events</h2>
            <span className="text-gray-400 text-sm">{events.length} events</span>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {["Event", "Date", "Bookings", "Revenue", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={event.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1 max-w-[200px]">{event.title}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[event.category] || "bg-gray-100 text-gray-600"}`}>
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] rounded-full"
                            style={{ width: `${Math.min((event.bookings / event.attendees) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{event.bookings}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      {event.revenue === 0 ? "—" : `₹${event.revenue.toLocaleString()}`}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleStatus(event.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          event.eventStatus === "Active"
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {event.eventStatus}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditId(event.id)}
                          className="px-3 py-1.5 text-xs font-medium text-[#8B5CF6] hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(event.id)}
                          className="px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {events.map((event) => (
              <div key={event.id} className="p-5">
                <div className="flex gap-3 mb-3">
                  <img src={event.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm line-clamp-1">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[event.category] || "bg-gray-100"}`}>{event.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${event.eventStatus === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{event.eventStatus}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{event.bookings} bookings</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditId(event.id)} className="text-[#8B5CF6] font-medium text-xs">Edit</button>
                    <button onClick={() => setDeleteId(event.id)} className="text-red-400 font-medium text-xs">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create New Event</h3>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {[
                { key: "title", label: "Event Title", type: "text" },
                { key: "date", label: "Date", type: "date" },
                { key: "location", label: "Location / Venue", type: "text" },
                { key: "price", label: "Ticket Price (₹ / 0 for Free)", type: "number" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 focus:border-[#FF6B6B]/50 transition-all"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/30"
                >
                  {["Tech", "Music", "Business", "Art", "Wellness", "Food", "Entertainment", "Sports"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-3 border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Toast (UI only) */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="text-4xl mb-3">✏️</div>
            <h3 className="font-bold text-gray-900 mb-2">Edit Event</h3>
            <p className="text-gray-500 text-sm mb-6">Full event editing functionality coming soon.</p>
            <button onClick={() => setEditId(null)} className="w-full py-3 bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] text-white rounded-xl font-medium">
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-3xl mb-4 text-center">🗑️</div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Event?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">This will permanently delete the event and all its bookings.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
