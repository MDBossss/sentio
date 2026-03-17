import React from "react";
import { LoginButton } from "../components/LoginButton";
import { ChevronRight, Music, Sparkles, BrainCircuit } from "lucide-react"; // Assuming lucide-react for icons

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      {/* 1. The "Next.js" Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <Music size={18} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight">sentio</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
          <LoginButton className="bg-white text-black hover:bg-zinc-200 transition-colors px-4 py-2 rounded-full text-sm font-semibold" />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-4 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-8 animate-fade-in">
          <Sparkles size={12} />
          <span>Now powered by GPT-4o Audio</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Music for how <br />
          <span className="text-emerald-500">you actually feel.</span>
        </h1>

        {/* Sub-headline & Latin Meaning */}
        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
          From the Latin <span className="italic text-zinc-200">sentīre</span>:
          to perceive, to feel, to experience. Sentio transforms your current
          emotional state into a perfectly curated Spotify journey.
        </p>

        {/* CTA Area */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <LoginButton />
        </div>

        {/* Feature Grid Style Preview */}
        <div className="mt-32 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BrainCircuit className="text-emerald-500" />}
            title="Emotional Intelligence"
            desc="AI that understands nuance, not just 'happy' or 'sad'."
          />
          <FeatureCard
            icon={<Music className="text-emerald-500" />}
            title="Spotify Native"
            desc="Seamlessly syncs to your library and creates playlists in seconds."
          />
          <FeatureCard
            icon={<Sparkles className="text-emerald-500" />}
            title="Latin Roots"
            desc="Built on the philosophy of deep sensory perception."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-left hover:border-zinc-700 transition-colors group">
    <div className="mb-4 p-2 w-fit rounded-lg bg-zinc-800 group-hover:bg-emerald-500/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);
