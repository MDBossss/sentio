import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useTheme } from "@/hooks/useTheme";
import { usePlaylistsByUserId } from "@/hooks/usePlaylistsByUserId";
import { Header } from "./sections/Header";
import { DescribeSection } from "./sections/DescribeSection";
import { PastPlaylistsSection } from "./sections/PastPlaylistsSection";

const SearchApp: React.FC = () => {
  const { theme, broadcastTheme } = useTheme();
  const { user, isLoaded } = useUser();

  // Fetch playlists using React Query
  const { data: playlists = [], isLoading: isLoadingPlaylists } =
    usePlaylistsByUserId(user?.id, isLoaded);

  return (
    <div className="h-full space-y-6 text-foreground">
      <Header theme={theme} onThemeChange={broadcastTheme} />
      <DescribeSection theme={theme} />
      <PastPlaylistsSection
        playlists={playlists}
        isLoading={isLoadingPlaylists}
      />
    </div>
  );
};

export default SearchApp;
