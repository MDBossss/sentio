# Player App - Exposed Remote Component (Solid.js)

## What is the Player App?

The Player App is a **Solid.js + TypeScript + Webpack** application that exposes itself as a Module Federation remote. It provides a music player interface that can be consumed by other applications.

## Key Features

- ✅ Solid.js 1.8+ - Reactive JavaScript framework
- ✅ TypeScript support
- ✅ Module Federation setup for component exposure
- ✅ Shadow DOM integration for style isolation
- ✅ Webpack 5 configuration
- ✅ Development server with HMR
- ✅ Play/Pause controls, volume slider, track info

## Shadow DOM + Tailwind Setup

Tailwind styles are compiled and **injected into the shadow root** so they apply inside the Player App's Shadow DOM. The shell app's global styles do not penetrate the shadow boundary.

Key pieces:

- `styles.css` contains the Tailwind directives.
- `playerInjector.tsx` imports `styles.css?inline` and injects it as a `<style>` tag inside the shadow root.
- `webpack.config.js` handles `?inline` CSS using `to-string-loader` so Tailwind compiles to a string instead of injecting into `document.head`.

Why this is needed:

- Module Federation loads `playerInjector` directly, so `index.ts` (which normally imports `styles.css`) is not guaranteed to run.
- Shadow DOM isolates styles, so any CSS added to `document.head` will not affect the player UI.

If Tailwind looks missing:
1. Restart the **player app dev server** (webpack config changes need a full restart).
2. Hard-refresh the shell app.

## Exposed Module

**Module Name:** `playerApp/playerInjector`

**Exports:**

- `inject(parentElementId: string)` - Mounts the Player App
- `unmount(parentElementId: string)` - Unmounts the Player App

## Usage

The player app is consumed by the shell-app as a footer. See [../README.md](../README.md) for complete usage instructions.

## Development

```bash
cd player-app
npm install
npm start
```

Visit `http://localhost:3003` to test the app in standalone mode.

## Building

```bash
npm run build
```

The built files will be in the `dist/` directory. The `remoteEntry.js` file is the entry point for Module Federation consumers.
