<template>
  <div class="h-full">
    <LibrarySidebar :playlists="playlists" :isLoading="isLoadingPlaylists" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LibrarySidebar from "./LibrarySidebar.vue";
import { getPlaylistsByUserId } from "../api/playlists";

const playlists = ref([]);
const isLoadingPlaylists = ref(false);

const fetchPlaylists = async (userId) => {
  isLoadingPlaylists.value = true;
  try {
    const fetchedPlaylists = await getPlaylistsByUserId(userId);

    if (fetchedPlaylists && fetchedPlaylists.length > 0) {
      // Transform API format to UI format
      playlists.value = fetchedPlaylists.map((playlist) => ({
        id: playlist.id,
        title: playlist.title,
        producers: playlist.prompt.split(".")[0].substring(0, 50),
        image:
          playlist.songs && playlist.songs.length > 0
            ? playlist.songs[0].thumbnail
            : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=320&q=80",
        // Store full playlist data for event emission
        songs: playlist.songs,
        prompt: playlist.prompt,
        createdAt: playlist.createdAt,
      }));
    }
  } catch (error) {
    console.error("[LibraryApp] Failed to fetch playlists:", error);
  } finally {
    isLoadingPlaylists.value = false;
  }
};

// Fetch playlists on mount
onMounted(async () => {
  const userId = window.sentioUserId;

  if (!userId) {
    console.warn("[LibraryApp] No userId found on window.sentioUserId");
    return;
  }

  await fetchPlaylists(userId);

  // Listen for playlist creation events from search-app
  const handlePlaylistCreated = (event) => {
    console.log("[LibraryApp] Playlist created event received, refetching...");
    fetchPlaylists(userId);
  };

  window.addEventListener("sentio-playlist-created", handlePlaylistCreated);

  onUnmounted(() => {
    window.removeEventListener(
      "sentio-playlist-created",
      handlePlaylistCreated,
    );
  });
});
</script>
