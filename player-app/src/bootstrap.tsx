import PlayerApp from './components/PlayerApp';

function applyTheme() {
  const storedTheme = localStorage.getItem('sentio-theme');
  const theme = storedTheme === 'light' ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

applyTheme();

window.addEventListener('sentio-theme-change', (event) => {
  const detail = (event as CustomEvent).detail as { theme?: 'dark' | 'light' };
  if (detail?.theme) {
    document.documentElement.classList.toggle('dark', detail.theme === 'dark');
  }
});

window.addEventListener('sentio-theme-request', () => {
  const storedTheme = localStorage.getItem('sentio-theme');
  const theme = storedTheme === 'light' ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark', theme === 'dark');
  window.dispatchEvent(new CustomEvent('sentio-theme-change', { detail: { theme } }));
});

/**
 * Bootstrap entry point for standalone testing
 */
export function setupPlayerApp() {
  const renderApp = () => {
    const rootElement = document.getElementById('player-app');
    if (rootElement) {
      PlayerApp(rootElement);
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
