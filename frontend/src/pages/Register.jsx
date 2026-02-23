import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
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
    }, 1400);
  };

  const isFilledOrFocused = (field) => focused === field || form[field];

  const fields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "password", label: "Password", type: "password" },
    { key: "confirm", label: "Confirm Password", type: "password" },
  ];

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-green-500"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] flex items-center justify-center p-4 py-24">
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#FF6B6B]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#8B5CF6] flex items-center justify-center shadow-md">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Around<span className="text-[#FF6B6B]">U</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm">Join 50,000+ event enthusiasts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, type }) => (
              <div key={key} className="relative">
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  onFocus={() => setFocused(key)}
                  onBlur={() => setFocused("")}
                  className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6]/50 transition-all"
                  required
                />
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-400 ${isFilledOrFocused(key) ? "top-2 text-xs text-[#8B5CF6]" : "top-4 text-sm"}`}>
                  {label}
                </label>
              </div>
            ))}

            {/* Password Strength */}
            {form.password && (
              <div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : "bg-gray-200"}`} />
                  ))}
                </div>
                <p className={`text-xs font-medium ${strength === 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : "text-green-500"}`}>
                  Password strength: {strengthLabels[strength]}
                </p>
              </div>
            )}

            {/* T&C */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-[#8B5CF6]" />
              <span className="text-sm text-gray-500 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#8B5CF6] hover:underline font-medium">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-[#8B5CF6] hover:underline font-medium">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 ${
                success
                  ? "bg-green-500"
                  : "bg-gradient-to-r from-[#8B5CF6] to-[#FF6B6B] hover:shadow-lg hover:shadow-[#8B5CF6]/25 hover:-translate-y-0.5"
              } disabled:opacity-70 disabled:pointer-events-none`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </span>
              ) : success ? (
                "✓ Account Created!"
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
            {["🔒 Secure", "⚡ Instant", "🆓 Free forever"].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF6B6B] hover:text-[#E85555] font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
