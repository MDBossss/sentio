import axios from "axios";
import { EnrichedSong, YouTubeSearchResponse } from "../types";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3/search";

export async function enrichSongWithYouTube(
  artist: string,
  title: string,
): Promise<EnrichedSong | null> {
  try {
    const query = `${artist} ${title} official audio`;

    const response = await axios.get<YouTubeSearchResponse>(YOUTUBE_API_BASE, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        videoCategoryId: "10", // Music category
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 1,
      },
    });

    const item = response.data.items?.[0];

    if (!item) {
      console.warn(`No YouTube video found for: ${artist} - ${title}`);
      return null;
    }

    return {
      title: item.snippet.title,
      artist,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
    };
  } catch (error) {
    console.error(
      `Error fetching YouTube data for ${artist} - ${title}:`,
      error,
    );
    return null;
  }
}

export async function enrichSongsWithYouTube(
  songs: Array<{ artist: string; title: string }>,
): Promise<EnrichedSong[]> {
  try {
    // Use Promise.all for concurrent requests
    const enrichedSongs = await Promise.all(
      songs.map((song) => enrichSongWithYouTube(song.artist, song.title)),
    );

    // Filter out null values (failed enrichments)
    return enrichedSongs.filter((song): song is EnrichedSong => song !== null);
  } catch (error) {
    console.error("Error enriching songs with YouTube data:", error);
    throw new Error(
      `Failed to enrich songs: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
