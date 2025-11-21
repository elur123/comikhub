<template>
  <DefaultLayout>
    <div class="grid grid-cols-6 gap-8">
      <div class="w-full overflow-hidden col-span-6 mb-16">
        <h3 class="text-lg font-bold mb-4 py-2 tracking-wider">Most Recent Update</h3>
        <Carousel
          class="relative w-full"
          :opts="{
            align: 'start',
          }"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(manga, index) in popularManga"
              :key="index"
              class="basis-1/3 md:basis-1/3 lg:basis-1/6"
            >
              <MangaCard :manga="manga" @selectManga="selectManga" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div class="col-span-6 md:col-span-4">
        <h3 class="text-lg font-bold mb-4 py-2 tracking-wider">Latest Update</h3>
        <div class="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <MangaCard
            v-for="manga in recentManga"
            :key="manga.url"
            :manga="manga"
            @selectManga="selectManga"
          />
        </div>
      </div>
      <div class="col-span-6 md:col-span-2">
        <h3 class="text-lg font-bold mb-4 py-2 tracking-wider">Recently Added</h3>
        <div class="grid grid-cols-1 gap-6">
          <MangaCard
            display="detailed"
            imageContainerClass="h-[100px] w-20 shrink-0"
            v-for="manga in newManga"
            :key="manga.url"
            :manga="manga"
            @selectManga="selectManga"
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { type Manga } from '@/types'
import { storeToRefs } from 'pinia'
import { useRecentStore } from '@/stores/recent'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import MangaCard from '@/components/manga-card.vue'
import router from '@/router'
import DefaultLayout from '@/layouts/default-layout.vue'

// States
const recentStore = useRecentStore()
const { recentManga } = storeToRefs(recentStore)
const { newManga } = storeToRefs(recentStore)
const { popularManga } = storeToRefs(recentStore)
const { fetchRecentManga, fetchNewManga, fetchPopularManga } = recentStore

function selectManga(manga: Manga) {
  router.push({ name: 'manga', params: { manga: manga.slug } })
}
// Lifecycle
onMounted(async () => {
  try {
    // window.addEventListener('scroll', handleScroll)
    await fetchPopularManga()
    await fetchNewManga()
    await fetchRecentManga()
  } catch (err) {
    console.error('Failed to fetch manga:', err)
  }
})

// onUnmounted(() => {
//   window.removeEventListener('scroll', handleScroll)
// })
</script>
