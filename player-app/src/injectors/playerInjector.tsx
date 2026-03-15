import shadowStyles from "../styles.css?inline";
import {
  createShadowContainer,
  deleteShadowContainer,
  styleShadowContainer,
} from "../utils/shadowDom";

let playerInstance: any = null;

export const injectElement = (parentElementId: string, component: any) => {
  const { appPlaceholder, shadowRoot } = createShadowContainer(parentElementId);
  if (appPlaceholder && shadowRoot) {
    styleShadowContainer(shadowRoot);
    injectTailwindStyles(shadowRoot);
    playerInstance = component(appPlaceholder);
  }
};

const injectTailwindStyles = (shadowRoot: ShadowRoot) => {
  const style = document.createElement("style");
  style.textContent = shadowStyles;
  shadowRoot.appendChild(style);
};

export const unmountElement = (parentElementId: string) => {
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
