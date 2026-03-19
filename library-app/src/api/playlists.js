const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export async function getPlaylistsByUserId(userId) {
  try {
    console.log(`[Library API] Fetching playlists for user: ${userId}`);
    const response = await fetch(`${API_BASE_URL}/api/playlists/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Library API] Playlists fetched:`, data);
    return data;
  } catch (error) {
    console.error(
      `[Library API] Error fetching playlists:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return [];
  }
}
