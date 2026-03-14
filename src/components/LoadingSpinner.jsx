export default function LoadingSpinner() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-rose-500 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-rose-500/10 animate-pulse" />
        </div>
        <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
          Loading photos
        </p>
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-white/5 border border-white/5"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="aspect-[4/3] bg-white/5 animate-pulse" />
            <div className="px-4 py-3 space-y-2">
              <div className="h-3 bg-white/10 rounded-full animate-pulse w-3/4" />
              <div className="h-2 bg-white/5 rounded-full animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}