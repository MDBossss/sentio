import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface PlaylistSong {
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
}

export interface Playlist {
  id: string;
  prompt: string;
  title: string;
  songs: PlaylistSong[];
  createdAt: string;
}

export interface Preset {
  emoji: string;
  text: string; // Display title
  description: string; // Prompt for OpenAI
  genre: string;
}

export async function getPlaylistsByUserId(
  userId: string,
): Promise<Playlist[]> {
  try {
    console.log(`[API] Fetching playlists for user: ${userId}`);

    const response = await axios.get<Playlist[]>(
      `${API_BASE_URL}/api/playlists/${userId}`,
    );
    console.log(`[API] Playlists fetched:`, response.data);

    return response.data;
  } catch (error) {
    console.error(
      `[API] Error fetching playlists:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return [];
  }
}

export async function createPlaylist(
  prompt: string,
  genres: string[],
  userId: string,
): Promise<Playlist> {
  try {
    console.log(
      `[API] Creating playlist for user: ${userId} with prompt: "${prompt}"`,
    );

    const response = await axios.post<Playlist>(
      `${API_BASE_URL}/api/generate-playlist`,
      {
        prompt,
        genres,
        userId,
      },
    );

    console.log(`[API] Playlist created:`, response.data);

    return response.data;
  } catch (error) {
    console.error(
      `[API] Error creating playlist:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    throw error;
  }
}

export async function fetchPresets(userId: string): Promise<Preset[]> {
  try {
    console.log(`[API] Fetching presets for user: ${userId}`);
    const response = await axios.get<{ presets: Preset[] }>(
      `${API_BASE_URL}/api/presets/${userId}`,
    );

    console.log(`[API] Presets fetched:`, response.data.presets);

    return response.data.presets;
  } catch (error) {
    console.error(
      `[API] Error fetching presets:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return [];
  }
}

export async function testYouTubeEnrichment(userId: string): Promise<Playlist> {
  try {
    console.log(`[API] Testing YouTube enrichment for user: ${userId}`);
    const response = await axios.post<Playlist>(
      `${API_BASE_URL}/api/test/enrich-youtube`,
      { userId },
    );

    console.log(`[API] Test playlist created:`, response.data);

    return response.data;
  } catch (error) {
    console.error(
      `[API] Error testing YouTube enrichment:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    throw error;
  }
}
