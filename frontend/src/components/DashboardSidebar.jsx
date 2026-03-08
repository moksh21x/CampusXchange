import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "My Listings", icon: "📦", path: "/dashboard" },
  { label: "Add Product", icon: "➕", path: "/dashboard?tab=add" },
  { label: "Wishlist", icon: "♥", path: "/wishlist" },
  { label: "Messages", icon: "💬", path: "/dashboard?tab=messages" },
  { label: "Profile", icon: "👤", path: "/dashboard?tab=profile" },
];

export default function DashboardSidebar({ activeTab, setActiveTab }) {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        {/* User info */}
        <div className="p-5 border-b border-white/10 bg-gradient-to-br from-purple-600/20 to-pink-600/10">
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
              alt="User Avatar"
              className="w-10 h-10 rounded-full ring-2 ring-purple-400/50"
            />
            <div>
              <p className="text-sm font-semibold text-white">Arjun Mehta</p>
              <p className="text-xs text-white/40">IIT Delhi</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab && setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-white border border-purple-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <span>🚪</span>
            Log out
          </Link>
        </div>
      </div>
    </aside>
  );
}
