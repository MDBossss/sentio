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
│   │   ├── bootstrap.ts   # Bootstrap function
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

## How It Works

### Search App (Remote - React)

- Exposes an injector function via Module Federation
- Uses Shadow DOM to isolate styles and prevent conflicts
- Runs on port **3001** (configurable via `SEARCH_APP_URL`)
- Built with React + TypeScript
- Main content area for search results and album display

### Library App (Remote - Vue.js)

- Exposes an injector function via Module Federation
- Uses Shadow DOM to isolate styles and prevent conflicts
- Runs on port **3002** (configurable via `LIBRARY_APP_URL`)
- Built with Vue.js 3 + Single File Components
- Left sidebar showing albums/library

### Player App (Remote - Solid.js)

- Exposes an injector function via Module Federation
- Uses Shadow DOM to isolate styles and prevent conflicts
- Runs on port **3003** (configurable via `PLAYER_APP_URL`)
- Built with Solid.js + TypeScript
- Bottom footer with play/pause controls, volume slider, and track info

### Shell App (Host - React)

- Consumes Search App, Library App, and Player App injectors via Module Federation
- Orchestrates all remote apps with Spotify-like layout
- Left sidebar for library, main content for search, footer for player
- Dynamically imports all injectors at runtime
- Runs on port **3000**

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

**Terminal 1 - Search App:**

```bash
npm run search-app:start
# App runs on http://localhost:3001
```

**Terminal 2 - Library App:**

```bash
npm run library-app:start
# App runs on http://localhost:3002
```

**Terminal 3 - Player App:**

```bash
npm run player-app:start
# App runs on http://localhost:3003
```

**Terminal 4 - Shell App:**

```bash
npm run shell-app:start
# App runs on http://localhost:3000
```

### Option 3: Run from individual app directories

**Terminal 1 - Search App:**

```bash
cd search-app
npm start
```

**Terminal 2 - Library App:**

```bash
cd library-app
npm start
```

**Terminal 3 - Shell App:**

```bash
npm run shell-app:start
# App runs on http://localhost:3000
```

### Option 3: Run from individual app directories

**Terminal 1 - Search App:**

```bash
cd search-app
npm start
```

**Terminal 2 - Library App:**

```bash
cd library-app
npm start
```

**Terminal 3 - Player App:**

```bash
cd player-app
npm start
```

**Terminal 4 - Shell App:**

```bash
cd shell-app
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

## Key Files Explained

### Search App Injector (`search-app/src/injectors/searchInjector.tsx`)

Exports:

- `inject(parentElementId)` - Mounts the search app into a container
- `unmount(parentElementId)` - Unmounts and cleans up the search app

### Library App Injector (`library-app/src/injectors/libraryInjector.js`)

Exports:

- `inject(parentElementId)` - Mounts the library app into a container
- `unmount(parentElementId)` - Unmounts and cleans up the library app

### Player App Injector (`player-app/src/injectors/playerInjector.tsx`)

Exports:

- `inject(parentElementId)` - Mounts the player app into a container
- `unmount(parentElementId)` - Unmounts and cleans up the player app

### Shell App (`shell-app/src/App.js`)

- Dynamically imports both injectors at runtime
- Handles mounting and cleanup for both remote apps
- Provides containers (`search-container` and `library-container`) where the remote apps render

### Shadow DOM Utilities

**Search App** (`search-app/src/utils/shadowDom.ts`)

- Creates isolated Shadow DOM containers
- Prevents style conflicts between the host and remote apps
- Manages component lifecycle

**Library App** (`library-app/src/utils/shadowDom.js`)

- Same Shadow DOM isolation for Vue.js components
- Compatible with both React and Vue.js apps

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
