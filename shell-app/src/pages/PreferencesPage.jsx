import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight, AlertCircle, Music } from "lucide-react";
import { PreferenceFamiliaritySelector } from "../components/PreferenceFamiliaritySelector";
import { PreferenceGenreSelector } from "../components/PreferenceGenreSelector";
import { usePreferencesForm } from "../hooks/usePreferencesForm";

export const PreferencesPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [isSavingComplete, setIsSavingComplete] = useState(false);
  const {
    currentStep,
    preferences,
    loading,
    error,
    canProceedStep,
    setFamiliarity,
    toggleGenre,
    nextStep,
    prevStep,
    savePreferences,
    allGenres,
  } = usePreferencesForm();

  // Redirect to /app after successful save
  useEffect(() => {
    if (isSavingComplete) {
      const timer = setTimeout(() => {
        navigate("/app");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSavingComplete, navigate]);

  const handleSave = async () => {
    const success = await savePreferences();
    if (success) {
      setIsSavingComplete(true);
    }
  };

  const handleLogout = () => {
    // User will need to use Clerk's logout button
    // This is a fallback message
    navigate("/");
  };

  if (isSavingComplete) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Success State */}
        <div className="relative z-10 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50">
            <div className="animate-spin w-14 h-14 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-white">
            Preferences Saved!
          </h1>
          <p className="text-lg text-zinc-400 mb-2">
            Your musical preferences are ready.
          </p>
          <p className="text-sm text-zinc-500">
            Redirecting to your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <Music size={18} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight">sentio</span>
        </div>
        <div className="text-sm text-zinc-500">Step {currentStep + 1} of 2</div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-12 pb-24">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3">
            <AlertCircle
              className="text-red-400 flex-shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 0 && (
          <PreferenceFamiliaritySelector
            value={preferences.familiarity}
            onChange={setFamiliarity}
          />
        )}

        {currentStep === 1 && (
          <PreferenceGenreSelector
            genres={preferences.genres}
            allGenres={allGenres}
            onToggleGenre={toggleGenre}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-zinc-800">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-300 hover:text-white hover:bg-zinc-900/50 border border-zinc-800"
            }`}
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <div className="flex-1" />

          {currentStep === 0 ? (
            <button
              onClick={nextStep}
              disabled={!canProceedStep()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                canProceedStep()
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!canProceedStep() || loading}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                canProceedStep() && !loading
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-transparent border-t-white rounded-full" />
                  Saving...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>
          )}
        </div>

        {/* Logout Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            Want to start fresh?{" "}
            <a
              href="/#"
              onClick={handleLogout}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Sign out
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};
