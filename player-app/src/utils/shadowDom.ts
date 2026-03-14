export const createShadowContainer = (parentElementId: string) => {
  const parentElement = document.getElementById(parentElementId);
  if (!parentElement) {
    console.error(`Parent element with id "${parentElementId}" not found`);
    return { appPlaceholder: null, shadowRoot: null };
  }

  const host = document.createElement("div");
  host.id = `${parentElementId}-host`;
  parentElement.appendChild(host);

  const shadowRoot = host.attachShadow({ mode: "open" });

  const appPlaceholder = document.createElement("div");
  appPlaceholder.id = `${parentElementId}-app`;
  shadowRoot.appendChild(appPlaceholder);

  return { appPlaceholder, shadowRoot };
};

export const deleteShadowContainer = (parentElementId: string) => {
  const host = document.getElementById(`${parentElementId}-host`);
  if (host) {
    host.remove();
  }
};

export const styleShadowContainer = (shadowRoot: ShadowRoot) => {
  const style = document.createElement("style");
  style.textContent = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :host {
      display: block;
      all: initial;
      font-family: Arial, sans-serif;
    }
  `;
  shadowRoot.appendChild(style);
};
