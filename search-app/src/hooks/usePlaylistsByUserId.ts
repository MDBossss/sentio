import { useQuery } from "@tanstack/react-query";
import { getPlaylistsByUserId, Playlist } from "@/api/playlists";

/**
 * Custom hook to fetch playlists for a user using React Query
 * @param userId - The user ID to fetch playlists for
 * @param enabled - Whether the query should run (disable when userId is not available)
 */
export const usePlaylistsByUserId = (
  userId: string | undefined,
  enabled: boolean = true,
) => {
  return useQuery<Playlist[], Error>({
    queryKey: ["playlists", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      return getPlaylistsByUserId(userId);
    },
    enabled: !!userId && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in older versions)
  });
};
