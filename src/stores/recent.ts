import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Manga, MangaResponse } from '@/types'

export const useRecentStore = defineStore('recent', () => {
  const BASE_URL = import.meta.env.VITE_BE_URL
  const recentManga = ref<Manga[]>([])
  const newManga = ref<Manga[]>([])
  const popularManga = ref<Manga[]>([])
  const currentPage = ref(1)
  const isLoading = ref(false)
  const hasMore = ref(true)

  async function fetchRecentManga(): Promise<void> {
    if (isLoading.value || !hasMore.value) return

    isLoading.value = true
    try {
      const response = await fetch(`${BASE_URL}/recent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'harimanga',
          page: currentPage.value,
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const manga: MangaResponse = await response.json()

      if (manga.data.length === 0) {
        hasMore.value = false
      } else {
        recentManga.value.push(...manga.data)
        currentPage.value++
      }
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchNewManga(): Promise<void> {
    if (isLoading.value || !hasMore.value) return

    isLoading.value = true
    try {
      const response = await fetch(`${BASE_URL}/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'harimanga',
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const manga: MangaResponse = await response.json()
      newManga.value = manga.data
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPopularManga(): Promise<void> {
    if (isLoading.value || !hasMore.value) return

    isLoading.value = true
    try {
      const response = await fetch(`${BASE_URL}/popular`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'harimanga',
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const manga: MangaResponse = await response.json()
      popularManga.value = manga.data
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    recentManga,
    newManga,
    popularManga,
    fetchRecentManga,
    fetchNewManga,
    fetchPopularManga,
    isLoading,
    hasMore,
  }
})
