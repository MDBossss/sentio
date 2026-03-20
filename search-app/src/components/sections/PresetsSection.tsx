import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Preset } from "@/api/playlists";
import { usePresets } from "@/hooks/usePresets";

interface PresetsSectionProps {
  onPresetSelect: (description: string) => void;
}

export const PresetsSection: React.FC<PresetsSectionProps> = ({
  onPresetSelect,
}) => {
  const { userId, isLoaded } = useAuth();
  const { data: presets = [], isLoading, error } = usePresets(userId, isLoaded);

  const handlePresetClick = (preset: Preset) => {
    console.log(
      `[UI] Preset clicked: "${preset.text}" -> "${preset.description}"`,
    );
    onPresetSelect(preset.description);
  };

  return (
    <div className="border-t border-border/60 pt-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Presets for right now
        </p>
        {error && <p className="text-xs text-destructive">{error.message}</p>}
        {isLoading && (
          <p className="text-xs text-muted-foreground">Loading...</p>
        )}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => (
          <button
            key={`${preset.genre}-${preset.text}`}
            onClick={() => handlePresetClick(preset)}
            type="button"
            className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-left text-sm text-foreground/80 transition hover:border-emerald-400/40 hover:bg-emerald-500/10"
          >
            <div className="flex items-center gap-2">
              <span>{preset.emoji}</span>
              <span>{preset.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
