<script>
import 'primeicons/primeicons.css'
import { RouterLink } from 'vue-router'
import axios from 'axios'

export default {
  data() {
    return {
      userData: null,
      RouterLink
    }
  },
  methods: {
    async getUser() {
      const response = await axios.get('profile', {
        headers: { Authorization: 'Bearer ' + JSON.parse(atob(localStorage.getItem('user'))) }
      })
      console.log(response.data.data)
      this.userData = response.data.data
    },
    Logout() {
      localStorage.removeItem('user')
      this.$router.push({ name: 'login' })
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light mb-5 p-1">
    <div class="container-fluid d-flex justify-content-center">
      <a class="navbar-brand text-success fw-bold flex-grow-1 text-center" href="#"
        ><span class="fs-2">R</span>imba</a
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
            <RouterLink to="/" class="nav-link">Contact Us</RouterLink>
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
  color: green;
}

.router-link-active {
  color: rgb(23, 118, 84);
}

a {
  color: black;
}
a:hover {
  color: rgb(23, 118, 84);
}
</style>
