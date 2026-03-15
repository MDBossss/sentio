import React, { useEffect } from "react";

// Lazy load the injectors from the remotes
const searchInjectorPromise = import("searchApp/searchInjector");
const libraryInjectorPromise = import("libraryApp/libraryInjector");
const playerInjectorPromise = import("playerApp/playerInjector");

const searchContainerId = "search-container";
const libraryContainerId = "library-container";
const playerContainerId = "player-container";

/**
 * Shell App - Consumes Search App and Library App injectors
 */
const App = () => {
  useEffect(() => {
    let mounted = true;

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
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
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



export default App;
