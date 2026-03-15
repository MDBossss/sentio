<template>
  <aside
    class="w-[320px] shrink-0 rounded-3xl border border-border/40 bg-card/80 p-6 shadow-md backdrop-blur h-full"
  >
    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
      >
        <component :is="brandIcon" size="18" />
      </div>
      <div>
        <p class="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          App
        </p>
        <h2 class="text-lg font-semibold text-emerald-400">sentio</h2>
      </div>
    </div>

    <div
      class="mb-5 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
    ></div>

    <div class="flex items-center justify-between">
      <h3
        class="text-sm font-semibold uppercase tracking-widest text-muted-foreground"
      >
        My library
      </h3>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/40 px-3 py-1.5 text-xs uppercase tracking-wider text-foreground/80 transition hover:bg-muted/60 hover:text-foreground"
      >
        <Plus size="14" />
        New
      </button>
    </div>

    <div class="mt-5 space-y-4">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
      />
    </div>

    <div
      class="mt-6 rounded-2xl border border-border/40 bg-card/70 p-4 text-xs text-muted-foreground"
    >
      <div class="flex items-center gap-2 text-foreground/80">
        <Library size="14" class="text-emerald-400" />
        <span class="font-semibold uppercase tracking-wider">Tips</span>
      </div>
      <p class="mt-2 leading-relaxed">
        Pin playlists you love and keep them in sync across your devices.
      </p>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Plus,
  Library,
  Sparkles,
  Wand2,
  Headphones,
  Music,
  Radio,
} from "lucide-vue-next";
import PlaylistCard from "./PlaylistCard.vue";

defineProps({
  playlists: {
    type: Array,
    default: () => [],
  },
});

const iconPool = [Sparkles, Wand2, Headphones, Music, Radio];
const brandIcon = ref(iconPool[0]);

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * iconPool.length);
  brandIcon.value = iconPool[randomIndex];
});
</script>
