<script setup>
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })
import 'primeicons/primeicons.css'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const Logout = () => {
  localStorage.removeItem('user')

  router.push({ name: 'login' })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light mb-5">
    <div class="container-fluid d-flex justify-content-center">
      <a class="navbar-brand text-success fw-bold" href="#"><span class="fs-2">R</span>imba</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarHeader"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-grow-1 justify-content-center">
          <li class="nav-item">
            <RouterLink :to="{ name: 'dashboard' }" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Ecosystem</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Contact Us</RouterLink>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <button @click.prevent="Logout()" class="ms-3 logout">
          <i class="pi pi-sign-out"> Logout</i>
        </button>
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
