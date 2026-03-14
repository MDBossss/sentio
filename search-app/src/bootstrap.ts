import React from "react";
import { createRoot } from "react-dom/client";

/**
 * Bootstrap entry point for standalone testing
 */
export function setupSearchApp() {
  const renderApp = () => {
    const rootElement = document.getElementById("search-app");
    if (rootElement) {
      const { SearchApp } = require("./components/SearchApp");
      const root = createRoot(rootElement);
      root.render(
        React.createElement(
          React.StrictMode,
          null,
          React.createElement(SearchApp.default),
        ),
      );
    } else {
      console.error("Could not find element with id 'search-app'");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderApp);
  } else {
    renderApp();
  }
}
