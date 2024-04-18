import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'
import TesView from '../components/TesComponent.vue'

import NotFound from '@/views/NotFound.vue'

// const isUserLoggedIn = true

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        needsAuth: true
      }
      // beforeEnter(to) {
      //   alert('Please Login First')
      //   if (to.name !== 'dashboard') {
      //     return '/login'
      //   }
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        needsAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: TesView,
      meta: {
        needsAuth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: '404Name',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (localStorage.getItem('user') === null) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (to.name == 'login') {
      if (localStorage.getItem('user') !== null) {
        console.log('ke dashboard')
        next({ name: 'dashboard' })
      } else {
        next()
      }
    }
  }
})

export default router
