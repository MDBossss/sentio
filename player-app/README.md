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
