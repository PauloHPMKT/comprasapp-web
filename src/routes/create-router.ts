import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/Account.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})