import React, { useState, useEffect } from "react";
import { Playlist } from "@/api/playlists";
import { getCurrentPlaylistId } from "@/lib/currentPlaylist";
import { Music, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    getCurrentPlaylistId(),
  );
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tilesLoaded, setTilesLoaded] = useState<boolean[]>([]);
  const { toast } = useToast();

  const baseUrl = process.env.REACT_APP_BASE_URL || "https://sentio.app";

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${baseUrl}/app?shared=${playlist.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        description: "Share link copied to clipboard",
      });
    } catch (err) {
      console.error("Failed to copy share link:", err);
      toast({
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  // Get first song thumbnail or use a placeholder gradient
  const thumbnailUrl = playlist.songs?.[0]?.thumbnail || null;
  const tiles = playlist.songs?.slice(0, 4) || [];
  const useGrid = tiles.length >= 4;

  const isNowPlaying =
    currentPlaylistId === String(playlist.id) && isPlayerPlaying;

  const selectPlaylist = () => {
    console.log("[PlaylistCard] Attempting to switch to playlist:", {
      playlistId: playlist.id,
      title: playlist.title,
      songsCount: playlist.songs?.length,
    });

    // Save to localStorage so player app can detect change even in different contexts
    localStorage.setItem("sentio-current-playlist-id", String(playlist.id));
    const userId = localStorage.getItem("sentio-user-id");
    localStorage.setItem(
      "sentio-playlist-to-switch",
      JSON.stringify({
        playlist: { ...playlist, userId },
        timestamp: Date.now(),
      }),
    );
    localStorage.setItem("sentio-current-user-id", userId || "");

    // Also dispatch events
    const event = new CustomEvent("sentio-playlist-selected", {
      detail: { playlist },
    });

    console.log("[PlaylistCard] Dispatching event to window and parent");
    window.dispatchEvent(event);
    if (window.parent !== window) {
      window.parent.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const handlePlaylistSelected = (event: Event) => {
      // Prefer the playlist id from the event detail to avoid localStorage race
      const detail = (event as CustomEvent).detail as { playlist?: Playlist };
      const eventPlaylistId = detail?.playlist
        ? String(detail.playlist.id)
        : null;
      const newId = eventPlaylistId || getCurrentPlaylistId();

      console.log("[PlaylistCard] Playlist selected event received", {
        timestamp: Date.now(),
        playlistCardId: String(playlist.id),
        eventPlaylistId,
        fallback_localStorage: getCurrentPlaylistId(),
        chosenNewId: newId,
      });

      if (newId) {
        localStorage.setItem("sentio-current-playlist-id", newId);
      }
      setCurrentPlaylistId(newId);
    };

    const handlePlayerStateChanged = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        playing: boolean;
        playlistId: string | number;
      };

      // Read authoritative current playlist id from localStorage at handler time
      const authoritativeId = getCurrentPlaylistId();

      console.log("[PlaylistCard] Player state changed", {
        timestamp: Date.now(),
        eventPlaylistId: detail.playlistId,
        eventPlaying: detail.playing,
        componentPlaylistId: String(playlist.id),
        componentState_currentPlaylistId: currentPlaylistId,
        authoritative_localStorage_playlistId: authoritativeId,
        willBecomeNowPlaying:
          String(detail.playlistId) === String(playlist.id) && detail.playing,
      });

      // Update local component state
      if (detail.playlistId) {
        setCurrentPlaylistId(String(detail.playlistId));
      }
      setIsPlayerPlaying(detail.playing);
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

  // Generate a gradient based on playlist ID for visual variety
  const colorVariants = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
  ];
  const idStr = String(playlist.id || "");
  const gradientIndex =
    (idStr.charCodeAt(0) + (idStr.length || 0)) % colorVariants.length;
  const gradient = colorVariants[gradientIndex];

  useEffect(() => {
    setTilesLoaded(new Array(tiles.length).fill(false));
    // reset full image load state when playlist changes
    setImageLoaded(false);
  }, [playlist.id]);

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

      {/* If there are 4+ songs, show a 2x2 tile grid of thumbnails. Otherwise show single thumbnail. */}
      {useGrid ? (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {tiles.map((t, i) => (
            <img
              key={i}
              src={t.thumbnail}
              alt={`${playlist.title} - ${i + 1}`}
              loading="lazy"
              onLoad={() =>
                setTilesLoaded((prev) => {
                  const next = prev.slice();
                  next[i] = true;
                  return next;
                })
              }
              onError={() =>
                setTilesLoaded((prev) => {
                  const next = prev.slice();
                  next[i] = false;
                  return next;
                })
              }
              className={`w-full h-full object-cover transition ${
                isHovered ? "scale-105" : "scale-100"
              } ${tilesLoaded[i] ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      ) : (
        thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={playlist.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            className={`h-full w-full object-cover transition ${
              isHovered ? "scale-105" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        )
      )}

      {/* Fallback gradient background when no image */}
      {((!useGrid && (!thumbnailUrl || !imageLoaded)) ||
        (useGrid && !tilesLoaded.some(Boolean))) && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`}
        />
      )}

      {/* Music icon on gradient background */}
      {((!useGrid && (!thumbnailUrl || !imageLoaded)) ||
        (useGrid && !tilesLoaded.some(Boolean))) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Music size={48} className="text-white/40" />
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent transition ${
          isNowPlaying ? "from-emerald-500/30" : "from-black/60"
        } ${isHovered ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 transition ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="line-clamp-2 text-sm font-semibold text-white">
          {playlist.title}
        </h3>
        <p className="text-xs text-emerald-300">
          {playlist.songs?.length || 0} songs
        </p>
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 transition ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`line-clamp-1 rounded-full px-2 py-1 text-xs font-medium backdrop-blur ${
            isNowPlaying
              ? "bg-emerald-500/30 text-emerald-50"
              : "bg-white/10 text-white"
          }`}
        >
          {playlist.songs?.length || 0} songs
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

      {isHovered && !isNowPlaying && (
        <button
          onClick={handleShare}
          className="absolute right-2 top-2 z-30 rounded-full bg-black/50 p-2 backdrop-blur transition hover:bg-black/70"
          aria-label="Share playlist"
        >
          <Share2 size={16} className="text-white" />
        </button>
      )}
    </button>
  );
};
