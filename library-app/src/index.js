import './styles.css';

// Entry point for dynamic module loading
import('./bootstrap').then((module) => {
  console.log('Library App Bootstrap loaded');
  if (typeof module.setupLibraryApp === 'function') {
    module.setupLibraryApp();
  }
}).catch((error) => {
  console.error('Failed to load Library App Bootstrap:', error);
});
