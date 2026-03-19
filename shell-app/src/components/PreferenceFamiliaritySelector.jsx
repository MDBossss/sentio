import React from "react";
import { BarChart3, Zap, Shuffle } from "lucide-react";

export const PreferenceFamiliaritySelector = ({ value, onChange }) => {
  const options = [
    {
      id: "mainstream",
      label: "Mainstream",
      description:
        "Popular hits and well-known artists. Perfect for current trends.",
      icon: BarChart3,
    },
    {
      id: "discovery",
      label: "Discovery",
      description:
        "Explore hidden gems and emerge artists. Great for finding new favorites.",
      icon: Zap,
    },
    {
      id: "mixed",
      label: "Mixed",
      description:
        "A balanced blend of popular and emerging music for variety.",
      icon: Shuffle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">
          Music Familiarity
        </h2>
        <p className="text-zinc-400">How popular does your music taste lean?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left h-full ${
                isSelected
                  ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                  : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`mb-3 p-3 w-fit rounded-lg transition-all ${
                    isSelected
                      ? "bg-emerald-500/30"
                      : "bg-zinc-800 group-hover:bg-zinc-700"
                  }`}
                >
                  <Icon
                    size={24}
                    className={
                      isSelected ? "text-emerald-400" : "text-zinc-400"
                    }
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isSelected ? "text-emerald-400" : "text-white"
                  }`}
                >
                  {option.label}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {option.description}
                </p>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-emerald-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
