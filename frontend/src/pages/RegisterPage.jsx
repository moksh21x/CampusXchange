import { useState } from "react";
import { Link } from "react-router-dom";

const colleges = [
  "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "NIT Trichy", "NIT Warangal", "BITS Pilani", "VIT Vellore", "IIIT Hyderabad",
  "DTU Delhi", "Manipal University", "Amity University", "Symbiosis Pune",
  "IISc Bangalore", "NLU Delhi", "IIM Ahmedabad", "Other",
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", college: "", password: "", confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const passwordMatch = form.password && form.confirmPassword && form.password === form.confirmPassword;
  const passwordMismatch = form.confirmPassword && form.password !== form.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f0f13] py-12">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/30">CX</div>
            <span className="font-bold text-xl text-white">Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Xchange</span></span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Join the community</h1>
          <p className="text-white/50">Create your free account</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/15 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 text-white font-medium text-sm transition-all duration-200 hover:scale-[1.01] mb-6">
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.8 5.4 2.9 13.3l7.8 6C12.4 13.3 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.9 37.5 46.5 31.4 46.5 24.5z"/>
              <path fill="#FBBC05" d="M10.7 28.7A14.5 14.5 0 019.5 24c0-1.6.3-3.2.7-4.7l-7.8-6A23.9 23.9 0 000 24c0 3.9.9 7.5 2.6 10.7l8.1-6z"/>
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.7 2.3-7.7 2.3-6.3 0-11.6-3.8-13.3-9.3l-8.1 6C6.8 42.6 14.7 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30 font-medium">or sign up with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Arjun Mehta"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">College Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@college.edu"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
            </div>

            {/* College */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">College / University</label>
              <select
                name="college"
                value={form.college}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 cursor-pointer appearance-none"
              >
                <option value="" disabled className="bg-gray-900">Select your college</option>
                {colleges.map((c) => (
                  <option key={c} value={c} className="bg-gray-900">{c}</option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-sm">
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  passwordMismatch
                    ? "border-red-500/60 focus:ring-red-500/20 focus:border-red-500/60"
                    : passwordMatch
                    ? "border-emerald-500/60 focus:ring-emerald-500/20 focus:border-emerald-500/60"
                    : "border-white/15 focus:border-purple-500/60 focus:ring-purple-500/20"
                }`}
              />
              {passwordMismatch && <p className="text-xs text-red-400 mt-1.5">Passwords do not match</p>}
              {passwordMatch && <p className="text-xs text-emerald-400 mt-1.5">✓ Passwords match</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" required className="mt-1 accent-purple-500 w-4 h-4" />
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                I agree to CampusXchange's{" "}
                <span className="text-purple-400 hover:text-purple-300">Terms of Service</span> and{" "}
                <span className="text-purple-400 hover:text-purple-300">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || passwordMismatch}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-purple-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
