import { createApp } from "vue";
import {
  createShadowContainer,
  deleteShadowContainer,
  styleShadowContainer,
} from "../utils/shadowDom";
import LibraryApp from "../components/LibraryApp.vue";
import shadowStyles from "../styles.css?inline";

const mounts = {};

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
    const app = createApp(component);
    mounts[parentElementId] = { app, element: appPlaceholder };
    app.mount(appPlaceholder);
  }
};

export const unmountElement = (parentElementId) => {
  deleteShadowContainer(parentElementId);
  const mount = mounts[parentElementId];
  if (mount) {
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
