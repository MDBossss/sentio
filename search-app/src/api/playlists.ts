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
