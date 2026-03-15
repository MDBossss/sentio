<template>
  <aside
    class="w-[320px] shrink-0 rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl shadow-black/40 backdrop-blur"
  >
    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
      >
        <component :is="brandIcon" size="18" />
      </div>
      <div>
        <p class="text-xs uppercase tracking-[0.35em] text-zinc-500">App</p>
        <h2 class="text-lg font-semibold text-white">sentio</h2>
      </div>
    </div>

    <div
      class="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
    ></div>

    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold uppercase tracking-widest text-zinc-400">
        My library
      </h3>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-wider text-zinc-300 transition hover:bg-white/10 hover:text-white"
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
      class="mt-6 rounded-2xl border border-white/10 bg-zinc-900/60 p-4 text-xs text-zinc-400"
    >
      <div class="flex items-center gap-2 text-zinc-300">
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
  Sparkles,
  Wand2,
  Headphones,
  Music,
  Radio,
  Plus,
  Library,
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
