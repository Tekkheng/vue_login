<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
  },
  //   {
  //     label: 'UI Components',
  //     items: [
  //       { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
  //       { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
  //       { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
  //       { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
  //       { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
  //       { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
  //       { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
  //       { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
  //       { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
  //       { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
  //       { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
  //       { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
  //       { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
  //       { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
  //       { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
  //       { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
  //     ]
  //   },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'Trucks',
        icon: 'pi pi-truck',
        to: '/truck'
      },
      //   {
      //     label: 'Auth',
      //     icon: 'pi pi-fw pi-user',
      //     items: [
      //       {
      //         label: 'Login',
      //         icon: 'pi pi-fw pi-sign-in',
      //         to: '/auth/login'
      //       },
      //       {
      //         label: 'Error',
      //         icon: 'pi pi-fw pi-times-circle',
      //         to: '/auth/error'
      //       },
      //       {
      //         label: 'Access Denied',
      //         icon: 'pi pi-fw pi-lock',
      //         to: '/auth/access'
      //       }
      //     ]
      //   },
      {
        label: 'Truck Schedule',
        icon: 'pi pi-fw pi-pencil',
        to: '/schedules'
      },
      {
        label: 'Calendar Trucks',
        icon: 'pi pi-fw pi-calendar',
        to: '/calendarTruck'
      },
      {
        label: 'Delivery Schedule',
        icon: 'pi pi-box',
        to: '/deliverySchedule'
      },
      {
        label: 'Drivers',
        icon: 'pi pi-users',
        to: '/drivers'
      }
    ]
  }
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
