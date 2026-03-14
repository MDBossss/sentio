# Module Federation Example: Shell App + Search App + Library App

This project demonstrates **Module Federation** with a shell app consuming both a React search app and a Vue.js library app.

## Project Structure

```
sentio/
├── search-app/          # Remote app 1 (React + Webpack + TypeScript)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── injectors/     # Injector that exposes the app
│   │   ├── utils/         # Shadow DOM utilities
│   │   ├── bootstrap.ts   # Bootstrap function
│   │   └── index.ts       # Entry point
│   ├── public/            # Static files
│   ├── webpack.config.js  # Webpack config with Module Federation
│   ├── tsconfig.json      # TypeScript config
│   └── package.json
│
├── library-app/         # Remote app 2 (Vue.js + Webpack)
│   ├── src/
│   │   ├── components/    # Vue components
│   │   ├── injectors/     # Injector that exposes the app
│   │   ├── utils/         # Shadow DOM utilities
│   │   ├── bootstrap.js   # Bootstrap function
│   │   └── index.js       # Entry point
│   ├── public/            # Static files
│   ├── webpack.config.js  # Webpack config with Module Federation
│   └── package.json
│
└── shell-app/           # Host app (React + Webpack)
    ├── src/
    │   ├── App.js         # Main app component
    │   ├── bootstrap.js   # Bootstrap function
    │   └── index.js       # Entry point
    ├── public/            # Static files
    ├── webpack.config.js  # Webpack config with Module Federation
    ├── package.json
```

## How It Works

### Search App (Remote - React)

- Exposes an injector function via Module Federation
- Uses Shadow DOM to isolate styles and prevent conflicts
- Runs on port **3001** (configurable via `SEARCH_APP_URL`)
- Built with React + TypeScript

### Library App (Remote - Vue.js)

- Exposes an injector function via Module Federation
- Uses Shadow DOM to isolate styles and prevent conflicts
- Runs on port **3002** (configurable via `LIBRARY_APP_URL`)
- Built with Vue.js 3 + Single File Components

### Shell App (Host - React)

- Consumes both Search App and Library App injectors via Module Federation
- Dynamically imports the injectors at runtime
- Renders both remote apps into designated containers
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
```

## Running

### Option 1: Run all apps together (recommended)

```bash
npm run start
```

This starts all three apps simultaneously:

- Search App on `http://localhost:3001`
- Library App on `http://localhost:3002`
- Shell App on `http://localhost:3000`

Visit `http://localhost:3000` to see the shell app with both remote apps injected!

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

**Terminal 3 - Shell App:**

```bash
cd shell-app
npm start
```

### Option 4: With custom remote app URLs

**For Shell App, when remotes are on different URLs:**

```bash
cd shell-app
SEARCH_APP_URL=http://your-search-app-url LIBRARY_APP_URL=http://your-library-app-url npm start
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

### Shell App Remotes:

```javascript
remotes: {
  searchApp: `searchApp@${searchAppUrl}/remoteEntry.js`,
  libraryApp: `libraryApp@${libraryAppUrl}/remoteEntry.js`,
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
