# Backend App

Express.js backend for Sentio apps with TypeScript, Prisma ORM, and SQLite.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Add your API keys to `.env`:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

## Development

Start the development server:

```bash
npm run dev
```

The server will be running on `http://localhost:3010` by default.

## Available Endpoints

- `GET /hello` - Returns "Hello World"
- `GET /health` - Health check endpoint
- `POST /api/generate-playlist` - Generate a playlist from a prompt and genres
- `POST /api/test/enrich-youtube` - Test YouTube enrichment with mock or custom songs

### POST /api/generate-playlist

**Request:**

```json
{
  "prompt": "Generate songs for a relaxing evening workout",
  "genres": ["electronic", "ambient", "synthwave"]
}
```

**Response:**

```json
{
  "id": "clty5x9z200001f0j8h0k0x0",
  "prompt": "Generate songs for a relaxing evening workout",
  "title": "Generate songs for a relaxing evening workout",
  "songs": [
    {
      "title": "Song Title - Official Audio",
      "artist": "Artist Name",
      "videoId": "eBItbPiZv64",
      "thumbnail": "https://i.ytimg.com/vi/eBItbPiZv64/maxresdefault.jpg"
    }
  ],
  "createdAt": "2025-03-16T10:30:00.000Z"
}
```

### POST /api/test/enrich-youtube

Test YouTube enrichment without requiring OpenAI API. Uses mock songs by default or accepts custom songs.

**Request (Option 1: Use mock songs):**
```bash
curl -X POST http://localhost:3010/api/test/enrich-youtube
```

**Request (Option 2: Provide custom songs):**

```json
{
  "songs": [
    {"artist": "Linkin Park", "title": "In the End"},
    {"artist": "The Weeknd", "title": "Blinding Lights"},
    {"artist": "Dua Lipa", "title": "Levitating"}
  ]
}
```

**Response:**

```json
{
  "message": "Successfully enriched 3 songs",
  "songs": [
    {
      "title": "In the End",
      "artist": "Linkin Park",
      "videoId": "gB9P0kpc1O4",
      "thumbnail": "https://i.ytimg.com/vi/gB9P0kpc1O4/hqdefault.jpg"
    },
    {
      "title": "The Weeknd - Blinding Lights (Official Audio)",
      "artist": "The Weeknd",
      "videoId": "fHI8X4OXluQ",
      "thumbnail": "https://i.ytimg.com/vi/fHI8X4OXluQ/hqdefault.jpg"
    },
    {
      "title": "Dua Lipa - Levitating (Official Lyrics Video)",
      "artist": "Dua Lipa",
      "videoId": "WHuBW3qKm9g",
      "thumbnail": "https://i.ytimg.com/vi/WHuBW3qKm9g/hqdefault.jpg"
    }
  ]
}
```

**Response fields:**
- `message` - Summary of enrichment results
- `songs` - Array of enriched songs with:
  - `title` - YouTube video title
  - `artist` - Artist name (from request)
  - `videoId` - YouTube video ID
  - `thumbnail` - YouTube video thumbnail URL

## How It Works

1. **Validation**: The endpoint validates the `prompt` (string) and `genres` (array) parameters.

2. **AI Generation**: Uses OpenAI GPT-4o to generate 10 songs based on the prompt and genres.

3. **YouTube Enrichment**: For each generated song, fetches the YouTube video ID and thumbnail using YouTube Data API v3. Uses `Promise.all()` for parallel requests.

4. **Data Persistence**: Saves the playlist and songs to SQLite database using Prisma.

5. **Response**: Returns the complete playlist object with all song metadata.

## Architecture

- **Database**: SQLite (file-based at `./dev.db`)
- **ORM**: Prisma for database operations
- **External APIs**:
  - OpenAI Chat Completions API (GPT-4o)
  - YouTube Data API v3
- **HTTP Client**: axios for API requests

## Database Schema

### Playlist

- `id` (String, Primary Key)
- `prompt` (String)
- `title` (String)
- `songs` (One-to-Many relationship with Song)
- `createdAt` (DateTime)

### Song

- `id` (String, Primary Key)
- `title` (String)
- `artist` (String)
- `videoId` (String)
- `thumbnail` (String, optional)
- `playlistId` (Foreign Key)

## CORS Configuration

The server allows requests from the following ports:

- `http://localhost:3000` - Shell app
- `http://localhost:3001` - Player app
- `http://localhost:3002` - Search app
- `http://localhost:3003` - Library app

## Building

Build the TypeScript code:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Database

View and manage your database:

```bash
npm run prisma:studio
```

## Adding Models

Edit `prisma/schema.prisma` to define your models, then run:

```bash
npm run prisma:migrate
```
