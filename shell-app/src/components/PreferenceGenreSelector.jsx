import React from "react";

export const PreferenceGenreSelector = ({
  genres,
  allGenres,
  onToggleGenre,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Favorite Genres</h2>
        <p className="text-zinc-400">
          Pick the genres you love. You can select as many as you'd like.
        </p>
      </div>

      {/* Selected Counter */}
      <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
        <span className="text-sm font-medium text-zinc-300">
          Selected Genres
        </span>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-sm">
          {genres.length}
        </span>
      </div>

      {/* Genre Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {allGenres.map((genre) => {
          const isSelected = genres.includes(genre);

          return (
            <button
              key={genre}
              onClick={() => onToggleGenre(genre)}
              className={`group relative p-4 rounded-xl border-2 transition-all duration-200 h-fit ${
                isSelected
                  ? "border-emerald-500 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm font-medium ${
                    isSelected ? "text-emerald-300" : "text-zinc-300"
                  }`}
                >
                  {genre}
                </span>
                {isSelected && (
                  <div className="flex-shrink-0 w-4 h-4 rounded border border-emerald-400 bg-emerald-500 flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
