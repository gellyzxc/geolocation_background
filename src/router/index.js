import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/App.vue'),
      children: [
        {
          path: '/',
          name: 'GeoView',
          component: () => import('@/views/GeoView.vue')
        }
      ]
    },
  ],
})

export default router
