import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { Music, SkipBack, SkipForward, Play, Pause, Volume2 } from "lucide-solid";

export default function PlayerApp(container: HTMLElement) {
  const [playing, setPlaying] = createSignal(false);
  const [currentTrack, setCurrentTrack] = createSignal("No track playing");
  const [volume, setVolume] = createSignal(70);

  const togglePlayPause = () => setPlaying(!playing());

  const PlayerContent = () => (
    <div class="flex items-center justify-between gap-6 border-t border-border/60 bg-background/90 px-5 py-4 text-foreground shadow-3xl backdrop-blur">
      <div class="min-w-[200px] flex-1">
        <div class="text-xs uppercase tracking-wider text-muted-foreground">Now Playing</div>
        <div class="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-400">
          <span class="text-base text-emerald-400">
            <Music size={16} />
          </span>
          <span class="truncate">{currentTrack()}</span>
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
          class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl text-zinc-950 shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          onClick={togglePlayPause}
          title={playing() ? "Pause" : "Play"}
          aria-label={playing() ? "Pause" : "Play"}
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
        <span class="min-w-[36px] text-xs text-muted-foreground">{volume()}%</span>
      </div>
    </div>
  );

  const dispose = render(() => <PlayerContent />, container);
  return dispose;
}
