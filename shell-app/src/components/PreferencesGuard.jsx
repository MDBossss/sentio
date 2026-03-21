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
          `http://localhost:3010/api/users/${userId}/preferences`,
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-[hsl(20_14.3%_4.1%)]">
        <div className="space-y-6 text-center">
          {/* Animated Spinner */}
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[hsl(12_6.5%_15.1%)] border-t-[hsl(160_70%_45%)]"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-[hsl(60_9.1%_97.8%)]">
              Loading your profile
            </p>
            <p className="text-sm text-[hsl(24_5.4%_63.9%)]">
              Setting up your preferences...
            </p>
          </div>
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
