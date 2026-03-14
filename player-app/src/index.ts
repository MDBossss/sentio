// Entry point for the module
import('./bootstrap').then((module) => {
  console.log('Player App Bootstrap loaded');
  if (typeof module.setupPlayerApp === 'function') {
    module.setupPlayerApp();
  }
}).catch((error) => {
  console.error('Failed to load Player App Bootstrap:', error);
});
