import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MangaDetail, MangaDetailResponse } from '@/types'

export const useMangaDetailsStore = defineStore('manga-details', () => {
  const BASE_URL = import.meta.env.VITE_BE_URL
  const mangaDetails = ref<MangaDetail | null>(null)
  const imageEpisodes = ref([])
  const isLoading = ref(false)

  async function fetchMangaDetails(manga: string): Promise<void> {
    if (isLoading.value) return

    isLoading.value = true
    mangaDetails.value = null
    try {
      const response = await fetch(`${BASE_URL}/manga-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'harimanga',
          manga: manga,
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const detail: MangaDetailResponse = await response.json()
      mangaDetails.value = detail.data
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchImageEpisodes(manga: string, chapter: string): Promise<void> {
    if (isLoading.value) return

    isLoading.value = true
    imageEpisodes.value = []
    try {
      const response = await fetch(`${BASE_URL}/manga-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'harimanga',
          manga: manga,
          chapter: chapter,
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const episodes = await response.json()
      imageEpisodes.value = episodes.data
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return { mangaDetails, imageEpisodes, isLoading, fetchMangaDetails, fetchImageEpisodes }
})
