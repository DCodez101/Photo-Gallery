import PhotoCard from "./PhotoCard";

export default function FavouritesDrawer({ photos, onClose, onToggleFavourite, favourites }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#111] border-l border-white/10 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="text-white font-semibold tracking-tight font-heading">
              Favourites
            </h2>
            <p className="text-white/30 text-xs font-mono mt-0.5">
              {photos.length} saved
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-4xl">🤍</span>
              <p className="text-white/40 text-sm">No favourites yet.</p>
              <p className="text-white/20 text-xs">
                Tap the heart on any photo to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, i) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourited={favourites.includes(photo.id)}
                  onToggleFavourite={onToggleFavourite}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}