<template>
  <DefaultLayout>
    <div class="p-4">
      <div class="flex flex-col items-start gap-6 mb-4 sm:flex-row">
        <img
          :src="mangaDetails?.thumbnail"
          :alt="mangaDetails?.title"
          class="h-64 w-44 rounded-lg object-cover"
        />
        <div class="flex-1">
          <h2 class="text-2xl font-bold dark:text-white mb-2">{{ mangaDetails?.title }}</h2>
          <p class="dark:text-slate-300">Rating: {{ mangaDetails?.ratings || 'N/A' }}</p>
          <p class="dark:text-slate-300 mb-4">Status: {{ mangaDetails?.status || 'N/A' }}</p>
          <p class="dark:text-slate-300 mb-4">{{ mangaDetails?.description || '-' }}</p>
        </div>
      </div>

      <div class="space-y-2 text-sm text-slate-300">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="chapter in mangaDetails?.chapters" :key="chapter.url">
            <p
              class="px-4 py-2 bg-gray-300/20 w-full text-lg text-black dark:text-white rounded-lg cursor-pointer"
              @click="
                router.push({
                  name: 'read',
                  params: { manga: mangaDetails?.slug, chapter: chapter.slug },
                })
              "
            >
              {{ chapter.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMangaDetailsStore } from '@/stores/manga-details'
import { storeToRefs } from 'pinia'
import router from '@/router'
import DefaultLayout from '@/layouts/default-layout.vue'

const route = useRoute()
const slug = (() => {
  const val = route.params.manga
  return Array.isArray(val) ? val[0] : val
})() as string // assert string

const mangaDetailsStore = useMangaDetailsStore()
const { mangaDetails } = storeToRefs(mangaDetailsStore)
const { fetchMangaDetails } = mangaDetailsStore

onMounted(() => {
  fetchMangaDetails(slug)
})
</script>
