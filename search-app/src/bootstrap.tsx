import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchApp from "./components/SearchApp";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

console.log("BOOTSTRAP: clerkPubKey =", clerkPubKey);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

if (!clerkPubKey) {
  console.error(
    "REACT_APP_CLERK_PUBLISHABLE_KEY is not set in environment variables",
  );
}

export function setupSearchApp() {
  const renderApp = () => {
    const rootElement = document.getElementById("search-app");
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <ClerkProvider publishableKey={clerkPubKey}>
              <SearchApp />
            </ClerkProvider>
          </QueryClientProvider>
        </React.StrictMode>,
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