import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import shadowStyles from "../styles.css?inline";
import {
  styleShadowContainer,
  createShadowContainer,
  deleteShadowContainer,
} from "../utils/shadowDom";
import SearchApp from "../components/SearchApp";

const THEME_STORAGE_KEY = "sentio-theme";
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  console.error(
    "REACT_APP_CLERK_PUBLISHABLE_KEY is not set in environment variables",
  );
}

const roots: Record<string, { root: any; cleanup?: () => void }> = {};

const getInitialTheme = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  )?.matches;
  if (prefersDark) {
    return "dark";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const applyThemeToShadow = (shadowRoot: ShadowRoot, theme: string) => {
  const host = shadowRoot.host as HTMLElement;
  host.classList.toggle("dark", theme === "dark");
  host.classList.toggle("light", theme === "light");
};

export const injectElement = (
  parentElementId: string,
  component: React.ReactNode,
) => {
  const { appPlaceholder, shadowRoot } = createShadowContainer(parentElementId);
  if (appPlaceholder && shadowRoot) {
    styleShadowContainer(shadowRoot);
    injectTailwindStyles(shadowRoot);
    const initialTheme = getInitialTheme();
    console.debug(
      "[search-app] initial theme from storage or document:",
      initialTheme,
    );
    applyThemeToShadow(shadowRoot, initialTheme);

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme?: string }>;
      console.debug(
        "[search-app] theme event received:",
        customEvent.detail?.theme,
      );
      if (customEvent.detail?.theme) {
        applyThemeToShadow(shadowRoot, customEvent.detail.theme);
      }
    };

    console.debug("[search-app] listening for theme changes");
    window.addEventListener("sentio-theme-change", handleThemeChange);

    const root = createRoot(appPlaceholder);
    roots[parentElementId] = {
      root,
      cleanup: () =>
        window.removeEventListener("sentio-theme-change", handleThemeChange),
    };
    root.render(component);
  }
};

const injectTailwindStyles = (shadowRoot: ShadowRoot) => {
  const style = document.createElement("style");
  style.textContent = shadowStyles;
  shadowRoot.appendChild(style);
};

export const unmountElement = (parentElementId: string) => {
  deleteShadowContainer(parentElementId);
  const mount = roots[parentElementId];
  if (mount) {
    mount.cleanup?.();
    mount.root.unmount();
    delete roots[parentElementId];
  }
};

export const inject = (parentElementId: string) =>
  injectElement(
    parentElementId,
    <ClerkProvider publishableKey={clerkPubKey}>
      <SearchApp />
    </ClerkProvider>,
  );

export const unmount = (parentElementId: string) =>
  unmountElement(parentElementId);
