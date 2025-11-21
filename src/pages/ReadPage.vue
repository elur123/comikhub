<template>
  <div class="grid place-content-center bg-black">
    <div v-if="imageEpisodes">
      <img
        class="object-cover"
        v-for="(image, index) in imageEpisodes"
        :key="index"
        :src="image"
        referrerpolicy="no-referrer"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMangaDetailsStore } from '@/stores/manga-details'
import { storeToRefs } from 'pinia'

const route = useRoute()
const manga = (() => {
  const val = route.params.manga
  return Array.isArray(val) ? val[0] : val
})() as string // assert string
const chapter = (() => {
  const val = route.params.chapter
  return Array.isArray(val) ? val[0] : val
})() as string // assert string

const mangaDetailsStore = useMangaDetailsStore()
const { imageEpisodes } = storeToRefs(mangaDetailsStore)
const { fetchImageEpisodes } = mangaDetailsStore

onMounted(() => {
  fetchImageEpisodes(manga, chapter)
})
</script>
