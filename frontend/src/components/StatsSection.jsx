import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 1200,
    suffix: "+",
    label: "Events Hosted",
    description: "Across all categories",
    icon: "🎉",
    color: "from-[#FF6B6B] to-[#FF8E8E]",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Active Users",
    description: "Growing every day",
    icon: "👥",
    color: "from-[#8B5CF6] to-[#A78BFA]",
  },
  {
    value: 48,
    suffix: "",
    label: "Cities Covered",
    description: "And expanding fast",
    icon: "🗺️",
    color: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "From verified attendees",
    icon: "⭐",
    color: "from-amber-400 to-amber-300",
  },
];

function Counter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-[#FF6B6B] uppercase tracking-wider mb-3">
            By the Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by thousands across India
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* BG gradient accent */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-15 transition-opacity`} />

              <div className="text-3xl mb-4">{stat.icon}</div>
              <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1`}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-bold text-gray-900 text-base mb-1">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
