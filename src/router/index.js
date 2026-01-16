import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, guestGuard, adminGuard } from './guards'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/GuestLayout.vue'),
      beforeEnter: guestGuard,
      children: [
        {
          name: 'login',
          path: '',
          component: () => import('@/pages/auth/Login.vue')
        },
        {
          name: 'register',
          path: 'register',
          component: () => import('@/pages/auth/Register.vue')
        },
        {
          name: 'forgot',
          path: 'forgot',
          component: () => import('@/pages/auth/ForgotPassword.vue')
        }
      ]
    },

    {
      path: '/app',
      component: () => import('@/layouts/AuthLayout.vue'),
      beforeEnter: authGuard,
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/pages/dashboard/Home.vue')
        },
        {
          name: 'profile',
          path: 'profile',
          component: () => import('@/pages/dashboard/Profile.vue')
        }
      ]
    },

    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      beforeEnter: adminGuard,
      children: [
        {
          name: 'admin.push',
          path: 'push',
          component: () => import('@/pages/admin/PushNotification.vue')
        }
      ]
    }
  ]
})

export default router
