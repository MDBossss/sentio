<template>
  <div class="h-full">
    <LibrarySidebar :playlists="playlists" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LibrarySidebar from "./LibrarySidebar.vue";

const playlists = ref([
  {
    id: 1,
    title: "Night Drive",
    producers: "Koda, Lina, Juno",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: 2,
    title: "Studio Focus",
    producers: "Eliot, Nova",
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: 3,
    title: "Golden Hour",
    producers: "Mira, Solace",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: 4,
    title: "Low-Fi Rituals",
    producers: "Ari, Glasshouse",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=320&q=80",
  },
]);
</script>
