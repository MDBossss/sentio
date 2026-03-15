import React from 'react';
import { createRoot } from 'react-dom/client';
import shadowStyles from '../styles.css?inline';
import { styleShadowContainer, createShadowContainer, deleteShadowContainer } from '../utils/shadowDom';
import SearchApp from '../components/SearchApp';

const roots: Record<string, any> = {};

export const injectElement = (
  parentElementId: string,
  component: React.ReactNode
) => {
  const { appPlaceholder, shadowRoot } = createShadowContainer(parentElementId);
  if (appPlaceholder && shadowRoot) {
    styleShadowContainer(shadowRoot);
    injectTailwindStyles(shadowRoot);
    const root = createRoot(appPlaceholder);
    roots[parentElementId] = root;
    root.render(component);
  }
};

const injectTailwindStyles = (shadowRoot: ShadowRoot) => {
  const style = document.createElement('style');
  style.textContent = shadowStyles;
  shadowRoot.appendChild(style);
};

export const unmountElement = (parentElementId: string) => {
  deleteShadowContainer(parentElementId);
  const root = roots[parentElementId];
  if (root) {
    root.unmount();
    delete roots[parentElementId];
  }
};

export const inject = (parentElementId: string) =>
  injectElement(parentElementId, <SearchApp />);

export const unmount = (parentElementId: string) =>
  unmountElement(parentElementId);
