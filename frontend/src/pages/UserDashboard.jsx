import { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { dummyProducts } from "../data/dummyProducts";
import { Link } from "react-router-dom";

const myListings = dummyProducts.slice(0, 4);

const stats = [
  { label: "Active Listings", value: "6", icon: "📦", color: "from-purple-600/30 to-purple-600/10", border: "border-purple-500/20" },
  { label: "Items Sold", value: "14", icon: "✅", color: "from-emerald-600/30 to-emerald-600/10", border: "border-emerald-500/20" },
  { label: "Total Earnings", value: "₹24,800", icon: "💰", color: "from-yellow-600/30 to-yellow-600/10", border: "border-yellow-500/20" },
  { label: "Profile Views", value: "342", icon: "👁", color: "from-cyan-600/30 to-cyan-600/10", border: "border-cyan-500/20" },
];

const addCategories = ["Books", "Gadgets", "Laptops", "Notes", "Electronics", "Stationery"];
const conditionOpts = ["Like New", "Good", "Fair"];

function MyListings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">My Listings</h2>
        <span className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">{myListings.length} active</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {myListings.map((p) => (
          <div key={p.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
            <img src={p.image} alt={p.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">{p.title}</p>
              <p className="text-xs text-white/40 mb-2">{p.category} · {p.condition}</p>
              <p className="text-base font-bold text-white mb-3">₹{p.price.toLocaleString()}</p>
              <div className="flex gap-2">
                <Link to={`/product/${p.id}`} className="text-xs px-3 py-1 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/20 hover:bg-purple-600/30 transition-all">View</Link>
                <button className="text-xs px-3 py-1 rounded-lg bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-all">Edit</button>
                <button className="text-xs px-3 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddProduct() {
  const [form, setForm] = useState({ title: "", category: "", price: "", condition: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">Listing Created!</h3>
        <p className="text-white/50 mb-6">Your item is now live on the marketplace.</p>
        <button onClick={() => setSuccess(false)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:scale-105 transition-all">
          Add Another Item
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Title</label>
          <input
            type="text"
            placeholder="e.g. Casio FX-991EX Calculator"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer"
            >
              <option value="" disabled className="bg-gray-900">Select</option>
              {addCategories.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Condition</label>
            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer"
            >
              <option value="" disabled className="bg-gray-900">Select</option>
              {conditionOpts.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Price (₹)</label>
          <input
            type="number"
            min="1"
            placeholder="500"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Description</label>
          <textarea
            rows={4}
            placeholder="Describe your item honestly — condition, age, any defects..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
          />
        </div>
        <div className="p-5 rounded-2xl border-2 border-dashed border-white/15 hover:border-purple-500/30 transition-all cursor-pointer text-center group">
          <div className="text-3xl mb-2">📷</div>
          <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Click to upload product images</p>
          <p className="text-xs text-white/30 mt-1">PNG, JPG, WebP up to 5MB</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all hover:scale-[1.01] shadow-lg shadow-purple-500/25 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Posting...</> : "Post Listing →"}
        </button>
      </form>
    </div>
  );
}

function Messages() {
  const messages = [
    { id: 1, user: "Priya Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", msg: "Hi! Is the calculator still available?", time: "2m ago", unread: true },
    { id: 2, user: "Karthik Raj", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik", msg: "Can you do ₹700 for the headphones?", time: "1h ago", unread: true },
    { id: 3, user: "Sneha Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha", msg: "Thanks for the smooth transaction!", time: "2d ago", unread: false },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Messages</h2>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] ${m.unread ? "bg-purple-600/10 border-purple-500/30" : "bg-white/5 border-white/10 hover:border-white/20"}`}>
            <img src={m.avatar} alt={m.user} className="w-10 h-10 rounded-full ring-2 ring-purple-500/30 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{m.user}</p>
              <p className="text-xs text-white/50 truncate">{m.msg}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-white/30">{m.time}</p>
              {m.unread && <span className="inline-block mt-1 w-2 h-2 rounded-full bg-purple-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  const [bio, setBio] = useState("3rd year CSE student. Selling books and gadgets I no longer need. Fast responses guaranteed!");
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">My Profile</h2>
      <div className="max-w-xl space-y-6">
        <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="Profile" className="w-20 h-20 rounded-full ring-4 ring-purple-500/30" />
          <div>
            <p className="text-lg font-bold text-white">Arjun Mehta</p>
            <p className="text-sm text-white/50">IIT Delhi · Joined Aug 2023</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-full">✓ Verified Student</span>
              <span className="text-xs text-yellow-400">★ 4.8</span>
            </div>
          </div>
        </div>
        {[["Full Name", "Arjun Mehta"], ["Email", "arjun.mehta@iitd.ac.in"], ["College", "IIT Delhi"]].map(([label, val]) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{label}</label>
            <input defaultValue={val} className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Bio</label>
          <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none" />
        </div>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/25">
          Save Changes
        </button>
      </div>
    </div>
  );
}

const tabComponents = {
  "My Listings": <MyListings />,
  "Add Product": <AddProduct />,
  "Messages": <Messages />,
  "Profile": <Profile />,
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("My Listings");

  return (
    <div className="min-h-screen bg-[#0f0f13]">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-white/40 mt-1">Manage your listings, messages, and profile</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className={`p-5 rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} transition-all hover:scale-[1.02]`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile tab bar */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["My Listings","Add Product","Messages","Profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/20 border-purple-500/40 text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 lg:p-8">
              {tabComponents[activeTab] || <MyListings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
