# Module Federation Example: Spotify-like Layout

This project demonstrates **Module Federation** with a Spotify-inspired layout featuring a shell app consuming three remote apps: search (middle), library (sidebar), and a player (footer).

## Project Structure

```
sentio/
├── search-app/          # Remote app 1 (React + Webpack + TypeScript)
│   │                     # Exposed: Search/Album Results
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── injectors/     # Injector that exposes the app
│   │   ├── utils/         # Shadow DOM utilities
│   │   ├── bootstrap.ts   # Bootstrap function
│   │   └── index.ts       # Entry point
│   ├── public/            # Static files
│   ├── webpack.config.js  # Webpack config with Module Federation
│   │   └── Port: 3001
│   └── package.json
│
├── library-app/         # Remote app 2 (Vue.js + Webpack)
│   │                     # Exposed: Albums/Sidebar Library
│   ├── src/
│   │   ├── components/    # Vue components
│   │   ├── injectors/     # Injector that exposes the app
│   │   ├── utils/         # Shadow DOM utilities
│   │   ├── bootstrap.js   # Bootstrap function
│   │   └── index.js       # Entry point
│   ├── public/            # Static files
│   ├── webpack.config.js  # Webpack config with Module Federation
│   │   └── Port: 3002
│   └── package.json
│
├── player-app/          # Remote app 3 (Solid.js + Webpack + TypeScript)
│   │                     # Exposed: Music Player/Footer
│   ├── src/
│   │   ├── components/    # Solid.js components
│   │   ├── injectors/     # Injector that exposes the app
│   │   ├── utils/         # Shadow DOM utilities
│   │   ├── bootstrap.tsx  # Bootstrap function
│   │   └── index.ts       # Entry point
│   ├── public/            # Static files
│   ├── webpack.config.js  # Webpack config with Module Federation
│   │   └── Port: 3003
│   └── package.json
│
└── shell-app/           # Host app (React + Webpack)
    │                     # Spotify-like Layout: Sidebar + Main + Footer
    ├── src/
    │   ├── App.js         # Main app component (orchestrates all remotes)
    │   ├── bootstrap.js   # Bootstrap function
    │   └── index.js       # Entry point
    ├── public/            # Static files
    ├── webpack.config.js  # Webpack config with Module Federation
    ├── Port: 3000
    └── package.json
```

## Layout

```
┌────────────────────────────────────────────┐
│   📚 Library (Sidebar - Vue.js)            │ Search App (Main - React)
│   ──────────────────────────────────────   │ ─────────────────────────
│   • Album 1                                │ 🔍 Search Results
│   • Album 2                                │ • Album Result 1
│   • Album 3                                │ • Album Result 2
│   (scrollable)                             │ • Album Result 3
└────────────────────────────────────────────┘
│                 Player (Footer - Solid.js)                          │
│ 🎵 Now Playing | ⏮ ▶ ⏭  | 🔊 Volume 70%                           │
└────────────────────────────────────────────────────────────────────┘
```

## How It Works (Shared Pattern Across All Apps)

All three remotes (search, library, player) follow the same flow. The shell app follows a matching pattern to load them.

1) **Module Federation loads a remote injector**  
   The host (`shell-app`) dynamically imports each remote injector at runtime. The injector is the single entry point used by the host to mount/unmount the remote.

2) **Injector mounts the remote into a container**  
   Each injector creates a Shadow DOM container to isolate styles, mounts its framework component (React/Vue/Solid), and keeps a reference to unmount later.

3) **`index` and `bootstrap` enable standalone dev**  
   Each remote app has:
   - `index.*` that lazy-loads `bootstrap.*`
   - `bootstrap.*` that mounts the app into a local DOM element for standalone testing (`/public/index.html`)

This exact approach applies to **search-app**, **library-app**, and **player-app**. The only differences are the framework-specific render/mount calls and root element IDs.

### Shell App (Host - React)
- Dynamically imports `searchApp/searchInjector`, `libraryApp/libraryInjector`, `playerApp/playerInjector`
- Calls `inject(containerId)` to mount each remote
- Calls `unmount(containerId)` on cleanup
- Runs on port **3000**

### Remote Apps (Search, Library, Player)
- Expose an injector function via Module Federation
- Use Shadow DOM to isolate styles and avoid conflicts
- Run on ports **3001**, **3002**, **3003** respectively
- Implement identical `inject`/`unmount` interfaces

## Installation

### Install all dependencies at once:

```bash
npm run install-all
```

or for individual apps:

```bash
cd search-app && npm install
cd shell-app && npm install
cd library-app && npm install
cd player-app && npm install
```

## Running

### Option 1: Run all apps together (recommended)

```bash
npm run start
```

This starts all four apps simultaneously:

- Search App on `http://localhost:3001` (React)
- Library App on `http://localhost:3002` (Vue.js)
- Player App on `http://localhost:3003` (Solid.js)
- Shell App on `http://localhost:3000` (React - Host)

Visit `http://localhost:3000` to see the Spotify-like layout with all remote apps injected!

### Option 2: Run individual apps

Use the same command pattern for any app (search, library, player, shell):

```bash
npm run search-app:start
# App runs on http://localhost:3001
```

### Option 3: Run from an individual app directory

Use the same command pattern for any app:

```bash
cd search-app
npm start
```

### Option 4: With custom remote app URLs

**For Shell App, when remotes are on different URLs:**

```bash
cd shell-app
SEARCH_APP_URL=http://your-search-app-url LIBRARY_APP_URL=http://your-library-app-url PLAYER_APP_URL=http://your-player-app-url npm start
```

## Building for Production

### Build all apps:

```bash
npm run build
```

### Build individual apps:

```bash
npm run search-app:build
npm run library-app:build
npm run player-app:build
npm run shell-app:build
```

## Stopping the Apps

To stop all running apps at once:

```bash
npm run stop
```

This kills all webpack dev server processes.

## Module Federation Configuration

### Search App Exposes:

```javascript
exposes: {
  './searchInjector': './src/injectors/searchInjector.tsx',
}
```

### Library App Exposes:

```javascript
exposes: {
  './libraryInjector': './src/injectors/libraryInjector.js',
}
```

### Player App Exposes:

```javascript
exposes: {
  './playerInjector': './src/injectors/playerInjector.tsx',
}
```

### Shell App Remotes:

```javascript
remotes: {
  searchApp: `searchApp@${searchAppUrl}/remoteEntry.js`,
  libraryApp: `libraryApp@${libraryAppUrl}/remoteEntry.js`,
  playerApp: `playerApp@${playerAppUrl}/remoteEntry.js`,
}
```

## Key Files Explained (Shared Approach for All Apps)

The **search**, **library**, and **player** remotes all use the same three-file pattern:

1) `index.*` → lazy-loads `bootstrap.*`  
2) `bootstrap.*` → mounts the app for standalone dev  
3) `injectors/*Injector.*` → the host-facing API to mount/unmount via Module Federation

This same pattern works across all apps; only the framework-specific mount code and element IDs differ.

### `index.*` (all remotes)
The entry point defers work to `bootstrap` so Module Federation can initialize shared deps before the app mounts.

Example from `search-app/src/index.ts`:
```typescript
// Entry point for the module
import("./bootstrap")
  .then((module) => {
    console.log("Search App Bootstrap loaded");
    if (typeof module.setupSearchApp === "function") {
      module.setupSearchApp();
    }
  })
  .catch((error) => {
    console.error("Failed to load Search App Bootstrap:", error);
  });
```

### `bootstrap.*` (all remotes)
Bootstraps standalone mode by rendering into a local DOM element. This is used when running a remote app by itself (not through the shell).

Example from `search-app/src/bootstrap.ts`:
```typescript
export function setupSearchApp() {
  const renderApp = () => {
    const rootElement = document.getElementById("search-app");
    if (rootElement) {
      const { SearchApp } = require("./components/SearchApp");
      const root = createRoot(rootElement);
      root.render(
        React.createElement(
          React.StrictMode,
          null,
          React.createElement(SearchApp.default),
        ),
      );
    } else {
      console.error("Could not find element with id 'search-app'");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderApp);
  } else {
    renderApp();
  }
}
```

### `injectors/*Injector.*` (all remotes)
This is the **Module Federation contract**. The shell loads these modules and calls `inject(containerId)` / `unmount(containerId)`.

Example from `search-app/src/injectors/searchInjector.tsx`:
```typescript
export const injectElement = (
  parentElementId: string,
  component: React.ReactNode
) => {
  const { appPlaceholder, shadowRoot } = createShadowContainer(parentElementId);
  if (appPlaceholder && shadowRoot) {
    styleShadowContainer(shadowRoot);
    const root = createRoot(appPlaceholder);
    roots[parentElementId] = root;
    root.render(component);
  }
};

export const inject = (parentElementId: string) =>
  injectElement(parentElementId, <SearchApp />);

export const unmount = (parentElementId: string) =>
  unmountElement(parentElementId);
```

The library and player injectors follow the same interface:
- `library-app/src/injectors/libraryInjector.js`
- `player-app/src/injectors/playerInjector.tsx`

### Shell Host Integration (`shell-app/src/App.js`)
The shell loads each injector once and mounts/remounts them into layout containers:

```javascript
const searchInjectorPromise = import("searchApp/searchInjector");
const libraryInjectorPromise = import("libraryApp/libraryInjector");
const playerInjectorPromise = import("playerApp/playerInjector");

const searchContainerId = "search-container";
const libraryContainerId = "library-container";
const playerContainerId = "player-container";

useEffect(() => {
  let mounted = true;

  const initializeSearch = async () => {
    const module = await searchInjectorPromise;
    if (mounted && typeof module.inject === "function") {
      module.inject(searchContainerId);
    }
  };

  const initializeLibrary = async () => {
    const module = await libraryInjectorPromise;
    if (mounted && typeof module.inject === "function") {
      module.inject(libraryContainerId);
    }
  };

  const initializePlayer = async () => {
    const module = await playerInjectorPromise;
    if (mounted && typeof module.inject === "function") {
      module.inject(playerContainerId);
    }
  };

  initializeSearch();
  initializeLibrary();
  initializePlayer();

  return () => {
    mounted = false;
    searchInjectorPromise.then((module) => module.unmount?.(searchContainerId));
    libraryInjectorPromise.then((module) => module.unmount?.(libraryContainerId));
    playerInjectorPromise.then((module) => module.unmount?.(playerContainerId));
  };
}, []);
```

### Shadow DOM Utilities
Each remote uses `utils/shadowDom.*` to create an isolated mount point. This prevents CSS leakage between host/remote apps and keeps framework styles scoped.

- `search-app/src/utils/shadowDom.ts`
- `library-app/src/utils/shadowDom.js`
- `player-app/src/utils/shadowDom.ts`

This shadow DOM layer is the foundation for safely mixing React, Vue, and Solid in the same page.

## Development

The setup includes:

- **Hot Module Replacement (HMR)** - Changes reload instantly
- **CORS Headers** - Allows cross-origin module loading
- **Source Maps** - For easy debugging
- **TypeScript Support** - In search-app
- **Multi-framework Support** - React, Vue.js, and more

## Troubleshooting

### "Cannot find module 'searchApp/searchInjector'"

- Ensure Search App is running on the correct port
- Check that SEARCH_APP_URL environment variable matches the Search App URL
- Check browser console for CORS errors

### "Cannot find module 'libraryApp/libraryInjector'"

- Ensure Library App is running on the correct port
- Check that LIBRARY_APP_URL environment variable matches the Library App URL
- Check browser console for CORS errors

### Style conflicts

- The apps use Shadow DOM to isolate styles
- If you see style issues, check the Shadow DOM implementation in utils/shadowDom.ts

### Module not found errors

- Ensure you ran `npm install` in both apps
- Clear node_modules and reinstall if needed

## Further Reading

- [Module Federation Plugin Documentation](https://webpack.js.org/plugins/module-federation-plugin/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
- [Shadow DOM MDN Docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

## License

MIT
