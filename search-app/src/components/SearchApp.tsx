import React, { useMemo } from "react";
import { Sparkles } from "lucide-react";

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
};

const timePresets: Record<string, string[]> = {
  morning: ["☀️ Morning focus", "🌤️ Soft indie wake-up", "🍃 Calm acoustic start"],
  afternoon: ["⚡ Midday energy", "🏙️ City pop stroll", "🎧 Productive flow"],
  evening: ["🌇 Golden hour chill", "🎷 Late lounge", "🧠 Deep focus"],
  night: ["🌙 Midnight focus", "🌧️ Rainy lofi beats", "🖤 Slowcore drift"],
};

const SearchApp: React.FC = () => {
  const presets = useMemo(() => {
    const key = getTimeOfDay();
    return timePresets[key] ?? timePresets.evening;
  }, []);

  return (
    <div className="h-full space-y-6 text-white">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Your space
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Welcome, Joey
          </h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-400">
            Describe your vibe and Sentio will craft a playlist that matches
            your mood.
          </p>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-emerald-300"
          aria-label="User avatar"
        >
          J
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              AI vibe prompt
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Describe your mood
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            <Sparkles size={14} />
            Generate
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
          <textarea
            rows={5}
            placeholder="Tell Sentio the vibe... dreamy synths, late-night drive, soft percussion, no vocals."
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
          />
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Presets for right now
            </p>
            <p className="text-xs text-zinc-500">
              Will personalize with your taste soon
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-emerald-400/40 hover:bg-emerald-500/10"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchApp;
