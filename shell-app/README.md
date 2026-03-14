# Shell App - Host Application

## What is the Shell App?

The Shell App is a **React + Webpack** application that acts as the host/container for remotely loaded modules. It consumes the Search App via Module Federation and injects it into its own DOM.

## Key Features

- ✅ React 18
- ✅ Module Federation consumer configuration
- ✅ Dynamic module loading at runtime
- ✅ Webpack 5 configuration
- ✅ Development server with HMR

## Module Federation Configuration

**Consumed Remotes:**

- `searchApp` from `http://localhost:3001/remoteEntry.js`

## How It Works

1. The Shell App loads at `http://localhost:3000`
2. When the app mounts, it dynamically imports the search injector from the Search App
3. The injector function is called with a container element ID
4. The Search App renders inside the specified container with isolated styles (via Shadow DOM)

## Development

```bash
cd shell-app
npm install
npm start
```

Visit `http://localhost:3000` to view the shell app with the injected search app.

**Important:** The Search App must be running on `http://localhost:3001` before starting the Shell App.

## Environment Variables

- `SEARCH_APP_URL` - URL of the Search App's remote entry point (default: `http://localhost:3001`)

## Building

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Code Structure

- **App.js** - Main component that handles the injection lifecycle
- **bootstrap.js** - React app setup and mounting
- **index.js** - Entry point with async module loading
- **webpack.config.js** - Module Federation and build configuration

See [../README.md](../README.md) for the complete project documentation.
