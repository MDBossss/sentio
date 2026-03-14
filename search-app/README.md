# Search App - Exposed Remote Component

## What is the Search App?

The Search App is a **React + TypeScript + Webpack** application that exposes itself as a Module Federation remote. Other applications can consume it and inject its components into their DOM.

## Key Features

- ✅ React 18 with TypeScript
- ✅ Module Federation setup for component exposure
- ✅ Shadow DOM integration for style isolation
- ✅ Webpack 5 configuration
- ✅ Development server with HMR

## Exposed Module

**Module Name:** `searchApp/searchInjector`

**Exports:**

- `inject(parentElementId: string)` - Mounts the Search App
- `unmount(parentElementId: string)` - Unmounts the Search App

## Usage

The search app is consumed by the shell-app. See [../README.md](../README.md) for complete usage instructions.

## Development

```bash
cd search-app
npm install
npm start
```

Visit `http://localhost:3001` to test the app in standalone mode.

## Building

```bash
npm run build
```

The built files will be in the `dist/` directory. The `remoteEntry.js` file is the entry point for Module Federation consumers.
