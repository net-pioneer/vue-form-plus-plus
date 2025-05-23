import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/history",
      name: "history",
      component: () => import("@/views/history.vue"),
    }
  ],
})

export default router
