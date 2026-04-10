import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ChevronLeft, Save, AlertCircle } from "lucide-react";
import axios from "axios";
import { PreferenceFamiliaritySelector } from "../components/PreferenceFamiliaritySelector";
import { PreferenceGenreSelector } from "../components/PreferenceGenreSelector";

const ALL_GENRES = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Jazz",
  "Classical",
  "Electronic",
  "Country",
  "Latin",
  "K-pop",
  "Indie",
  "Metal",
  "Soul",
  "Reggae",
  "Folk",
  "Ambient",
  "Blues",
  "Disco",
  "Top-40",
  "Podcast",
];

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3010";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [preferences, setPreferences] = useState({
    familiarity: "",
    genres: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/users/${userId}/preferences`,
        );
        if (response.data.preferences) {
          setPreferences({
            familiarity: response.data.preferences.familiarity || "",
            genres: response.data.preferences.genres || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch preferences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userId]);

  const setFamiliarity = useCallback((value) => {
    setPreferences((prev) => ({ ...prev, familiarity: value }));
  }, []);

  const toggleGenre = useCallback((genre) => {
    setPreferences((prev) => {
      const newGenres = prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: newGenres };
    });
  }, []);

  const canSave = preferences.familiarity !== "" && preferences.genres.length > 0;

  const handleSave = async () => {
    if (!canSave || saving) return;

    setSaving(true);
    setError(null);

    try {
      await axios.put(
        `${API_BASE_URL}/api/users/${userId}/preferences`,
        {
          familiarity: preferences.familiarity,
          genres: preferences.genres,
        },
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/app");
      }, 1500);
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : "Failed to save preferences";
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-transparent border-t-emerald-400 rounded-full" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="relative z-10 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50">
            <svg
              className="w-8 h-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-white">
            Preferences Saved!
          </h1>
          <p className="text-lg text-zinc-400 mb-2">
            Your musical preferences have been updated.
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
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <nav className="relative z-20 px-6 py-8">
        <button
          onClick={() => navigate("/app")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900/50 transition-all"
        >
          <ChevronLeft size={18} />
          Back
        </button>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Settings</h1>
          <p className="text-zinc-400">
            Update your musical preferences to personalize your experience.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3">
            <AlertCircle
              className="text-red-400 flex-shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <PreferenceFamiliaritySelector
          value={preferences.familiarity}
          onChange={setFamiliarity}
        />

        <div className="my-12 border-t border-zinc-800" />

        <PreferenceGenreSelector
          genres={preferences.genres}
          allGenres={ALL_GENRES}
          onToggleGenre={toggleGenre}
        />

        <div className="flex items-center justify-end gap-4 mt-12 pt-8 border-t border-zinc-800">
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 border border-zinc-800 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!canSave || saving}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
              canSave && !saving
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-transparent border-t-white rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Preferences
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};