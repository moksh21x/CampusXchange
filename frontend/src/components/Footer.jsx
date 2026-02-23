import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Explore Events", to: "/events" },
    { label: "Host an Event", to: "/organizer" },
    { label: "Dashboard", to: "/dashboard" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Blog", to: "/" },
    { label: "Careers", to: "/" },
  ],
  Support: [
    { label: "Help Center", to: "/" },
    { label: "Contact Us", to: "/" },
    { label: "Privacy Policy", to: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#8B5CF6] flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">
                Around<span className="text-[#FF6B6B]">U</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Discover, attend, and host amazing events happening right around
              you. Your city is full of experiences waiting to be found.
            </p>
            <div className="flex gap-3 mt-6">
              {["tw", "ig", "li", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#FF6B6B] flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-all duration-200"
                >
                  {s.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 AroundU. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span>Made with</span>
            <span className="text-[#FF6B6B] mx-1">♥</span>
            <span>for curious minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
