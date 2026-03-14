# Lumière — Photo Gallery

A responsive photo gallery web app built with React + Vite + Tailwind CSS as part of a frontend internship pre-screening assignment.

🔗 **Live Demo:** [https://photo-gallery-two-dun.vercel.app/](#) <!-- Replace with your Vercel URL -->
📁 **GitHub:** [github.com/DCodez101/Photo-Gallery](https://github.com/DCodez101/Photo-Gallery)

---

## Features

- 📸 Fetches 30 photos from the [Picsum Photos API](https://picsum.photos)
- 🔍 Real-time search filter by author name (no API call on search)
- ❤️ Toggle favourites with a heart button on each photo
- 💾 Favourites persist across page refreshes via `localStorage`
- 📱 Fully responsive — 4 columns on desktop, 2 on tablet, 1 on mobile
- ⚡ Loading skeleton while photos are fetching
- ⚠️ Error state if the API fails
- 🎨 Dark theme with hover glow effects and masonry layout

---

## Tech Stack

| Tech | Usage |
|------|-------|
| React 19 | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS v3 | Styling |
| `useReducer` | Favourites state management |
| `useMemo` | Filtered photo list computation |
| `useCallback` | Stable search handler reference |
| Custom Hook | `useFetchPhotos` — data fetching logic |
| localStorage | Favourites persistence |

---

## Project Structure

```
src/
├── components/
│   ├── PhotoCard.jsx         # Individual photo card with heart toggle
│   ├── SearchBar.jsx         # Real-time author search input
│   ├── LoadingSpinner.jsx    # Skeleton loader while fetching
│   └── FavouritesDrawer.jsx  # Side drawer showing saved photos
├── hooks/
│   └── useFetchPhotos.js     # Custom hook — returns { photos, loading, error }
├── App.jsx                   # Main app — reducer, memo, callback, layout
├── main.jsx                  # Entry point
└── index.css                 # Tailwind directives + global styles
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/DCodez101/Photo-Gallery.git

# Navigate into the project
cd Photo-Gallery

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Key Implementation Details

### `useFetchPhotos` — Custom Hook
Fetches 30 photos from `https://picsum.photos/v2/list?limit=30` on mount. Returns `{ photos, loading, error }`. Includes a cleanup flag to prevent state updates on unmounted components.

### `useReducer` — Favourites State
All favourites mutations go through a single `TOGGLE` action. The reducer updates both state and `localStorage` in one place, keeping logic centralized.

### `useCallback` — Search Handler
`handleSearch` is wrapped in `useCallback` so its reference stays stable across renders, preventing unnecessary re-renders of the `SearchBar` component.

### `useMemo` — Filtered Photos
`filteredPhotos` is recomputed only when `photos` or `query` changes — not on every render — keeping search performance efficient.

---

## Assignment

Built for the **Celebrare Frontend React Internship** pre-screening assignment.