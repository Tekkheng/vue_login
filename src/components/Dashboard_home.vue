<script setup>
import Navbar from '../components/NavbarComponent.vue'

// export default {
//   beforeEnter(to) {
//     alert('Please Login First')
//     if (to.name !== 'dashboard') {
//       return '/login'
//     }
//   }
// }
</script>

<template>
  <Navbar />
  <h4 class="text-center">Welcome To Dashboard</h4>
</template>
