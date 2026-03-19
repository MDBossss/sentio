import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Music } from "lucide-react";
import { Playlist as PlaylistType } from "@/constants/playlists";
import { PlaylistCard } from "../ui/PlaylistCard";
import { Playlist as ApiPlaylist } from "@/api/playlists";

interface PastPlaylistsSectionProps {
  playlists?: ApiPlaylist[];
  isLoading?: boolean;
}

// Transform API playlist to UI playlist format
const transformPlaylist = (apiPlaylist: ApiPlaylist): PlaylistType => {
  const thumbnailUrl =
    apiPlaylist.songs && apiPlaylist.songs.length > 0
      ? apiPlaylist.songs[0].thumbnail
      : "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop";

  return {
    id: parseInt(apiPlaylist.id, 10) || Math.random(),
    title: apiPlaylist.title,
    mood: apiPlaylist.prompt.split(".")[0].substring(0, 50),
    image: thumbnailUrl,
  };
};

export const PastPlaylistsSection: React.FC<PastPlaylistsSectionProps> = ({
  playlists = [],
  isLoading = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use fetched playlists if available, otherwise show empty state
  const displayPlaylists =
    playlists && playlists.length > 0 ? playlists.map(transformPlaylist) : [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const shouldShowNavButtons = displayPlaylists.length > 10;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Your collection
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Past playlists
          </h2>
        </div>

        {shouldShowNavButtons && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/80 text-zinc-950 transition hover:bg-emerald-400"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/80 text-zinc-950 transition hover:bg-emerald-400"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {displayPlaylists.length > 0 ? (
        <div className="relative group overflow-hidden">
          {/* Left fade overlay */}
          {shouldShowNavButtons && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 rounded-2xl" />
          )}

          {/* Right fade overlay */}
          {shouldShowNavButtons && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 rounded-2xl" />
          )}

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-hidden pb-2 scroll-smooth"
          >
            {displayPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted/40 p-4 mb-4">
            <Music size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No past playlists
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your created playlists will appear here
          </p>
        </div>
      )}

      <style>{`
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};
