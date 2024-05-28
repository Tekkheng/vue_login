<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayout } from '@/layout/composables/layout'
// import { useRouter } from 'vue-router'

import 'primeicons/primeicons.css'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
import useAuthStore from '@/stores/authStore'

const authStore = useAuthStore()
const userData = computed(() => authStore.userLoggedin)

const Logout = async () => {
  const msg = await authStore.Logout()
  if (!msg) {
    Swal.fire({
      icon: 'success',
      title: 'Logout Berhasil',
      text: 'Anda telah berhasil logout!',
      timer: 1500
    })
  }
}

onMounted(() => {
  authStore.fetchUser()
})

const { onMenuToggle } = useLayout()

const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)
// const router = useRouter()

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

// const logoUrl = computed(() => {
//   return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`
// })

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}
// const onSettingsClick = () => {
//   topbarMenuActive.value = false
//   router.push('/documentation')
// }
const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return

  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
</script>

<template>
  <div class="layout-topbar">
    <RouterLink
      :to="{ name: 'dashboard' }"
      class="layout-topbar-logo navbar-brand text-success fw-bold flex-grow-0 text-center"
    >
      <img src="../assets/akheng-brand.png" width="220px" style="height: 120px" alt="akheng" />
      <!-- <span class="fs-2">R</span>imba -->
    </RouterLink>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <button
      class="layout-topbar-menu justify-content-center align-items-center"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      :class="topbarMenuClasses"
    >
      <button class="d-flex flex-column justify-content-center align-items-center">
        <img
          src="../assets/profile.png"
          class="border border-light border-3 rounded-circle shadow bg-body rounded"
          alt="profile"
          width="45"
        />
        <span v-if="userData !== null">{{ userData.nama }}</span>
        <span v-if="userData === null">Load</span>
      </button>
    </button>

    <li class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
      <button class="dropdown-item" @click.prevent="Logout()">
        <span class="pe-2"><i class="pi pi-sign-out"></i> </span>Logout
      </button>
    </li>
  </div>
</template>

<style scoped>
/* li {
  padding: 0px 25px 0px 25px;
} */
button {
  border: 1px solid transparent;
  background-color: transparent;
}

button.logout:hover {
  color: rgb(59, 133, 60);
}

.router-link-active {
  color: rgb(59, 133, 60);
}

a {
  color: black;
}
a:hover {
  color: rgb(59, 133, 60);
}
</style>
