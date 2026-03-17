import React, { useEffect, useRef } from "react";

// Lazy load the injectors from the remotes
const searchInjectorPromise = import("searchApp/searchInjector");
const libraryInjectorPromise = import("libraryApp/libraryInjector");
const playerInjectorPromise = import("playerApp/playerInjector");

const searchContainerId = "search-container";
const libraryContainerId = "library-container";
const playerContainerId = "player-container";

/**
 * MainApp - Authenticated view that loads micro-frontends
 * (Previously the main App.js)
 */
export const MainApp = () => {
  const currentThemeRef = useRef("dark");

  useEffect(() => {
    let mounted = true;

    const applyTheme = (theme) => {
      console.log("[Shell] applyTheme:", theme);
      const root = document.documentElement;
      root.classList.toggle("dark", theme === "dark");
      localStorage.setItem("sentio-theme", theme);
      currentThemeRef.current = theme;
      window.dispatchEvent(
        new CustomEvent("sentio-theme-change", { detail: { theme } }),
      );
    };

    const getInitialTheme = () => {
      const stored = localStorage.getItem("sentio-theme");
      if (stored === "light" || stored === "dark") {
        console.log("[Shell] getInitialTheme: stored", stored);
        return stored;
      }
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)",
      )?.matches;
      const fallback = prefersDark ? "dark" : "light";
      console.log("[Shell] getInitialTheme: fallback", fallback);
      return fallback;
    };

    const handleThemeRequest = (event) => {
      const detail = event?.detail || {};
      console.log("[Shell] theme request:", detail);
      if (detail.theme === "light" || detail.theme === "dark") {
        applyTheme(detail.theme);
        return;
      }
      if (detail.toggle) {
        applyTheme(currentThemeRef.current === "dark" ? "light" : "dark");
      }
    };

    applyTheme(getInitialTheme());
    window.addEventListener("sentio-theme-request", handleThemeRequest);

    const initializeSearch = async () => {
      try {
        const module = await searchInjectorPromise;
        if (mounted && typeof module.inject === "function") {
          console.log("Injecting Search App...");
          module.inject(searchContainerId);
        }
      } catch (error) {
        console.error("Failed to load Search App injector:", error);
      }
    };

    const initializeLibrary = async () => {
      try {
        const module = await libraryInjectorPromise;
        if (mounted && typeof module.inject === "function") {
          console.log("Injecting Library App...");
          module.inject(libraryContainerId);
        }
      } catch (error) {
        console.error("Failed to load Library App injector:", error);
      }
    };

    const initializePlayer = async () => {
      try {
        const module = await playerInjectorPromise;
        if (mounted && typeof module.inject === "function") {
          console.log("Injecting Player App...");
          module.inject(playerContainerId);
        }
      } catch (error) {
        console.error("Failed to load Player App injector:", error);
      }
    };

    initializeSearch();
    initializeLibrary();
    initializePlayer();

    return () => {
      window.removeEventListener("sentio-theme-request", handleThemeRequest);
      mounted = false;
      searchInjectorPromise.then((module) => {
        if (typeof module.unmount === "function") {
          module.unmount(searchContainerId);
        }
      });
      libraryInjectorPromise.then((module) => {
        if (typeof module.unmount === "function") {
          module.unmount(libraryContainerId);
        }
      });
      playerInjectorPromise.then((module) => {
        if (typeof module.unmount === "function") {
          module.unmount(playerContainerId);
        }
      });
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="flex flex-1 gap-6 p-6">
        <aside className="shrink-0">
          <div id={libraryContainerId} className="h-full overflow-hidden" />
        </aside>

        <main className="flex-1">
          <div id={searchContainerId} className="h-full overflow-hidden" />
        </main>
      </div>

      <footer>
        <div id={playerContainerId} className="w-full" />
      </footer>
    </div>
  );
};
