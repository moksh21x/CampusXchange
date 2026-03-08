export default function ReviewCard({ review }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
      {/* Quote mark */}
      <div className="absolute top-4 right-5 text-5xl text-white/5 font-serif leading-none select-none">"</div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-white/20"}`}>
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm text-white/70 leading-relaxed mb-6">"{review.comment}"</p>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full bg-white/10 ring-2 ring-purple-500/30"
        />
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-white/40">{review.college} · {review.date}</p>
        </div>
      </div>
    </div>
  );
}
