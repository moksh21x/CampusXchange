import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(t);
          navigate("/");
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 pt-20">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center relative z-10 max-w-lg">
        {/* 404 Text */}
        <div className="relative mb-8">
          <p className="text-[120px] sm:text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B6B] to-[#8B5CF6] select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl">🗺️</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Oops! You're off the map
        </h1>
        <p className="text-gray-500 text-base mb-2 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to discovering events!
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Redirecting to home in{" "}
          <span className="font-bold text-[#FF6B6B]">{count}s</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-7 py-3.5 rounded-2xl text-white font-semibold bg-gradient-to-r from-[#FF6B6B] to-[#8B5CF6] hover:shadow-xl hover:shadow-[#FF6B6B]/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            ← Back to Home
          </Link>
          <Link
            to="/events"
            className="px-7 py-3.5 rounded-2xl text-gray-700 font-semibold bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Events
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: "Home", to: "/" },
            { label: "Events", to: "/events" },
            { label: "Dashboard", to: "/dashboard" },
            { label: "Login", to: "/login" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-500 text-sm rounded-xl hover:text-[#FF6B6B] hover:border-[#FF6B6B]/30 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
