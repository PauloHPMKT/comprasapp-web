import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/Account.vue')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../layout/AppLayout.vue'),
    redirect: { name: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../pages/Dashboard.vue')
      },
      {
        path: 'purchase-list',
        name: 'purchase-list',
        component: () => import('../pages/CreatePurchaseList.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})