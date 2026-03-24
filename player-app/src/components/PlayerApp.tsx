import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import { render } from "solid-js/web";
import {
  Music,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
} from "lucide-solid";
import { useYoutubePlayer } from "../hooks/useYoutubePlayer";
import { usePlayerState } from "../hooks/usePlayerState";
import { formatTime } from "../utils/formatTime";

interface PlaylistSong {
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
}

interface Playlist {
  id: string | number;
  title: string;
  songs: PlaylistSong[];
  [key: string]: any;
}

export default function PlayerApp(container: HTMLElement) {
  const player = usePlayerState();
  const [playerReady, setPlayerReady] = createSignal(false);
  const [lastLoadedSongIndex, setLastLoadedSongIndex] = createSignal(-1);
  const [stateRestored, setStateRestored] = createSignal(false);
  const [initialTrackLoaded, setInitialTrackLoaded] = createSignal(false);

  const ytPlayer = useYoutubePlayer("yt-player-container");
  let progressIntervalId: number;
  let readyCheckInterval: number;

  const togglePlayPause = () => player.togglePlayPause();

  const updateCurrentTrack = (autoPlay = true) => {
    const playlist = player.state.currentPlaylist;
    const index = player.state.currentSongIndex;

    console.log("[updateCurrentTrack] Updating with autoPlay=" + autoPlay, {
      playlistId: playlist?.id,
      songIndex: index,
      songTitle: playlist?.songs?.[index]?.title,
      playlistSongsLength: playlist?.songs?.length,
    });

    if (playlist && playlist.songs && playlist.songs[index]) {
      const song = playlist.songs[index];
      player.setState("currentTrack", song.title);
      player.setState("currentArtist", song.artist);

      if (
        song.videoId &&
        ytPlayer.isReady() &&
        index !== lastLoadedSongIndex()
      ) {
        ytPlayer.loadVideoById(song.videoId);
        setLastLoadedSongIndex(index);
        if (autoPlay) {
          setTimeout(() => {
            if (ytPlayer.isReady()) {
              ytPlayer.play();
              player.setState("playing", true);
            }
          }, 100);
        } else {
          setTimeout(() => {
            if (ytPlayer.isReady()) {
              ytPlayer.pause();
              player.setState("playing", false);
            }
          }, 100);
        }
      } else {
        const reason = [];
        if (!song.videoId) reason.push("no videoId");
        if (!ytPlayer.isReady()) reason.push("player not ready");
        if (index === lastLoadedSongIndex())
          reason.push("index already loaded");
      }

      if (
        autoPlay &&
        song.videoId &&
        ytPlayer.isReady() &&
        index === lastLoadedSongIndex()
      ) {
        ytPlayer.play();
        player.setState("playing", true);
      } else if (!autoPlay && index === lastLoadedSongIndex()) {
      }
      {
        const videoId =
          player.state.currentPlaylist?.songs[player.state.currentSongIndex]
            ?.videoId;
      }
    }
  };

  const nextTrack = () => {
    player.nextTrack();
    updateCurrentTrack(true);
  };
  const prevTrack = () => {
    player.prevTrack();
    updateCurrentTrack(true);
  };

  onMount(() => {
    readyCheckInterval = window.setInterval(() => {
      if (ytPlayer.isReady() && !playerReady()) {
        setPlayerReady(true);
        clearInterval(readyCheckInterval);
      }
    }, 100);

    const storedTheme = localStorage.getItem("sentio-theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    player.setState("theme", initialTheme);

    const storedPlaylist = localStorage.getItem("sentio-current-playlist");
    if (storedPlaylist) {
      try {
        const playlist = JSON.parse(storedPlaylist);
        player.setPlaylist(playlist, 0);
      } catch (e) {
        console.error(
          "[PlayerApp] Failed to restore playlist from localStorage",
          e,
        );
      }
    }

    const themeHandler = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        theme?: "dark" | "light";
      };
      if (detail?.theme) {
        player.setState("theme", detail.theme);
      }
    };

    window.addEventListener("sentio-theme-change", themeHandler);

    const playlistHandler = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        playlist: Playlist;
        startIndex?: number;
        startVideoId?: string;
      };

      console.log("[PlayerApp] Received playlist-selected event:", {
        playlistId: detail?.playlist?.id,
        title: detail?.playlist?.title,
        songsCount: detail?.playlist?.songs?.length,
      });

      if (detail?.playlist) {
        const playlist = detail.playlist;
        // If already playing, continue playing. If paused, start playing the new one.
        const shouldAutoPlay = true; // Always play when clicking a playlist
        console.log(
          "[PlayerApp] Playlist clicked - auto-playing new selection",
        );
        // Convert to plain object to avoid Solid.js store issues
        const plainPlaylist = JSON.parse(JSON.stringify(playlist));
        player.setPlaylist(
          plainPlaylist,
          detail.startIndex,
          detail.startVideoId,
        );
        // IMPORTANT: Reset lastLoadedSongIndex so video actually loads for new playlist
        setLastLoadedSongIndex(-1);

        localStorage.setItem("sentio-current-playlist-id", String(playlist.id));
        localStorage.setItem(
          "sentio-current-playlist",
          JSON.stringify(playlist),
        );

        player.setState("playing", true);
        updateCurrentTrack(true);
        console.log("[PlayerApp] Playlist switched and playback started");
      } else {
        console.warn(
          "[PlayerApp] Received playlist-selected but no playlist in detail",
        );
      }
    };

    window.addEventListener("sentio-playlist-selected", playlistHandler);

    // Also listen to localStorage changes for cross-app communication
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sentio-playlist-to-switch" && event.newValue) {
        try {
          const { playlist } = JSON.parse(event.newValue);
          console.log(
            "[PlayerApp] Detected playlist switch via storage event:",
            {
              playlistId: playlist.id,
              title: playlist.title,
            },
          );

          // Simulate the playlist handler logic
          if (playlist) {
            const plainPlaylist = JSON.parse(JSON.stringify(playlist));
            player.setPlaylist(plainPlaylist, 0);
            // IMPORTANT: Reset lastLoadedSongIndex so video actually loads
            setLastLoadedSongIndex(-1);
            localStorage.setItem(
              "sentio-current-playlist-id",
              String(playlist.id),
            );
            localStorage.setItem(
              "sentio-current-playlist",
              JSON.stringify(playlist),
            );
            // Always auto-play when switching playlists via storage
            player.setState("playing", true);
            updateCurrentTrack(true);
          }
        } catch (e) {
          console.error(
            "[PlayerApp] Failed to handle storage playlist change:",
            e,
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const togglePlayHandler = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        playlistId: string | number;
      };

      if (detail?.playlistId) {
        // If this playlist is already selected, just toggle play/pause
        if (
          player.state.currentPlaylist &&
          String(player.state.currentPlaylist.id) === String(detail.playlistId)
        ) {
          player.togglePlayPause();
        } else {
          // Otherwise, this will be handled by the playlist selection
          // which will trigger auto-play
          player.setState("playing", true);
          updateCurrentTrack(true);
        }
      }
    };

    window.addEventListener("sentio-player-toggle-play", togglePlayHandler);

    const beforeUnloadHandler = () => {
      localStorage.setItem(
        "sentio-player-playing",
        String(player.state.playing),
      );

      localStorage.setItem("sentio-player-volume", String(player.state.volume));

      localStorage.setItem(
        "sentio-player-time",
        String(player.state.currentTime),
      );

      localStorage.setItem(
        "sentio-player-song-index",
        String(player.state.currentSongIndex),
      );
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    onCleanup(() => {
      window.removeEventListener("sentio-theme-change", themeHandler);
      window.removeEventListener("sentio-playlist-selected", playlistHandler);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "sentio-player-toggle-play",
        togglePlayHandler,
      );
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      clearInterval(readyCheckInterval);
    });
  });

  createEffect(() => {
    if (!playerReady()) return;
    if (player.state.playing) {
      ytPlayer.play();
    } else {
      ytPlayer.pause();
    }

    // Broadcast playing state to other apps (include a log for debugging)
    const broadcastDetail = {
      playing: player.state.playing,
      playlistId: player.state.currentPlaylist?.id,
    };
    console.log("[PlayerApp] Broadcasting player state", {
      timestamp: Date.now(),
      playing: broadcastDetail.playing,
      playlistId: broadcastDetail.playlistId,
      currentPlaylistFromPlayerState: player.state.currentPlaylist?.id,
    });

    window.dispatchEvent(
      new CustomEvent("sentio-player-state-changed", {
        detail: broadcastDetail,
      }),
    );
  });

  // Load initial track when player becomes ready
  createEffect(() => {
    if (!playerReady() || initialTrackLoaded()) return;
    updateCurrentTrack(false);
    setInitialTrackLoaded(true);
  });

  createEffect(() => {
    if (!playerReady()) return;
    ytPlayer.setVolume(player.state.volume);
  });

  createEffect(() => {
    if (!playerReady() || stateRestored()) return;

    const storedVolume = localStorage.getItem("sentio-player-volume");
    if (storedVolume) {
      player.setState("volume", parseInt(storedVolume));
    }

    const storedSongIndex = localStorage.getItem("sentio-player-song-index");
    if (storedSongIndex) {
      const index = parseInt(storedSongIndex);
      if (
        player.state.currentPlaylist &&
        index >= 0 &&
        index < player.state.currentPlaylist.songs.length
      ) {
        player.setState("currentSongIndex", index);
      }
    }

    const storedPlaying = localStorage.getItem("sentio-player-playing");
    if (player.state.currentPlaylist) {
      if (storedPlaying === "true") {
        player.setState("playing", true);
      } else if (storedPlaying === "false") {
        player.setState("playing", false);
      }
    }

    setStateRestored(true);
  });

  onMount(() => {
    progressIntervalId = window.setInterval(() => {
      if (playerReady() && ytPlayer.isReady()) {
        player.setState("currentTime", ytPlayer.getCurrentTime());
        player.setState("duration", ytPlayer.getDuration());
      }
    }, 500);

    onCleanup(() => {
      clearInterval(progressIntervalId);
    });
  });

  const PlayerContent = () => (
    <>
      <div
        id="yt-player-container"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
        }}
      />

      {player.state.currentPlaylist && (
        <div class="w-full border-b border-border/40 bg-background/60 px-5 py-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatTime(player.state.currentTime)}</span>
            <div class="flex-1 h-1 bg-muted/40 rounded-full overflow-hidden">
              <div
                class="h-full bg-emerald-400 transition-all"
                style={{
                  width: `${player.state.duration > 0 ? (player.state.currentTime / player.state.duration) * 100 : 0}%`,
                }}
              />
            </div>
            <span>{formatTime(player.state.duration)}</span>
          </div>
        </div>
      )}

      <div class="flex items-center justify-between gap-6 border-t border-border/60 bg-background/90 px-5 py-4 text-foreground shadow-3xl backdrop-blur">
        <div class="min-w-[200px] flex-1">
          <div class="text-xs uppercase tracking-wider text-muted-foreground">
            {player.state.playing ? "Now Playing" : "Paused"}
          </div>
          <div class="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <span class="text-base text-emerald-400">
              <Music size={16} />
            </span>
            <div class="min-w-0 flex-1">
              <div class="truncate">{player.state.currentTrack}</div>
              {player.state.currentArtist && (
                <div class="truncate text-xs text-muted-foreground">
                  {player.state.currentArtist}
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            onClick={prevTrack}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-lg text-foreground shadow-sm transition hover:scale-105 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="Previous"
            aria-label="Previous track"
          >
            <SkipBack size={18} />
          </button>
          <button
            type="button"
            disabled={player.state.currentTrack === "No track playing"}
            class={`inline-flex h-12 w-12 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 ${
              player.state.currentTrack === "No track playing"
                ? "bg-muted/40 text-muted-foreground cursor-not-allowed opacity-50"
                : `bg-emerald-400 text-xl ${player.state.theme === "light" ? "text-white" : "text-zinc-950"} shadow-lg shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-300 focus-visible:ring-emerald-300`
            }`}
            onClick={togglePlayPause}
            title={
              player.state.currentTrack === "No track playing"
                ? "Select a song to play"
                : player.state.playing
                  ? "Pause"
                  : "Play"
            }
            aria-label={
              player.state.currentTrack === "No track playing"
                ? "Select a song to play"
                : player.state.playing
                  ? "Pause"
                  : "Play"
            }
          >
            {player.state.playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-lg text-foreground shadow-sm transition hover:scale-105 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="Next"
            aria-label="Next track"
          >
            <SkipForward size={18} />
          </button>
        </div>

        <div class="flex min-w-[180px] items-center gap-3">
          <span class="text-base">
            <Volume2 size={16} />
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={player.state.volume}
            onInput={(e) =>
              player.setState("volume", Number(e.currentTarget.value))
            }
            class="h-1 w-28 cursor-pointer appearance-none rounded-full bg-muted/60 accent-emerald-400"
          />
          <span class="min-w-[36px] text-xs text-muted-foreground">
            {player.state.volume}%
          </span>
        </div>
      </div>
    </>
  );

  const dispose = render(() => <PlayerContent />, container);
  return dispose;
}
