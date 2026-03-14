# Library App - Exposed Remote Component (Vue.js)

## What is the Library App?

The Library App is a **Vue.js + Webpack** application that exposes itself as a Module Federation remote. Other applications can consume it and inject its components into their DOM.

## Key Features

- ✅ Vue.js 3
- ✅ Module Federation setup for component exposure
- ✅ Shadow DOM integration for style isolation
- ✅ Webpack 5 configuration
- ✅ Development server with HMR
- ✅ Single File Components (.vue)

## Exposed Module

**Module Name:** `libraryApp/libraryInjector`

**Exports:**

- `inject(parentElementId: string)` - Mounts the Library App
- `unmount(parentElementId: string)` - Unmounts the Library App

## Usage

The library app is consumed by the shell-app. See [../README.md](../README.md) for complete usage instructions.

## Development

```bash
cd library-app
npm install
npm start
```

Visit `http://localhost:3002` to test the app in standalone mode.

## Building

```bash
npm run build
```

The built files will be in the `dist/` directory. The `remoteEntry.js` file is the entry point for Module Federation consumers.
