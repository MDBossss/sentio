<template>
  <article
    class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 transition hover:border-emerald-400/40 hover:bg-white/10"
  >
    <div class="relative h-14 w-14 overflow-hidden rounded-2xl">
      <img
        :src="playlist.image"
        :alt="playlist.title"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 rounded-2xl ring-1 ring-white/10"></div>
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2 text-sm font-semibold text-white">
        <Headphones size="14" class="text-emerald-400" />
        <span class="truncate">{{ playlist.title }}</span>
      </div>
      <p class="mt-1 flex items-center gap-2 text-xs text-zinc-400">
        <Users size="12" class="text-zinc-500" />
        <span class="truncate">{{ playlist.producers }}</span>
      </p>
    </div>

    <button
      type="button"
      class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-emerald-400/40 hover:bg-emerald-500/20 hover:text-emerald-300"
      aria-label="Open playlist"
    >
      <ChevronRight size="16" />
    </button>
  </article>
</template>

<script setup>
import { Headphones, Users, ChevronRight } from "lucide-vue-next";

defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});
</script>
