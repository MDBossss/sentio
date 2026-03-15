import React, { useState } from "react";
import { Playlist } from "@/constants/playlists";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className="relative h-40 w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border/60 shadow-md transition"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={playlist.image}
        alt={playlist.title}
        className={`h-full w-full object-cover transition ${isHovered ? "scale-105" : "scale-100"}`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition ${isHovered ? "opacity-100" : "opacity-0"}`}
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
        <div className="line-clamp-1 rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur">
          {playlist.mood}
        </div>
      </div>
    </button>
  );
};
