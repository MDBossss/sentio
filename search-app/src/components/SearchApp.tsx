import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useTheme } from "@/hooks/useTheme";
import { usePlaylistsByUserId } from "@/hooks/usePlaylistsByUserId";
import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import { Header } from "./sections/Header";
import { DescribeSection } from "./sections/DescribeSection";
import { PastPlaylistsSection } from "./sections/PastPlaylistsSection";

const SearchApp: React.FC = () => {
  const { theme, broadcastTheme } = useTheme();
  const { user, isLoaded } = useUser();

  // Fetch playlists using React Query
  const { data: playlists = [], isLoading: isLoadingPlaylists } =
    usePlaylistsByUserId(user?.id, isLoaded);

  // Generate real playlist with OpenAI + YouTube
  const { mutate: generatePlaylist, isPending: isGenerating } =
    useGeneratePlaylist();

  const handleGeneratePlaylist = (prompt: string) => {
    if (user?.id && prompt.trim()) {
      // Backend will fetch user's genres from preferences
      generatePlaylist({ prompt, genres: [], userId: user.id });
    }
  };

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
    </div>
  );
};

export default SearchApp;
