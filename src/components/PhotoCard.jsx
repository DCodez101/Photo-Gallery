import { memo } from "react";

const PhotoCard = memo(function PhotoCard({
  photo,
  isFavourited,
  onToggleFavourite,
  index,
}) {
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      style={{ animationDelay: `${index * 40}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 30px 2px rgba(244,63,94,0.15), 0 20px 40px rgba(0,0,0,0.6)";
        e.currentTarget.style.borderColor = "rgba(244,63,94,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Heart button — floats over image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(photo.id);
          }}
          aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
            isFavourited
              ? "bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40"
              : "bg-black/40 text-white/50 opacity-0 group-hover:opacity-100 hover:bg-rose-500/80 hover:text-white hover:scale-110"
          }`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={isFavourited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Favourited ring */}
        {isFavourited && (
          <div className="absolute inset-0 ring-2 ring-rose-500/50 rounded-2xl pointer-events-none" />
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <p className="text-white/90 text-sm font-medium truncate leading-tight">
          {photo.author}
        </p>
        <p className="text-white/30 text-xs font-mono mt-0.5">
          {photo.width} × {photo.height}
        </p>
      </div>
    </div>
  );
});

export default PhotoCard;