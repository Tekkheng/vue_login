import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'

import TruckView from '../views/truck_crud/TruckView.vue'
import ScheduleView from '@/views/truck_schedule/ScheduleView.vue'
import addSchedule from '@/views/truck_schedule/addSchedule.vue'
import editSchedule from '@/views/truck_schedule/editSchedule.vue'

// DeliverySchedule //
import deliverySchedule from '@/components/delivery_schedule/deliverySchedule.vue'
import addDelivery from '@/components/delivery_schedule/addDelivery.vue'
import editDelivery from '@/components/delivery_schedule/editDelivery.vue'

import NotFound from '@/views/NotFound.vue'

// import { computed } from 'vue'
import CalendarTruck from '@/views/CalendarTruck.vue'

// driver
import DriverView from '@/views/drivers/driverView.vue'
import addDriver from '@/views/drivers/addDriver.vue'
import editDriver from '@/views/drivers/editDriver.vue'
import AppLayout from '@/layout/AppLayout.vue'

// import useAuthStore from '@/stores/authStore'

// const isUserLoggedIn = true

// const userStore = useAuthStore()
// const isUserLoggedIn = computed(() => userStore.fetchUser())
// console.log(isUserLoggedIn)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        needsAuth: false
      }
    },
    {
      path: '/',
      component: AppLayout,
      redirect: '/login',
      meta: {
        needsAuth: true
      },
      children: [
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
        // schedule route
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
        // calendar truck route
        {
          path: '/calendarTruck',
          name: 'calendarTruck',
          component: CalendarTruck,
          meta: {
            needsAuth: true
          }
        },
        // truck route
        {
          path: '/truck',
          name: 'truck',
          component: TruckView,
          meta: {
            needsAuth: true
          }
        },
        // delivery route
        {
          path: '/deliverySchedule',
          name: 'deliverySchedule',
          component: deliverySchedule,
          meta: {
            needsAuth: true
          }
        },
        {
          path: '/addDelivery',
          name: 'addDelivery',
          component: addDelivery,
          meta: {
            needsAuth: true
          }
        },

        {
          path: '/editDelivery/:id',
          name: 'editDelivery',
          component: editDelivery,
          meta: {
            needsAuth: true
          }
        },
        // drivers route
        {
          path: '/drivers',
          name: 'drivers',
          component: DriverView,
          meta: {
            needsAuth: true
          }
        },

        {
          path: '/editDriver/:id',
          name: 'editDriver',
          component: editDriver,
          meta: {
            needsAuth: true
          }
        },
        {
          path: '/addDriver',
          name: 'addDriver',
          component: addDriver,
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
    }
  ]
})

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/dashboard',
//       name: 'dashboard',
//       component: Dashboard,
//       meta: {
//         needsAuth: true
//       }
//       // beforeEnter(to) {
//       //   alert('Please Login First')
//       //   if (to.name !== 'dashboard') {
//       //     return '/login'
//       //   }
//       // }
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: LoginView,
//       meta: {
//         needsAuth: false
//       }
//     },
//     // schedule route
//     {
//       path: '/schedules',
//       name: 'schedules',
//       component: ScheduleView,
//       meta: {
//         needsAuth: true
//       }
//     },
//     {
//       path: '/add_schedules',
//       name: 'add_schedules',
//       component: addSchedule,
//       meta: {
//         needsAuth: true
//       }
//     },
//     {
//       path: '/schedules/:id',
//       name: 'edit_schedules',
//       component: editSchedule,
//       meta: {
//         needsAuth: true
//       }
//     },
//     // calendar truck route
//     {
//       path: '/calendarTruck',
//       name: 'calendarTruck',
//       component: CalendarTruck,
//       meta: {
//         needsAuth: true
//       }
//     },
//     // truck route
//     {
//       path: '/truck',
//       name: 'truck',
//       component: TruckView,
//       meta: {
//         needsAuth: true
//       }
//     },
//     // delivery route
//     {
//       path: '/deliverySchedule',
//       name: 'deliverySchedule',
//       component: deliverySchedule,
//       meta: {
//         needsAuth: true
//       }
//     },
//     {
//       path: '/addDelivery',
//       name: 'addDelivery',
//       component: addDelivery,
//       meta: {
//         needsAuth: true
//       }
//     },

//     {
//       path: '/editDelivery/:id',
//       name: 'editDelivery',
//       component: editDelivery,
//       meta: {
//         needsAuth: true
//       }
//     },
//     // drivers route
//     {
//       path: '/drivers',
//       name: 'drivers',
//       component: DriverView,
//       meta: {
//         needsAuth: true
//       }
//     },

//     {
//       path: '/editDriver/:id',
//       name: 'editDriver',
//       component: editDriver,
//       meta: {
//         needsAuth: true
//       }
//     },
//     {
//       path: '/addDriver',
//       name: 'addDriver',
//       component: addDriver,
//       meta: {
//         needsAuth: true
//       }
//     },

//     {
//       path: '/:catchAll(.*)',
//       name: '404Name',
//       component: NotFound
//     }
//   ]
// })

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
