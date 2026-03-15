import React, { useMemo } from "react";
import { getTimeOfDay } from "@/utils/time";
import { timePresets } from "@/constants/presets";

export const PresetsSection: React.FC = () => {
  const presets = useMemo(() => {
    const key = getTimeOfDay();
    return timePresets[key] ?? timePresets.evening;
  }, []);

  return (
    <div className="border-t border-border/60 pt-5">
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
  );
};
