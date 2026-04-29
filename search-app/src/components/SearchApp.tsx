import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/hooks/useTheme";
import { usePlaylistsByUserId } from "@/hooks/usePlaylistsByUserId";
import { useSharedPlaylists } from "@/hooks/useSharedPlaylists";
import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import { addSharedPlaylist } from "@/api/playlists";
import { useToast } from "@/hooks/use-toast";
import { Header } from "./sections/Header";
import { DescribeSection } from "./sections/DescribeSection";
import { PastPlaylistsSection } from "./sections/PastPlaylistsSection";
import { SharedPlaylistsSection } from "./sections/SharedPlaylistsSection";
import { Toaster } from "./ui/toaster";

const SearchApp: React.FC = () => {
  const { theme, broadcastTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: playlists = [], isLoading: isLoadingPlaylists, refetch: refetchPlaylists } =
    usePlaylistsByUserId(user?.id, isLoaded);

  const { data: sharedPlaylists = [], isLoading: isLoadingSharedPlaylists, refetch: refetchSharedPlaylists } =
    useSharedPlaylists(user?.id, isLoaded);

  const { mutate: generatePlaylist, isPending: isGenerating } =
    useGeneratePlaylist();

  const handleGeneratePlaylist = (prompt: string) => {
    if (user?.id && prompt.trim()) {
      generatePlaylist({ prompt, genres: [], userId: user.id });
    }
  };

  useEffect(() => {
    if (!user?.id || !isLoaded) {
      console.log("[SearchApp] Waiting for user:", { userId: user?.id, isLoaded });
      return;
    }

    const checkForSharedPlaylist = async () => {
      // Check URL first (direct access), then localStorage (from parent)
      let sharedId = new URLSearchParams(window.location.search).get("shared");
      
      if (!sharedId) {
        // Try localStorage (set by parent shell)
        sharedId = localStorage.getItem("sentio-pending-shared-playlist");
      }

      console.log("[SearchApp] Checking for shared playlist:", sharedId, "user:", user.id);

      if (sharedId) {
        try {
          const result = await addSharedPlaylist(sharedId, user.id);
          console.log("[SearchApp] Shared playlist added:", result);
          toast({
            description: `Playlist "${result.title}" added to shared playlists`,
          });
          localStorage.removeItem("sentio-pending-shared-playlist");
          // Clean URL
          if (window.history.replaceState) {
            const url = new URL(window.location.href);
            url.searchParams.delete("shared");
            window.history.replaceState({}, "", url.toString());
          }
          // Refetch all playlists
          refetchPlaylists();
          refetchSharedPlaylists();
        } catch (err: any) {
          console.error("[SearchApp] Failed to add shared playlist:", err?.response || err);
          toast({
            description: err?.response?.data?.error || "Failed to add shared playlist",
            variant: "destructive",
          });
        }
      }
    };

    checkForSharedPlaylist();
  }, [user?.id, isLoaded, toast]);

  return (
    <div className="h-full space-y-6 text-foreground">
      <Header theme={theme} onThemeChange={broadcastTheme} />

      <DescribeSection
        theme={theme}
        onGeneratePlaylist={handleGeneratePlaylist}
        isGenerating={isGenerating}
      />

      <PastPlaylistsSection
        playlists={playlists}
        isLoading={isLoadingPlaylists}
      />

      <SharedPlaylistsSection
        playlists={sharedPlaylists}
        isLoading={isLoadingSharedPlaylists}
      />

      <Toaster />
    </div>
  );
};

export default SearchApp;
