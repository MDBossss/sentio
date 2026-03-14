import { createApp } from 'vue';
import App from './components/LibraryApp.vue';

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
