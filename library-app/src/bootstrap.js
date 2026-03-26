import { createApp } from 'vue';
import App from './components/LibraryApp.vue';

function applyTheme() {
  const storedTheme = localStorage.getItem('sentio-theme');
  const theme = storedTheme === 'light' ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

applyTheme();

window.addEventListener('sentio-theme-change', (event) => {
  const detail = event.detail;
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
 * Bootstrap function to mount the Vue app
 */
export function setupLibraryApp() {
  const renderApp = () => {
    const rootElement = document.getElementById('library-app-root');
    if (rootElement) {
      const app = createApp(App);
      app.mount(rootElement);
    } else {
      console.error("Could not find element with id 'library-app-root'");
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
}
