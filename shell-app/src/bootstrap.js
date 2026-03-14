import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Bootstrap function to mount the React app
 */
export function setupShellApp() {
  const renderApp = () => {
    const rootElement = document.getElementById('shell-app-root');
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else {
      console.error("Could not find element with id 'shell-app-root'");
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
}
