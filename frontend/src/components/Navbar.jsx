import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-200">
              CX
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Xchange</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/home" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium">Marketplace</Link>
            <Link to="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium">Dashboard</Link>
            <Link to="/wishlist" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium">Wishlist</Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 py-4 bg-black/40 backdrop-blur-xl border-t border-white/10 flex flex-col gap-3">
          <Link to="/home" onClick={() => setMenuOpen(false)} className="text-sm text-white/70 hover:text-white py-2 font-medium">Marketplace</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-white/70 hover:text-white py-2 font-medium">Dashboard</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-sm text-white/70 hover:text-white py-2 font-medium">Wishlist</Link>
          <div className="flex gap-3 pt-2">
            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-medium text-white py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all">Log in</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
