import { useQuery } from "@tanstack/react-query";
import { fetchPresets, Preset } from "@/api/playlists";

/**
 * Custom hook to fetch presets for a user using React Query
 * @param userId - The user ID to fetch presets for
 * @param enabled - Whether the query should run (disable when userId is not available)
 */
export const usePresets = (
  userId: string | null | undefined,
  enabled: boolean = true,
) => {
  return useQuery<Preset[], Error>({
    queryKey: ["presets", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      return fetchPresets(userId);
    },
    enabled: !!userId && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in older versions)
  });
};
