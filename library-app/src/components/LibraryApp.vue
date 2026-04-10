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

const mockPlaylists = [
  {
    id: "1",
    title: "Late Night Vibes",
    producers: "Chill beats for midnight sessions",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=320&q=80",
    songs: [],
    prompt: "Late night vibes for working.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Morning Coffee",
    producers: "Acoustic and soft tunes",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=320&q=80",
    songs: [],
    prompt: "Morning coffee playlist.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Workout Energy",
    producers: "High tempo workout tracks",
    image:
      "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?auto=format&fit=crop&w=320&q=80",
    songs: [],
    prompt: "Workout energy playlist.",
    createdAt: new Date().toISOString(),
  },
];

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
  // Prefer a logged-in user when available. Only show demo playlists
  // when there's no userId and the app is running standalone.
  const userId = window.sentioUserId || localStorage.getItem("sentio-user-id");

  if (userId) {
    await fetchPlaylists(userId);

    // Listen for playlist creation events from search-app
    const handlePlaylistCreated = (event) => {
      console.log(
        "[LibraryApp] Playlist created event received, refetching...",
      );
      fetchPlaylists(userId);
    };

    window.addEventListener("sentio-playlist-created", handlePlaylistCreated);

    onUnmounted(() => {
      window.removeEventListener(
        "sentio-playlist-created",
        handlePlaylistCreated,
      );
    });

    return;
  }

  // No userId — only show mock playlists when the app runs standalone
  const isStandalone = window.parent === window;
  if (isStandalone) {
    playlists.value = mockPlaylists;
  } else {
    console.warn(
      "[LibraryApp] No userId found on window.sentioUserId or localStorage",
    );
  }
});
</script>
