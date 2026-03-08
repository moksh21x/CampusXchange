import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-sm">
                CX
              </div>
              <span className="font-bold text-lg text-white">
                Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Xchange</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              The trusted student marketplace for buying, selling, and exchanging within your campus community.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "IG", "YT"].map((icon) => (
                <button
                  key={icon}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Platform",
              links: ["Marketplace", "Sell an Item", "Categories", "How it works"],
              routes: ["/home", "/dashboard", "/home", "/"],
            },
            {
              title: "Company",
              links: ["About Us", "Blog", "Careers", "Press"],
              routes: ["/", "/", "/", "/"],
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
              routes: ["/", "/", "/", "/"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((label, i) => (
                  <li key={label}>
                    <Link
                      to={section.routes[i]}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2026 CampusXchange. Made with ❤️ for students.
          </p>
          <p className="text-xs text-white/30">
            🌱 Promoting sustainability through reuse
          </p>
        </div>
      </div>
    </footer>
  );
}
