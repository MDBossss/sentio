import React, { useEffect, useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { generateUser } from "../utils/useGenerateData";
import { fetchUserById, createUser } from "../api/users";

export const AppWrapper = ({ children }) => {
  const { session, isLoaded } = useSession();
  const [userSynced, setUserSynced] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [theme, setTheme] = useState("dark");

  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("sentio-theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);

    // Update document class for Tailwind dark mode
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const syncUser = async () => {
      // Wait for Clerk to fully load
      if (!isLoaded) {
        return;
      }

      // If no session, user is logged out - proceed without syncing
      if (!session?.user) {
        setUserSynced(true);
        return;
      }

      // User is logged in, sync to database
      try {
        console.log("[AppWrapper] Syncing user with database...");
        const user = generateUser(session.user);
        console.log("[AppWrapper] Generated user data:", user);

        // Store userId on window for micro-frontends to access
        window.sentioUserId = user.id;
        console.log(
          "[AppWrapper] User ID stored on window.sentioUserId:",
          user.id,
        );

        // Check if user exists, or create if needed
        const syncedUser = await fetchUserById(user.id, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });

        if (!syncedUser) {
          throw new Error("Failed to sync user with database");
        }

        console.log("[AppWrapper] User synced successfully:", syncedUser);

        setUserSynced(true);
      } catch (error) {
        console.error("[AppWrapper] Error syncing user:", error);
        setSyncError(error.message);
        setUserSynced(true); // Set to true anyway to allow app to load
      }
    };

    syncUser();
  }, [session?.user?.id, isLoaded]);

  // Show loading skeleton while syncing
  if (!isLoaded || !userSynced) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center transition-colors duration-300 ${
          theme === "dark" ? "bg-[hsl(20_14.3%_4.1%)]" : "bg-[hsl(0_0%_100%)]"
        }`}
      >
        <div className="space-y-6 text-center">
          {/* Animated Spinner */}
          <div className="flex justify-center">
            <div
              className={`h-12 w-12 animate-spin rounded-full border-4 ${
                theme === "dark"
                  ? "border-[hsl(12_6.5%_15.1%)] border-t-[hsl(160_70%_45%)]"
                  : "border-[hsl(60_4.8%_95.9%)] border-t-[hsl(160_84%_39%)]"
              }`}
            ></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p
              className={`text-lg font-medium ${
                theme === "dark"
                  ? "text-[hsl(60_9.1%_97.8%)]"
                  : "text-[hsl(20_14.3%_4.1%)]"
              }`}
            >
              Initializing Sentio
            </p>
            <p
              className={`text-sm ${
                theme === "dark"
                  ? "text-[hsl(24_5.4%_63.9%)]"
                  : "text-[hsl(25_5.3%_44.7%)]"
              }`}
            >
              Setting up your account...
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  theme === "dark"
                    ? "bg-[hsl(160_70%_45%)]"
                    : "bg-[hsl(160_84%_39%)]"
                }`}
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Animation keyframes */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // Show error if sync failed
  if (syncError) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center transition-colors duration-300 ${
          theme === "dark" ? "bg-[hsl(20_14.3%_4.1%)]" : "bg-[hsl(0_0%_100%)]"
        }`}
      >
        <div
          className={`space-y-4 rounded-lg p-6 max-w-md ${
            theme === "dark"
              ? "bg-[hsl(12_6.5%_15.1%)]"
              : "bg-[hsl(60_4.8%_95.9%)]"
          }`}
        >
          <p
            className={`text-center font-semibold ${
              theme === "dark"
                ? "text-[hsl(0_62.8%_30.6%)]"
                : "text-[hsl(0_84.2%_60.2%)]"
            }`}
          >
            Error initializing app
          </p>
          <p
            className={`text-center text-sm ${
              theme === "dark"
                ? "text-[hsl(24_5.4%_63.9%)]"
                : "text-[hsl(25_5.3%_44.7%)]"
            }`}
          >
            {syncError}
          </p>
          <p
            className={`text-center text-xs ${
              theme === "dark"
                ? "text-[hsl(24_5.4%_63.9%)]"
                : "text-[hsl(25_5.3%_44.7%)]"
            }`}
          >
            Please refresh the page and try again
          </p>
        </div>
      </div>
    );
  }

  // User is synced, render the app
  return children;
};
