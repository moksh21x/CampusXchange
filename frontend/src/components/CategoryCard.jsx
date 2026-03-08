export default function CategoryCard({ category, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 min-w-[110px] ${
        active
          ? "border-purple-500/60 bg-gradient-to-br " + category.color + " shadow-lg shadow-purple-500/20"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className={`text-sm font-semibold ${active ? "text-white" : "text-white/70 group-hover:text-white"} transition-colors`}>
        {category.name}
      </span>
      <span className={`text-xs ${active ? "text-white/80" : "text-white/40"}`}>
        {category.count} items
      </span>
    </button>
  );
}
