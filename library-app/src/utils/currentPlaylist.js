/**
 * Get the ID of the currently playing playlist from localStorage
 * @returns {string | null} The current playlist ID or null if none is playing
 */
export function getCurrentPlaylistId() {
  return localStorage.getItem("sentio-current-playlist-id");
}
