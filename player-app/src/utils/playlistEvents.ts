interface PlaylistSelectedDetail {
  playlist: any;
  startIndex?: number;
  startVideoId?: string;
}

export function dispatchPlaylistSelected(detail: PlaylistSelectedDetail) {
  window.dispatchEvent(
    new CustomEvent("sentio-playlist-selected-v2", {
      detail,
    }),
  );
}

export function handlePlaylistSelectedV2(
  callback: (detail: PlaylistSelectedDetail) => void,
) {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<PlaylistSelectedDetail>;
    callback(customEvent.detail);
  };

  window.addEventListener("sentio-playlist-selected-v2", handler);

  return () => {
    window.removeEventListener("sentio-playlist-selected-v2", handler);
  };
}
