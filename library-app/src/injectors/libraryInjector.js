import { createApp } from "vue";
import {
  createShadowContainer,
  deleteShadowContainer,
  styleShadowContainer,
} from "../utils/shadowDom";
import LibraryApp from "../components/LibraryApp.vue";
import shadowStyles from "../styles.css?inline";

const mounts = {};
const THEME_EVENT = "sentio-theme-change";
const THEME_KEY = "sentio-theme";

const resolveTheme = () => {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    // ignore storage errors
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const applyTheme = (shadowRoot, theme) => {
  const isDark = theme === "dark";
  shadowRoot.host.classList.toggle("dark", isDark);
};

const injectTailwindStyles = (shadowRoot) => {
  const style = document.createElement("style");
  style.textContent = shadowStyles;
  shadowRoot.appendChild(style);
};

export const injectElement = (parentElementId, component) => {
  const { appPlaceholder, shadowRoot } = createShadowContainer(parentElementId);
  if (appPlaceholder && shadowRoot) {
    styleShadowContainer(shadowRoot);
    injectTailwindStyles(shadowRoot);

    const initialTheme = resolveTheme();
    console.debug("[library] initial theme", initialTheme);
    applyTheme(shadowRoot, initialTheme);

    const handleThemeChange = (event) => {
      const nextTheme = event?.detail?.theme;
      console.debug("[library] theme change event", event?.detail);
      if (nextTheme !== "light" && nextTheme !== "dark") {
        console.debug("[library] theme ignored", nextTheme);
        return;
      }
      console.debug("[library] applying theme", nextTheme);
      applyTheme(shadowRoot, nextTheme);
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);

    const app = createApp(component);
    mounts[parentElementId] = {
      app,
      element: appPlaceholder,
      themeHandler: handleThemeChange,
    };
    app.mount(appPlaceholder);
  }
};

export const unmountElement = (parentElementId) => {
  deleteShadowContainer(parentElementId);
  const mount = mounts[parentElementId];
  if (mount) {
    if (mount.themeHandler) {
      window.removeEventListener(THEME_EVENT, mount.themeHandler);
    }
    mount.app.unmount();
    delete mounts[parentElementId];
  }
};

export const inject = (parentElementId) => {
  injectElement(parentElementId, LibraryApp);
};

export const unmount = (parentElementId) => {
  unmountElement(parentElementId);
};
