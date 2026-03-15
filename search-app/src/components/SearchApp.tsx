import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Header } from "./sections/Header";
import { DescribeSection } from "./sections/DescribeSection";
import { PastPlaylistsSection } from "./sections/PastPlaylistsSection";

const SearchApp: React.FC = () => {
  const { theme, broadcastTheme } = useTheme();

  return (
    <div className="h-full space-y-6 text-foreground">
      <Header theme={theme} onThemeChange={broadcastTheme} />
      <DescribeSection theme={theme} />
      <PastPlaylistsSection />
    </div>
  );
};

export default SearchApp;
