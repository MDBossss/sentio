import shadowStyles from "../styles.css?inline";
import {
  createShadowContainer,
  deleteShadowContainer,
  styleShadowContainer,
} from "../utils/shadowDom";

let playerInstance: any = null;

const THEME_EVENT = "sentio-theme-change";
const THEME_STORAGE_KEY = "sentio-theme";
const themeListeners: Record<string, (event: Event) => void> = {};

const applyTheme = (shadowRoot: ShadowRoot, theme: string) => {
  console.log("[player-app] apply theme", theme);
  shadowRoot.host.classList.toggle("dark", theme === "dark");
};

export const injectElement = (parentElementId: string, component: any) => {
  const { appPlaceholder, shadowRoot } = createShadowContainer(parentElementId);
  if (appPlaceholder && shadowRoot) {
    styleShadowContainer(shadowRoot);
    injectTailwindStyles(shadowRoot);

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
    console.log("[player-app] initial theme", storedTheme);
    applyTheme(shadowRoot, storedTheme);

    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme?: string }>;
      const theme = customEvent?.detail?.theme;
      console.log("[player-app] theme event received", theme);
      if (theme) {
        applyTheme(shadowRoot, theme);
      }
    };

    window.addEventListener(THEME_EVENT, listener);
    themeListeners[parentElementId] = listener;

    playerInstance = component(appPlaceholder);
  }
};

const injectTailwindStyles = (shadowRoot: ShadowRoot) => {
  const style = document.createElement("style");
  style.textContent = shadowStyles;
  shadowRoot.appendChild(style);
};

export const unmountElement = (parentElementId: string) => {
  const listener = themeListeners[parentElementId];
  if (listener) {
    window.removeEventListener(THEME_EVENT, listener);
    delete themeListeners[parentElementId];
  }
  if (playerInstance) {
    playerInstance?.dispose?.();
  }
  deleteShadowContainer(parentElementId);
};

export const inject = (parentElementId: string) => {
  injectElement(parentElementId, (container: HTMLElement) => {
    import("../components/PlayerApp").then((mod) => {
      const PlayerComponent = mod.default;
      const cleanup = PlayerComponent(container);
      return { dispose: cleanup };
    });
  });
};

export const unmount = (parentElementId: string) => {
  unmountElement(parentElementId);
};
