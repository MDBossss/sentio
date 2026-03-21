import { createSignal, onMount, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import {
  Music,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
} from "lucide-solid";

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
  const [playing, setPlaying] = createSignal(false);
  const [currentTrack, setCurrentTrack] = createSignal("No track playing");
  const [currentArtist, setCurrentArtist] = createSignal("");
  const [volume, setVolume] = createSignal(70);
  const [theme, setTheme] = createSignal<"dark" | "light">("dark");
  const [currentPlaylist, setCurrentPlaylist] = createSignal<Playlist | null>(
    null,
  );
  const [currentSongIndex, setCurrentSongIndex] = createSignal(0);

  const togglePlayPause = () => setPlaying(!playing());

  const updateCurrentTrack = () => {
    const playlist = currentPlaylist();
    const index = currentSongIndex();

    if (playlist && playlist.songs && playlist.songs[index]) {
      const song = playlist.songs[index];
      setCurrentTrack(song.title);
      setCurrentArtist(song.artist);
    }
  };

  onMount(() => {
    // Restore from localStorage
    const storedTheme = localStorage.getItem("sentio-theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);

    const storedPlaylistId = localStorage.getItem("sentio-current-playlist-id");
    const storedPlaylist = localStorage.getItem("sentio-current-playlist");
    if (storedPlaylist) {
      try {
        const playlist = JSON.parse(storedPlaylist);
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);
        updateCurrentTrack();
      } catch (e) {
        console.error(
          "[PlayerApp] Failed to restore playlist from localStorage",
          e,
        );
      }
    }

    // Theme change listener
    const themeHandler = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        theme?: "dark" | "light";
      };
      if (detail?.theme) {
        setTheme(detail.theme);
      }
    };

    window.addEventListener("sentio-theme-change", themeHandler);

    // Playlist selection listener
    const playlistHandler = (event: Event) => {
      const detail = (event as CustomEvent).detail as { playlist: Playlist };
      if (detail?.playlist) {
        const playlist = detail.playlist;
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);

        // Persist to localStorage
        localStorage.setItem("sentio-current-playlist-id", String(playlist.id));
        localStorage.setItem(
          "sentio-current-playlist",
          JSON.stringify(playlist),
        );

        // Start playing
        setPlaying(true);

        // Update display
        updateCurrentTrack();

        console.log(
          "[PlayerApp] Playlist selected:",
          playlist.title,
          "Now playing:",
          playlist.songs[0]?.title,
        );
      }
    };

    window.addEventListener("sentio-playlist-selected", playlistHandler);

    onCleanup(() => {
      window.removeEventListener("sentio-theme-change", themeHandler);
      window.removeEventListener("sentio-playlist-selected", playlistHandler);
    });
  });

  const PlayerContent = () => (
    <div class="flex items-center justify-between gap-6 border-t border-border/60 bg-background/90 px-5 py-4 text-foreground shadow-3xl backdrop-blur">
      <div class="min-w-[200px] flex-1">
        <div class="text-xs uppercase tracking-wider text-muted-foreground">
          Now Playing
        </div>
        <div class="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-400">
          <span class="text-base text-emerald-400">
            <Music size={16} />
          </span>
          <div class="min-w-0 flex-1">
            <div class="truncate">{currentTrack()}</div>
            {currentArtist() && (
              <div class="truncate text-xs text-muted-foreground">
                {currentArtist()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-lg text-foreground shadow-sm transition hover:scale-105 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          title="Previous"
          aria-label="Previous track"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          disabled={currentTrack() === "No track playing"}
          class={`inline-flex h-12 w-12 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 ${
            currentTrack() === "No track playing"
              ? "bg-muted/40 text-muted-foreground cursor-not-allowed opacity-50"
              : `bg-emerald-400 text-xl ${theme() === "light" ? "text-white" : "text-zinc-950"} shadow-lg shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-300 focus-visible:ring-emerald-300`
          }`}
          onClick={togglePlayPause}
          title={
            currentTrack() === "No track playing"
              ? "Select a song to play"
              : playing()
                ? "Pause"
                : "Play"
          }
          aria-label={
            currentTrack() === "No track playing"
              ? "Select a song to play"
              : playing()
                ? "Pause"
                : "Play"
          }
        >
          {playing() ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          type="button"
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
          value={volume()}
          onInput={(e) => setVolume(Number(e.currentTarget.value))}
          class="h-1 w-28 cursor-pointer appearance-none rounded-full bg-muted/60 accent-emerald-400"
        />
        <span class="min-w-[36px] text-xs text-muted-foreground">
          {volume()}%
        </span>
      </div>
    </div>
  );

  const dispose = render(() => <PlayerContent />, container);
  return dispose;
}
