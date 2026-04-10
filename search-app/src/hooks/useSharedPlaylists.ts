import { useQuery } from "@tanstack/react-query";
import { getSharedPlaylistsByUserId, Playlist } from "@/api/playlists";

export const useSharedPlaylists = (
  userId: string | undefined,
  enabled: boolean = true,
) => {
  return useQuery<Playlist[], Error>({
    queryKey: ["sharedPlaylists", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      return getSharedPlaylistsByUserId(userId);
    },
    enabled: !!userId && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};