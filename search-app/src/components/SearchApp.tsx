import React, { useEffect, useMemo, useState } from "react";
import { Sparkles, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("sentio-theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    console.log("[sentio][search] initial theme from storage:", storedTheme);
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        theme?: "dark" | "light";
      };
      console.log("[sentio][search] theme change event:", detail);
      if (detail?.theme) {
        setTheme(detail.theme);
      }
    };

    window.addEventListener("sentio-theme-change", handler);
    return () => window.removeEventListener("sentio-theme-change", handler);
  }, []);

  const broadcastTheme = (nextTheme: "dark" | "light") => {
    console.log("[sentio][search] requesting theme:", nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(
      new CustomEvent("sentio-theme-request", { detail: { theme: nextTheme } })
    );
  };

  return (
    <div className="h-full space-y-6 text-foreground">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Your space
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            Welcome, Joey
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Describe your vibe and Sentio will craft a playlist that matches
            your mood.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-emerald-300 transition hover:bg-white/10"
              aria-label="User profile"
            >
              J
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl border border-border/60 bg-popover/95 p-2 text-popover-foreground shadow-xl backdrop-blur"
          >
            <DropdownMenuItem
              onClick={() => broadcastTheme("light")}
              className="gap-2 rounded-xl focus:bg-white/10"
            >
              <Sun size={14} className="text-emerald-400" />
              Light mode
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => broadcastTheme("dark")}
              className="gap-2 rounded-xl focus:bg-white/10"
            >
              <Moon size={14} className="text-emerald-400" />
              Dark mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <section className="rounded-3xl border border-border/60 bg-card/40 p-8 shadow-md backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              AI vibe prompt
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
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

        <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-4">
          <textarea
            rows={5}
            placeholder="Tell Sentio the vibe... dreamy synths, late-night drive, soft percussion, no vocals."
            className="w-full resize-none rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
          />
        </div>

        <div className="mt-6 border-t border-border/60 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Presets for right now
            </p>
            <p className="text-xs text-muted-foreground">
              Will personalize with your taste soon
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-left text-sm text-foreground/80 transition hover:border-emerald-400/40 hover:bg-emerald-500/10"
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
