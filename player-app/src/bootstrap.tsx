import { render } from 'solid-js/web';
import PlayerApp from './components/PlayerApp';

/**
 * Bootstrap entry point for standalone testing
 */
export function setupPlayerApp() {
  const renderApp = () => {
    const rootElement = document.getElementById('player-app');
    if (rootElement) {
      render(() => <PlayerApp />, rootElement);
    } else {
      console.error("Could not find element with id 'player-app'");
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
}
