import { Prisma } from "@prisma/client";

// Use Prisma generated types for database models
export type Song = Prisma.SongGetPayload<{}>;
export type Playlist = Prisma.PlaylistGetPayload<{ include: { songs: true } }>;
// Enriched song data from external APIs (without DB-specific fields)
export interface EnrichedSong {
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
}
// DTOs for HTTP layer
export interface PlaylistRequest {
  prompt: string;
  genres: string[];
}

export interface PlaylistResponse {
  id: string;
  prompt: string;
  title: string;
  songs: Array<{
    title: string;
    artist: string;
    videoId: string;
    thumbnail: string;
  }>;
  createdAt: string;
}

// External API types
export interface OpenAISongResponse {
  songs: Array<{
    artist: string;
    title: string;
  }>;
}

export interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      thumbnails: { high: { url: string } };
    };
  }>;
}
