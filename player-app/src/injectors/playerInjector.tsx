import { createSignal, createEffect } from "solid-js";
import PlayerApp from "../components/PlayerApp";
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
    ensurePlayerStyles(shadowRoot);
    playerInstance = component(appPlaceholder);
  }
};

const ensurePlayerStyles = (shadowRoot: ShadowRoot) => {
  const head = document.head;
  if (!head) {
    return;
  }

  const styleNodes = head.querySelectorAll("style, link[rel=\"stylesheet\"]");
  styleNodes.forEach((node) => {
    if (node instanceof HTMLStyleElement) {
      const style = document.createElement("style");
      style.textContent = node.textContent || "";
      shadowRoot.appendChild(style);
    } else if (node instanceof HTMLLinkElement) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = node.href;
      shadowRoot.appendChild(link);
    }
  });
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
