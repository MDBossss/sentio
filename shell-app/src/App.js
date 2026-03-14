import React, { useEffect } from "react";

// Lazy load the injector from the remote
const searchInjectorPromise = import("searchApp/searchInjector");

const parentContainerId = "search-container";

/**
 * Shell App - Consumes the Search App injector
 */
const App = () => {
  useEffect(() => {
    let mounted = true;

    const initializeSearch = async () => {
      try {
        const module = await searchInjectorPromise;
        if (mounted && typeof module.inject === "function") {
          console.log("Injecting Search App...");
          module.inject(parentContainerId);
        }
      } catch (error) {
        console.error("Failed to load Search App injector:", error);
      }
    };

    initializeSearch();

    return () => {
      mounted = false;
      searchInjectorPromise.then((module) => {
        if (typeof module.unmount === "function") {
          module.unmount(parentContainerId);
        }
      });
    };
  }, []);

  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Shell App</h1>
        <p style={styles.headerSubtitle}>
          This shell app consumes the Search App via module federation
        </p>
      </header>

      <main style={styles.main}>
        <div style={styles.section}>
          <h2>Integrated Search Component</h2>
          <div id={parentContainerId} style={styles.container} />
        </div>
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 Shell App - Module Federation Example</p>
      </footer>
    </div>
  );
};

const styles = {
  shell: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#282c34",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
  },
  headerTitle: {
    margin: "0 0 10px 0",
    fontSize: "28px",
  },
  headerSubtitle: {
    margin: 0,
    fontSize: "14px",
    opacity: 0.8,
  },
  main: {
    flex: 1,
    padding: "40px 20px",
  },
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  container: {
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "2px dashed #ddd",
    minHeight: "300px",
  },
  footer: {
    backgroundColor: "#f5f5f5",
    borderTop: "1px solid #ddd",
    padding: "20px",
    textAlign: "center",
    color: "#666",
  },
};

export default App;
