import { createSignal } from "solid-js";
import { render } from "solid-js/web";

export default function PlayerApp(container: HTMLElement) {
  const [playing, setPlaying] = createSignal(false);
  const [currentTrack, setCurrentTrack] = createSignal("No track playing");
  const [volume, setVolume] = createSignal(70);

  const togglePlayPause = () => setPlaying(!playing());

  const PlayerContent = () => (
    <div class="flex items-center justify-between gap-6 border-t border-white/10 bg-zinc-950/90 px-5 py-4 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur">
      <div class="min-w-[200px] flex-1">
        <div class="text-xs uppercase tracking-wider text-zinc-400">Now Playing</div>
        <div class="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-400">
          <span>🎵</span>
          <span class="truncate">{currentTrack()}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg shadow-sm transition hover:scale-105 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          title="Previous"
          aria-label="Previous track"
        >
          ⏮️
        </button>
        <button
          type="button"
          class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          onClick={togglePlayPause}
          title={playing() ? "Pause" : "Play"}
          aria-label={playing() ? "Pause" : "Play"}
        >
          {playing() ? "⏸️" : "▶️"}
        </button>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg shadow-sm transition hover:scale-105 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          title="Next"
          aria-label="Next track"
        >
          ⏭️
        </button>
      </div>

      <div class="flex min-w-[180px] items-center gap-3">
        <span class="text-base">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume()}
          onInput={(e) => setVolume(Number(e.currentTarget.value))}
          class="h-1 w-28 cursor-pointer appearance-none rounded-full bg-zinc-700 accent-emerald-400"
        />
        <span class="min-w-[36px] text-xs text-zinc-400">{volume()}%</span>
      </div>
    </div>
  );

  const dispose = render(() => <PlayerContent />, container);
  return dispose;
}
