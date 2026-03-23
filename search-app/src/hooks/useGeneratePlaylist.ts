import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist, Playlist } from "@/api/playlists";

interface GeneratePlaylistInput {
  prompt: string;
  genres: string[];
  userId: string;
}

/**
 * Custom hook to generate a playlist using real OpenAI + YouTube logic
 * Creates a playlist based on user prompt and genre preferences
 */
export const useGeneratePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation<Playlist, Error, GeneratePlaylistInput>({
    mutationFn: ({ prompt, genres, userId }) =>
      createPlaylist(prompt, genres, userId),
    onSuccess: (newPlaylist) => {
      // Invalidate playlists query to refetch and show new playlist
      queryClient.invalidateQueries({ queryKey: ["playlists"] });

      // Dispatch event to notify library-app to refetch playlists
      window.dispatchEvent(
        new CustomEvent("sentio-playlist-created", {
          detail: { playlist: newPlaylist },
        }),
      );
    },
    onError: (error) => {
      console.error("[useGeneratePlaylist] Error generating playlist:", error);
    },
  });
};
