import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, SignedIn } from "@clerk/clerk-react";
import axios from "axios";
import { MainApp } from "./MainApp";

/**
 * PreferencesGuard - Checks if user has saved preferences
 * If not, redirects to /preferences
 * If yes, renders MainApp
 */
export const PreferencesGuard = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasPreferences, setHasPreferences] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const checkPreferences = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3010/api/users/${userId}/preferences`
        );

        const { preferences } = response.data;

        if (preferences === null) {
          // No preferences saved, redirect to preferences page
          navigate("/preferences", { replace: true });
        } else {
          // Preferences exist, allow access to main app
          setHasPreferences(true);
        }
      } catch (err) {
        console.error("Error checking preferences:", err);
        // On error, redirect to preferences (err on side of caution)
        navigate("/preferences", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkPreferences();
  }, [userId, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/50">
            <div className="animate-spin w-10 h-10 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400" />
          </div>
          <p className="text-sm text-zinc-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (hasPreferences) {
    return <MainApp />;
  }

  return null;
};
