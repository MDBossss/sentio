import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const STORAGE_KEY = "sentio-preferences-form";
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

export const usePreferencesForm = () => {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    familiarity: "",
    genres: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      } catch (e) {
        console.error("Failed to parse stored preferences:", e);
      }
    }
  }, []);

  // Persist to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

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

  const canProceedStep = useCallback(() => {
    if (currentStep === 0) {
      return preferences.familiarity !== "";
    } else if (currentStep === 1) {
      return preferences.genres.length > 0;
    }
    return false;
  }, [currentStep, preferences]);

  const nextStep = useCallback(() => {
    if (currentStep === 0 && preferences.familiarity) {
      setCurrentStep(1);
    }
  }, [currentStep, preferences.familiarity]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const savePreferences = useCallback(async () => {
    if (!userId) {
      setError("User not authenticated");
      return false;
    }

    if (!canProceedStep()) {
      setError("Please complete all required fields");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:3010/api/users/${userId}/preferences`,
        {
          familiarity: preferences.familiarity,
          genres: preferences.genres,
        }
      );

      if (response.status === 200) {
        // Clear localStorage after successful save
        localStorage.removeItem(STORAGE_KEY);
        return true;
      }
      return false;
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : "Failed to save preferences";
      setError(errorMsg);
      console.error("Error saving preferences:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId, preferences, canProceedStep]);

  const clearForm = useCallback(() => {
    setPreferences({ familiarity: "", genres: [] });
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
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
    clearForm,
    allGenres: ALL_GENRES,
  };
};
