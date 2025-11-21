import { createRouter, createWebHistory } from 'vue-router'

import Manga from '@/pages/MangaPage.vue'
import Index from '@/pages/IndexPage.vue'
import Read from '@/pages/ReadPage.vue'

const routes = [
  { path: '/', component: Index },
  {
    path: '/manga/:manga',
    name: 'manga',
    component: Manga,
  },
  {
    path: '/manga/:manga/:chapter',
    name: 'read',
    component: Read,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
