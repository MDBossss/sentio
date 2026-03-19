import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTheme } from "@/hooks/useTheme";
import { Header } from "./sections/Header";
import { DescribeSection } from "./sections/DescribeSection";
import { PastPlaylistsSection } from "./sections/PastPlaylistsSection";
import { getPlaylistsByUserId, Playlist } from "@/api/playlists";

const SearchApp: React.FC = () => {
  const { theme, broadcastTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  // Fetch playlists when user is available
  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }

    const fetchPlaylists = async () => {
      setIsLoadingPlaylists(true);
      try {
        const fetchedPlaylists = await getPlaylistsByUserId(user.id);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
        setPlaylists([]);
      } finally {
        setIsLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, [user?.id, isLoaded]);

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
