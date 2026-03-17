import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { AppRouter } from './components/AppRouter';
import { AppWrapper } from './components/AppWrapper';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error('REACT_APP_CLERK_PUBLISHABLE_KEY is not set in environment variables');
}

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
          <ClerkProvider publishableKey={clerkPubKey}>
            <AppWrapper>
              <AppRouter />
            </AppWrapper>
          </ClerkProvider>
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
