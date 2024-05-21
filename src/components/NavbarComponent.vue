<script setup>
import 'primeicons/primeicons.css'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
import useAuthStore from '@/stores/authStore'
import { computed, onMounted } from 'vue'

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
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light mb-5 p-1">
    <div class="container-fluid d-flex justify-content-center">
      <a class="navbar-brand text-success fw-bold flex-grow-1 text-center" href="#"
        ><span class="fs-2">R</span>imb</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarHeader"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center"
        >
          <li class="nav-item">
            <RouterLink :to="{ name: 'dashboard' }" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'truck' }" class="nav-link">Truck</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'schedules' }" class="nav-link">Schedules</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'calendarTruck' }" class="nav-link">Calendar Truck</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'deliverySchedule' }" class="nav-link"
              >Delivery Schedule</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'drivers' }" class="nav-link">Drivers</RouterLink>
          </li>
        </ul>

        <div class="dropdown me-auto d-flex justify-content-center align-items-center">
          <button
            class="text-dark"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="../assets/profile.png"
              class="border border-light border-3 rounded-circle shadow bg-body rounded"
              alt="profile"
              width="45"
            />
            <h6 class="text-center w-100" v-if="userData !== null">{{ userData.nama }}</h6>
            <h6 class="text-center w-100" v-if="userData === null">Load</h6>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="dropdown-item" @click.prevent="Logout()">
                <span class="pe-1"><i class="pi pi-sign-out"></i> </span>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
li {
  padding: 0px 25px 0px 25px;
}
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
