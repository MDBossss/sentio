import React, { useEffect } from "react";

// Lazy load the injectors from the remotes
const searchInjectorPromise = import("searchApp/searchInjector");
const libraryInjectorPromise = import("libraryApp/libraryInjector");

const searchContainerId = "search-container";
const libraryContainerId = "library-container";

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

    initializeSearch();
    initializeLibrary();

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
    };
  }, []);

  return (
    <div style={styles.shell}>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h1 style={styles.logo}>📚 Library</h1>
          </div>
          <div id={libraryContainerId} style={styles.libraryContainer} />
        </aside>

        <main style={styles.mainContent}>
          <div id={searchContainerId} style={styles.searchContainer} />
        </main>
      </div>
    </div>
  );
};

const styles = {
  shell: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#121212",
  },
  container: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#1db954",
    borderRight: "1px solid #1ed760",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarHeader: {
    padding: "20px",
    borderBottom: "1px solid #1ed760",
    backgroundColor: "#1aa34a",
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    color: "white",
    fontWeight: "bold",
  },
  libraryContainer: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "#1db954",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#121212",
    overflow: "hidden",
  },
  searchContainer: {
    flex: 1,
    overflow: "auto",
  },
};

export default App;
