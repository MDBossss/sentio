import React, { useState, useEffect } from "react";
import { Playlist } from "@/constants/playlists";
import { getCurrentPlaylistId } from "@/lib/currentPlaylist";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    getCurrentPlaylistId(),
  );
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);

  const isNowPlaying =
    currentPlaylistId === String(playlist.id) && isPlayerPlaying;

  const selectPlaylist = () => {
    window.dispatchEvent(
      new CustomEvent("sentio-playlist-selected", {
        detail: { playlist },
      }),
    );
  };

  useEffect(() => {
    const handlePlaylistSelected = () => {
      setCurrentPlaylistId(getCurrentPlaylistId());
    };

    const handlePlayerStateChanged = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        playing: boolean;
        playlistId: string | number;
      };

      setIsPlayerPlaying(detail.playing);
      if (detail.playlistId) {
        setCurrentPlaylistId(String(detail.playlistId));
      }
    };

    window.addEventListener("sentio-playlist-selected", handlePlaylistSelected);
    window.addEventListener(
      "sentio-player-state-changed",
      handlePlayerStateChanged,
    );

    return () => {
      window.removeEventListener(
        "sentio-playlist-selected",
        handlePlaylistSelected,
      );
      window.removeEventListener(
        "sentio-player-state-changed",
        handlePlayerStateChanged,
      );
    };
  }, []);

  return (
    <button
      type="button"
      className={`relative h-40 w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border shadow-md transition ${
        isNowPlaying
          ? "border-emerald-400/60 shadow-lg shadow-emerald-500/30"
          : "border-border/60"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={selectPlaylist}
    >
      {isNowPlaying && (
        <div className="absolute inset-0 z-20 rounded-2xl ring-2 ring-emerald-400/50 pointer-events-none" />
      )}
      <img
        src={playlist.image}
        alt={playlist.title}
        className={`h-full w-full object-cover transition ${isHovered ? "scale-105" : "scale-100"}`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent transition ${
          isNowPlaying ? "from-emerald-500/30" : "from-black/60"
        } ${isHovered ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 transition ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <h3 className="text-sm font-semibold text-white">{playlist.title}</h3>
        <p className="text-xs text-emerald-300">{playlist.mood}</p>
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 transition ${isHovered ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className={`line-clamp-1 rounded-full px-2 py-1 text-xs font-medium backdrop-blur ${
            isNowPlaying
              ? "bg-emerald-500/30 text-emerald-50"
              : "bg-white/10 text-white"
          }`}
        >
          {playlist.mood}
        </div>
      </div>
      {isNowPlaying && (
        <div className="absolute right-3 top-3 z-30 flex items-center gap-1 rounded-full bg-emerald-500/80 px-3 py-1 backdrop-blur">
          <div className="h-2 w-2 rounded-full bg-emerald-100 animate-pulse" />
          <span className="text-xs font-bold text-emerald-50 uppercase tracking-wider">
            Playing
          </span>
        </div>
      )}
    </button>
  );
};
