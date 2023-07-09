import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'domki',
      component: () => import('../views/HousesView.vue'),
    },
    {
      path: '/nadrzewie',
      name: 'nadrzewie',
      component: () => import('../views/TreeHouseView.vue'),
    },
    {
      path: '/naziemii',
      name: 'naziemii',
      component: () => import('../views/GroundHouseView.vue'),
    },
    {
      path: '/dodaj',
      name: 'dodaj',
      component: () => import('../views/AddView.vue'),
    },
  ],
})

export default router
