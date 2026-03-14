# Module Federation Example: Shell App + Search App

This project demonstrates **Module Federation** with a shell app consuming a search app.

## Project Structure

```
sentio/
├── search-app/          # Exposing remote app (React + Webpack + TypeScript)
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
└── shell-app/           # Consuming host app (React + Webpack)
    ├── src/
    │   ├── App.js         # Main app component
    │   ├── bootstrap.js   # Bootstrap function
    │   └── index.js       # Entry point
    ├── public/            # Static files
    ├── webpack.config.js  # Webpack config with Module Federation
    ├── package.json
```

## How It Works

### Search App (Remote)

- Exposes an injector function via Module Federation
- Uses Shadow DOM to isolate styles and prevent conflicts
- Runs on port **3001** (configurable via `SEARCH_APP_URL`)

### Shell App (Host)

- Consumes the search app injector via Module Federation
- Dynamically imports the search injector at runtime
- Renders the search app into a designated container
- Runs on port **3000**

## Installation

### Install dependencies for both apps:

```bash
npm install
```

or for individual apps:

```bash
cd search-app && npm install
cd shell-app && npm install
```

## Running

### Option 1: Run both apps separately

**Terminal 1 - Search App:**

```bash
npm run search-app:start
# App runs on http://localhost:3001
```

**Terminal 2 - Shell App:**

```bash
npm run shell-app:start
# App runs on http://localhost:3000
```

### Option 2: Run from search-app and shell-app directories

**Terminal 1:**

```bash
cd search-app
npm start
```

**Terminal 2:**

```bash
cd shell-app
npm start
```

### Option 3: With custom Search App URL

**For Shell App, when Search App is on a different URL:**

```bash
cd shell-app
SEARCH_APP_URL=http://your-search-app-url npm start
```

## Building for Production

### Build both apps:

```bash
npm run build
```

### Build individual apps:

```bash
npm run search-app:build
npm run shell-app:build
```

## Module Federation Configuration

### Search App Exposes:

```javascript
exposes: {
  './searchInjector': './src/injectors/searchInjector.ts',
}
```

### Shell App Remotes:

```javascript
remotes: {
  searchApp: `searchApp@${searchAppUrl}/remoteEntry.js`,
}
```

## Key Files Explained

### Search App Injector (`search-app/src/injectors/searchInjector.ts`)

Exports:

- `inject(parentElementId)` - Mounts the search app into a container
- `unmount(parentElementId)` - Unmounts and cleans up the search app

### Shell App (`shell-app/src/App.js`)

- Dynamically imports the injector at runtime
- Handles mounting and cleanup
- Provides a container (`search-container`) where the search app renders

### Shadow DOM Utilities (`search-app/src/utils/shadowDom.ts`)

- Creates isolated Shadow DOM containers
- Prevents style conflicts between the host and remote apps
- Manages component lifecycle

## Development

The setup includes:

- **Hot Module Replacement (HMR)** - Changes reload instantly
- **CORS Headers** - Allows cross-origin module loading
- **Source Maps** - For easy debugging
- **TypeScript Support** - In search-app

## Troubleshooting

### "Cannot find module 'searchApp/searchInjector'"

- Ensure Search App is running on the correct port
- Check that SEARCH_APP_URL environment variable matches the Search App URL
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
