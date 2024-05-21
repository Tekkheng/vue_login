<script setup>
import useAuthStore from '@/stores/authStore'
import { computed, onMounted } from 'vue'

const authStore = useAuthStore()
const userData = computed(() => authStore.userLoggedin)
console.log('userData', userData.value.nama)

onMounted(() => {
  authStore.fetchUser()
})
</script>

<template>
  <!-- <Navbar :user="$attrs.user" /> -->
  <div class="d-flex container justify-content-center align-items-center" style="height: 60vh">
    <h4 class="text-center">Welcomes to Dashboard, {{ userData.nama }}</h4>
  </div>
  <div class="container">
    <!-- <div v-if="this.$attrs.user > 0" class="alert alert-success">
      {{ this.$attrs.user }}
    </div> -->
  </div>
</template>
