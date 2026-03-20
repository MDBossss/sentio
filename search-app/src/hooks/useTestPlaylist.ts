import { useMutation, useQueryClient } from "@tanstack/react-query";
import { testYouTubeEnrichment, Playlist } from "@/api/playlists";

/**
 * Custom hook to test YouTube enrichment with mock songs
 * Creates a test playlist and invalidates the playlists query to refetch
 */
export const useTestPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation<Playlist, Error, string>({
    mutationFn: (userId: string) => testYouTubeEnrichment(userId),
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
  });
};
