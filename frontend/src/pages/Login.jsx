import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 800);
    }, 1200);
  };

  const isFilledOrFocused = (field) => focused === field || form[field];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] flex items-center justify-center p-4 pt-20">
      {/* Background decoration */}
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-[#FF6B6B]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#8B5CF6] flex items-center justify-center shadow-md">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Around<span className="text-[#FF6B6B]">U</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm">Sign in to continue discovering events</p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: "G", label: "Google", bg: "hover:bg-red-50 hover:border-red-100" },
              { icon: "in", label: "LinkedIn", bg: "hover:bg-blue-50 hover:border-blue-100" },
            ].map(({ icon, label, bg }) => (
              <button key={label} className={`flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 transition-all duration-200 ${bg}`}>
                <span className="font-bold">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 focus:border-[#FF6B6B]/50 transition-all"
                required
              />
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-400 ${isFilledOrFocused("email") ? "top-2 text-xs text-[#FF6B6B]" : "top-4 text-sm"}`}>
                Email address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 focus:border-[#FF6B6B]/50 transition-all"
                required
              />
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-400 ${isFilledOrFocused("password") ? "top-2 text-xs text-[#FF6B6B]" : "top-4 text-sm"}`}>
                Password
              </label>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#FF6B6B]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-[#FF6B6B] hover:text-[#E85555] font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 ${
                success
                  ? "bg-green-500 hover:bg-green-500"
                  : "bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#FF6B6B]/25 hover:-translate-y-0.5"
              } disabled:opacity-70 disabled:pointer-events-none`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : success ? (
                "✓ Signed In!"
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FF6B6B] hover:text-[#E85555] font-semibold transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
