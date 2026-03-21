import { createStore } from "solid-js/store";

interface PlaylistSong {
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
}

interface Playlist {
  id: string | number;
  title: string;
  songs: PlaylistSong[];
  [key: string]: any;
}

interface PlayerState {
  playing: boolean;
  currentTrack: string;
  currentArtist: string;
  volume: number;
  theme: "dark" | "light";
  currentPlaylist: Playlist | null;
  currentSongIndex: number;
  currentTime: number;
  duration: number;
}

export interface UsePlayerStateReturn {
  state: PlayerState;
  setState: (key: keyof PlayerState, value: any) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaylist: (
    playlist: Playlist,
    startIndex?: number,
    startVideoId?: string,
  ) => void;
}

export function usePlayerState(): UsePlayerStateReturn {
  const [state, setState] = createStore<PlayerState>({
    playing: false,
    currentTrack: "No track playing",
    currentArtist: "",
    volume: 70,
    theme: "dark",
    currentPlaylist: null,
    currentSongIndex: 0,
    currentTime: 0,
    duration: 0,
  });

  const togglePlayPause = () => {
    setState("playing", !state.playing);
  };

  const nextTrack = () => {
    if (!state.currentPlaylist?.songs) return;
    const newIndex =
      (state.currentSongIndex + 1) % state.currentPlaylist.songs.length;
    setState("currentSongIndex", newIndex);
  };

  const prevTrack = () => {
    if (!state.currentPlaylist?.songs) return;
    const newIndex =
      state.currentSongIndex === 0
        ? state.currentPlaylist.songs.length - 1
        : state.currentSongIndex - 1;
    setState("currentSongIndex", newIndex);
  };

  const setPlaylist = (
    playlist: Playlist,
    startIndex?: number,
    startVideoId?: string,
  ) => {
    setState("currentPlaylist", playlist);

    let startIdx = 0;
    if (startIndex !== undefined) {
      startIdx = Math.max(0, Math.min(startIndex, playlist.songs.length - 1));
    } else if (startVideoId) {
      const foundIdx = playlist.songs.findIndex(
        (song) => song.videoId === startVideoId,
      );
      startIdx = foundIdx !== -1 ? foundIdx : 0;
    }

    setState("currentSongIndex", startIdx);
  };

  return {
    state,
    setState,
    togglePlayPause,
    nextTrack,
    prevTrack,
    setPlaylist,
  };
}
