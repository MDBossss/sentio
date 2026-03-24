// Shared event bus for cross-app communication using localStorage
// This works even when apps are in separate bundled contexts

export interface PlaylistSelectedEvent {
  playlistId: string;
  timestamp: number;
}

const EVENT_STORAGE_KEY = "sentio-playlist-event";

export function emitPlaylistSelected(playlistId: string): void {
  console.log("[playlistEventBus] Emitting playlist selected:", playlistId);

  // Write to localStorage to signal other apps
  const event: PlaylistSelectedEvent = {
    playlistId,
    timestamp: Date.now(),
  };

  localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(event));

  // Also dispatch window event for same-context listeners
  window.dispatchEvent(
    new CustomEvent("sentio-playlist-selected", {
      detail: { playlistId },
    }),
  );

  // Dispatch on parent window if in iframe
  if (window.parent !== window) {
    window.parent.dispatchEvent(
      new CustomEvent("sentio-playlist-selected", {
        detail: { playlistId },
      }),
    );
  }
}

export function onPlaylistSelected(
  callback: (playlistId: string) => void,
): () => void {
  let lastTimestamp = 0;

  // Listen to localStorage changes
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === EVENT_STORAGE_KEY && event.newValue) {
      try {
        const data = JSON.parse(event.newValue) as PlaylistSelectedEvent;
        // Avoid duplicate events from same emission
        if (data.timestamp > lastTimestamp) {
          lastTimestamp = data.timestamp;
          console.log(
            "[playlistEventBus] Received playlist selected (via storage):",
            data.playlistId,
          );
          callback(data.playlistId);
        }
      } catch (e) {
        console.error("[playlistEventBus] Failed to parse storage event:", e);
      }
    }
  };

  // Listen to window events
  const handleWindowEvent = (event: Event) => {
    const customEvent = event as CustomEvent;
    const playlistId = customEvent.detail?.playlistId;
    if (playlistId) {
      console.log(
        "[playlistEventBus] Received playlist selected (via window event):",
        playlistId,
      );
      callback(playlistId);
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("sentio-playlist-selected", handleWindowEvent);

  // Return cleanup function
  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("sentio-playlist-selected", handleWindowEvent);
  };
}
