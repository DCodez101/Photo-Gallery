import { useState, useCallback, useMemo, useReducer } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import PhotoCard from "./components/PhotoCard";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import FavouritesDrawer from "./components/FavouritesDrawer";

// --- Reducer for favourites ---
const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.includes(action.id);
      const next = exists
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];
      localStorage.setItem("favourites", JSON.stringify(next));
      return next;
    }
    default:
      return state;
  }
};

const getInitialFavourites = () => {
  try {
    return JSON.parse(localStorage.getItem("favourites")) || [];
  } catch {
    return [];
  }
};

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites
  );

  // useCallback: stable reference so child components don't re-render on every keystroke
  const handleSearch = useCallback((value) => {
    setQuery(value);
  }, []);

  // useMemo: recompute filtered list only when photos or query changes
  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, query]);

  const favouritePhotos = useMemo(
    () => photos.filter((p) => favourites.includes(p.id)),
    [photos, favourites]
  );

  const toggleFavourite = useCallback(
    (id) => dispatch({ type: "TOGGLE", id }),
    []
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white font-display">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-white font-heading">
              Lumière
            </h1>
            <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-mono mt-0.5">
              Photo Gallery
            </p>
          </div>
          <SearchBar value={query} onChange={handleSearch} />
          <button
            onClick={() => setShowFavourites(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
          >
            <HeartIcon filled />
            <span className="hidden sm:inline">Favourites</span>
            {favourites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favourites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && <LoadingSpinner />}

        {error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-5xl">⚠️</span>
            <p className="text-white/60 text-lg">{error}</p>
            <p className="text-white/30 text-sm">
              Could not reach Picsum Photos API
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-white/30 text-sm mb-6 font-mono">
              {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""}
              {query && ` matching "${query}"`}
            </p>

            {filteredPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-3">
                <span className="text-5xl">🔍</span>
                <p className="text-white/40">No photos match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPhotos.map((photo, i) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourited={favourites.includes(photo.id)}
                    onToggleFavourite={toggleFavourite}
                    index={i}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Favourites Drawer */}
      {showFavourites && (
        <FavouritesDrawer
          photos={favouritePhotos}
          onClose={() => setShowFavourites(false)}
          onToggleFavourite={toggleFavourite}
          favourites={favourites}
        />
      )}
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      className="text-rose-400"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}