/**
 * Entry point for dynamic module loading
 * Purpose: https://stackoverflow.com/questions/66123283/webpack-module-federation-is-not-working-with-eager-shared-libs
 * This pattern prevents shared library collisions with module federation
 */

import('./bootstrap').then((module) => {
  console.log('Shell App Bootstrap loaded');
  if (typeof module.setupShellApp === 'function') {
    module.setupShellApp();
  } else {
    console.error('setupShellApp is not a function', module);
  }
}).catch((error) => {
  console.error('Failed to load Shell App Bootstrap:', error);
  // Could implement error recovery here
});
