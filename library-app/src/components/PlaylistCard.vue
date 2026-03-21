<template>
  <article
    :class="[
      'group flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 transition hover:border-emerald-400/40 hover:bg-card/80',
      isNowPlaying && 'bg-emerald-500/10 border-emerald-400/40',
    ]"
  >
    <div class="relative h-14 w-14 overflow-hidden rounded-2xl">
      <img
        :src="playlist.image"
        :alt="playlist.title"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 rounded-2xl ring-1 ring-border/60"></div>
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
      class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition hover:border-emerald-400/40 hover:bg-emerald-500/20 hover:text-emerald-300"
      aria-label="Open playlist"
      @click="selectPlaylist"
    >
      <ChevronRight size="16" />
    </button>
  </article>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { Headphones, Users, ChevronRight } from "lucide-vue-next";
import { getCurrentPlaylistId } from "../utils/currentPlaylist";

const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});

const currentPlaylistId = ref(getCurrentPlaylistId());

const isNowPlaying = computed(() => {
  return currentPlaylistId.value === String(props.playlist.id);
});

const selectPlaylist = () => {
  window.dispatchEvent(
    new CustomEvent("sentio-playlist-selected", {
      detail: { playlist: props.playlist },
    }),
  );
};

onMounted(() => {
  const handlePlaylistSelected = () => {
    currentPlaylistId.value = getCurrentPlaylistId();
  };

  window.addEventListener("sentio-playlist-selected", handlePlaylistSelected);

  onUnmounted(() => {
    window.removeEventListener(
      "sentio-playlist-selected",
      handlePlaylistSelected,
    );
  });
});
</script>
