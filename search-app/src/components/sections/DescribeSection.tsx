import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { PresetsSection } from "./PresetsSection";

interface DescribeSectionProps {
  theme: "dark" | "light";
}

export const DescribeSection: React.FC<DescribeSectionProps> = ({ theme }) => {
  const [prompt, setPrompt] = useState("");

  const handlePresetSelect = (description: string) => {
    console.log(`[DescribeSection] Preset selected: "${description}"`);
    setPrompt(description);
  };

  return (
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
          className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-wider ${theme === "light" ? "text-white" : "text-zinc-950"} shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300`}
        >
          <Sparkles size={14} />
          Generate
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-4">
        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tell Sentio the vibe... dreamy synths, late-night drive, soft percussion, no vocals."
          className="w-full resize-none rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
        />
      </div>

      <PresetsSection onPresetSelect={handlePresetSelect} />
    </section>
  );
};
