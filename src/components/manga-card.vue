<template>
  <div
    class="select-none group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer"
    :class="props.display === 'detailed' ? 'flex items-center gap-4' : '' + containerClass"
    @click="emit('selectManga', props.manga)"
  >
    <!-- Cover Image -->
    <div class="relative rounded overflow-hidden" :class="imageContainerClass">
      <img
        :src="props.manga.thumbnail"
        :alt="props.manga.title"
        class="h-full w-full object-fill transition-transform duration-300 group-hover:scale-110"
      />
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-linear-to-t from-yellow-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>

    <!-- Content -->
    <div class="relative" :class="display === 'grid' ? 'p-4' : ''">
      <!-- Title -->
      <h3 class="text-sm md:text-md font-semibold md:font-bold text-black/80 line-clamp-2 mb-2">
        {{ props.manga.title }}
      </h3>

      <div v-if="display === 'grid'" class="relative">
        <div class="flex items-center gap-1">
          <span class="text-yellow-400">★</span>
          <span class="text-sm font-semibold text-black">{{ props.manga.ratings }}</span>
        </div>
      </div>

      <div v-if="display === 'detailed'" class="relative">
        <div class="flex flex-row items-start gap-2">
          <div
            v-for="(chapter, index) in props.manga.new_chapters"
            :key="index"
            class="bg-gray-100 rounded-lg"
            @click="stop"
          >
            <p class="p-2 text-[8px] font-semibold">{{ chapter.chapter }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Manga } from '@/types'
import { stop } from 'vue'

interface componentProps {
  manga: Manga
  display?: string
  containerClass?: string
  imageContainerClass?: string
}

const emit = defineEmits(['selectManga'])
const props = withDefaults(defineProps<componentProps>(), {
  display: 'grid',
  containerClass: '',
  imageContainerClass: 'w-full h-72',
})
</script>
