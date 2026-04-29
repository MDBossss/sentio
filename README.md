<h1 align="center">Sentio</h1>

<p align="center">
  Music discovery and playlist management app built with Module Federation, featuring a Spotify-inspired layout with search, library, and player components.
</p>

<p align="center">
  <a href="https://github.com/MDBossss/sentio/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/MDBossss/sentio?color=dark-green" alt="Contributors">
  </a>
  <a href="https://github.com/MDBossss/sentio/issues">
    <img src="https://img.shields.io/github/issues/MDBossss/sentio" alt="Issues">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/MDBossss/sentio" alt="License">
  </a>
</p>

[![Screen Shot](/images/home-page.png)](/images/home-page.png)
[![Screen Shot](/images/onboard-1.png)](/images/onboard-1.png)
[![Screen Shot](/images/onboard-2.png)](/images/onboard-2.png)
[![Screen Shot](/images/playlist-showcase.png)](/images/playlist-showcase.png)
[![Screen Shot](/images/settings.png)](/images/settings.png)
[![Screen Shot](/images/white-theme.png)](/images/white-theme.png)

## Technologies

### Frontend

- React (Shell & Search App)
- Vue.js (Library App)
- Solid.js (Player App)
- Tailwind CSS
- TypeScript
- Clerk (Authentication)

### Backend

- Node.js
- Express.js
- Prisma
- SQLite (dev) / MySQL (prod)

## Project Structure

```
sentio/
├── shell-app/           # Host app - Spotify-like layout
├── search-app/          # Search & playlist management (React)
├── library-app/         # User library sidebar (Vue.js)
├── player-app/          # Music player footer (Solid.js)
└── server/              # Express.js API + Prisma
```

## Features

- Module Federation micro-frontend architecture
- Shadow DOM for style isolation
- User authentication with Clerk
- Playlist creation and management
- Playlist sharing
- Music playback controls
- Dark/light theme toggle

## Setting up environmental variables

### Server

Create a `.env` file inside the `server` directory:

```
DATABASE_URL=file:./dev.db
PORT=3010
```

### Shell App

Create a `.env` file inside the `shell-app` directory:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### Search App

Create a `.env` file inside the `search-app` directory:

```
VITE_API_BASE_URL=http://localhost:3010
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## Installation

1. Clone the repository
2. Install dependencies for all apps:

```bash
npm run install-all
```

3. Set up environment variables (see above)

4. Start the development servers:

```bash
npm run start
```

The app will be available at `http://localhost:3000`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.