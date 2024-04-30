import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'

import TruckView from '../views/truck_crud/TruckView.vue'
// import AddView from '../views/data_crud/AddView.vue'

import ScheduleView from '@/views/ScheduleView.vue'
import addSchedule from '@/views/addSchedule.vue'
import editSchedule from '@/views/editSchedule.vue'
import NotFound from '@/views/NotFound.vue'
import { defineProps } from 'vue'

// const isUserLoggedIn = true

const user = defineProps('users')
console.log(user)

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
      path: '/schedules',
      name: 'schedules',
      component: ScheduleView,
      meta: {
        needsAuth: true
      }
    },
    {
      path: '/add_schedules',
      name: 'add_schedules',
      component: addSchedule,
      meta: {
        needsAuth: true
      }
    },
    {
      path: '/schedules/:id',
      name: 'edit_schedules',
      component: editSchedule,
      meta: {
        needsAuth: true
      }
    },
    {
      path: '/truck',
      name: 'truck',
      component: TruckView,
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

// router.beforeEach((to, from, next) => {
//   if (to.meta.needsAuth) {
//     if (localStorage.getItem('user') === null) {
//       next({ name: 'login' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.name == 'login') {
//       if (localStorage.getItem('user') !== null) {
//         console.log('ke dashboard')
//         next({ name: 'dashboard' })
//       } else {
//         next()
//       }
//     }
//   }
// })

// if(user !== null){

// }
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
