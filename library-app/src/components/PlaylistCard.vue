<template>
  <article
    :class="[
      'group relative flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 transition hover:border-emerald-400/40 hover:bg-card/80',
      isNowPlaying &&
        'bg-emerald-500/10 border-emerald-400/60 shadow-lg shadow-emerald-500/20',
    ]"
  >
    <div class="relative h-14 w-14 overflow-hidden rounded-2xl">
      <!-- 2x2 tile grid for first 4 thumbnails, fallback to single image -->
      <template v-if="useGrid">
        <div class="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <img
            v-for="(t, i) in tiles"
            :key="i"
            :src="t.thumbnail"
            :alt="`${playlist.title} - ${i + 1}`"
            loading="lazy"
            @load="() => handleTileLoad(i)"
            @error="() => handleTileError(i)"
            class="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </template>
      <template v-else>
        <img
          :src="playlist.image"
          :alt="playlist.title"
          @load="handleImageLoad"
          @error="handleImageError"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </template>

      <div class="absolute inset-0 rounded-2xl ring-1 ring-border/60"></div>
      <div
        v-if="isNowPlaying"
        class="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/50"
      ></div>
    </div>

    <div class="min-w-0 flex-1">
      <div
        class="flex items-center gap-2 text-sm font-semibold text-foreground"
      >
        <Headphones size="14" class="text-emerald-400" />
        <span class="truncate">{{ playlist.title }}</span>
      </div>
      <p class="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
        <Users size="12" class="text-muted-foreground/70" />
        <span class="truncate">{{ playlist.producers }}</span>
      </p>
    </div>

    <button
      type="button"
      :class="[
        'inline-flex h-9 w-9 items-center justify-center rounded-full border transition',
        isNowPlaying
          ? 'bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-300'
          : 'border-border bg-card/60 text-muted-foreground hover:border-emerald-400/40 hover:bg-emerald-500/20 hover:text-emerald-300',
      ]"
      :aria-label="isNowPlaying && isPlayerPlaying ? 'Pause' : 'Play playlist'"
      @click="handlePlayButtonClick"
    >
      <Pause v-if="isNowPlaying && isPlayerPlaying" size="16" />
      <Play v-else size="16" />
    </button>
  </article>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { Headphones, Users, Play, Pause } from "lucide-vue-next";
import { getCurrentPlaylistId } from "../utils/currentPlaylist";

const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});

const currentPlaylistId = ref(getCurrentPlaylistId());
const isPlayerPlaying = ref(false);

// Tiles and load tracking for 2x2 grid
const tiles = computed(() =>
  props.playlist.songs ? props.playlist.songs.slice(0, 4) : [],
);
const useGrid = computed(() => tiles.value.length >= 4);
const tilesLoaded = ref([]);
const imageLoaded = ref(false);

const handleTileLoad = (i) => {
  tilesLoaded.value[i] = true;
};
const handleTileError = (i) => {
  tilesLoaded.value[i] = false;
};
const handleImageLoad = () => {
  imageLoaded.value = true;
};
const handleImageError = () => {
  imageLoaded.value = false;
};

watch(
  () => tiles.value.length,
  (len) => {
    tilesLoaded.value = new Array(len).fill(false);
  },
  { immediate: true },
);
watch(
  () => props.playlist.image,
  () => {
    imageLoaded.value = false;
  },
);

const isNowPlaying = computed(() => {
  return (
    currentPlaylistId.value === String(props.playlist.id) &&
    isPlayerPlaying.value
  );
});

const selectPlaylist = () => {
  // Create a clean copy to avoid Solid.js store serialization issues
  const cleanPlaylist = {
    id: props.playlist.id,
    title: props.playlist.title,
    producers: props.playlist.producers,
    image: props.playlist.image,
    songs: props.playlist.songs,
    prompt: props.playlist.prompt,
    createdAt: props.playlist.createdAt,
  };

  // Save to localStorage for cross-app communication
  localStorage.setItem(
    "sentio-playlist-to-switch",
    JSON.stringify({
      playlist: cleanPlaylist,
      timestamp: Date.now(),
    }),
  );

  window.dispatchEvent(
    new CustomEvent("sentio-playlist-selected", {
      detail: { playlist: cleanPlaylist },
    }),
  );
};

const handlePlayButtonClick = () => {
  const isThisPlaylistSelected =
    currentPlaylistId.value === String(props.playlist.id);

  if (!isThisPlaylistSelected) {
    // Select the playlist first
    selectPlaylist();
  }

  // Dispatch a play/pause toggle event
  window.dispatchEvent(
    new CustomEvent("sentio-player-toggle-play", {
      detail: { playlistId: props.playlist.id },
    }),
  );
};

const handlePlaylistSelected = (event) => {
  const detail = event && event.detail ? event.detail : null;
  const eventPlaylistId =
    detail && detail.playlist ? String(detail.playlist.id) : null;
  const newId = eventPlaylistId || getCurrentPlaylistId();
  currentPlaylistId.value = newId;
};

const handlePlayerStateChanged = (event) => {
  const detail = event.detail;
  isPlayerPlaying.value = detail.playing;
  if (detail.playlistId) {
    currentPlaylistId.value = String(detail.playlistId);
  }
};

onMounted(() => {
  window.addEventListener("sentio-playlist-selected", handlePlaylistSelected);
  window.addEventListener(
    "sentio-player-state-changed",
    handlePlayerStateChanged,
  );
});

onUnmounted(() => {
  window.removeEventListener(
    "sentio-playlist-selected",
    handlePlaylistSelected,
  );
  window.removeEventListener(
    "sentio-player-state-changed",
    handlePlayerStateChanged,
  );
});
</script>
